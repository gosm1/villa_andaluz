import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * The hero photo is the LCP element, but its URL only exists after React has
 * rendered — the browser's preload scanner cannot see it in the HTML, so the
 * load is strictly serial: HTML, then JS, then render, then finally discover
 * and fetch a ~150 KB image.
 *
 * This injects a <link rel="preload"> for it, so the fetch starts alongside
 * the JS instead of after it. Done as a plugin rather than hardcoded because
 * the filename is content-hashed at build time.
 */
function preloadHero({ stem, fullWidth, sizes = '100vw', type = 'image/avif' }) {
  let attrs = null

  return {
    name: 'preload-hero',
    apply: 'build',
    generateBundle(_options, bundle) {
      // Collect the original plus every generated width for this photo.
      const esc = stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const full = new RegExp(`^assets/${esc}-[A-Za-z0-9_-]+\\.avif$`)
      const variant = new RegExp(`^assets/${esc}-(\\d+)w-[A-Za-z0-9_-]+\\.avif$`)

      const candidates = []
      let fullHref = null
      for (const file of Object.keys(bundle)) {
        const v = file.match(variant)
        if (v) candidates.push([Number(v[1]), '/' + file])
        else if (full.test(file)) fullHref = '/' + file
      }
      if (!fullHref) {
        // Loud: a silent miss costs a second of LCP and nothing else fails.
        this.warn(`preload-hero: no asset matched "${stem}" — no preload emitted`)
        return
      }
      // Same rule as responsive() in photos.js: the original only earns a slot
      // if no variant already covers its width, or the srcset ends up with two
      // entries at the same descriptor.
      if (!candidates.some(([w]) => w === fullWidth)) candidates.push([fullWidth, fullHref])
      candidates.sort((a, b) => a[0] - b[0])

      // Must mirror the <img> exactly. Preloading a bare href instead would
      // fetch the full-size file *in addition to* whatever srcset then picks,
      // which on a phone means downloading the big one for nothing.
      // Paths are encoded because these filenames contain spaces, and a raw
      // space is a separator inside a srcset.
      attrs = {
        rel: 'preload',
        as: 'image',
        imagesrcset: candidates.map(([w, href]) => `${encodeURI(href)} ${w}w`).join(', '),
        imagesizes: sizes,
        type,
        fetchpriority: 'high',
      }
    },
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        if (!attrs) return html
        return { html, tags: [{ tag: 'link', attrs, injectTo: 'head-prepend' }] }
      },
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    // The hero is full-bleed, so `sizes` matches the <img> in Hero.jsx.
    preloadHero({ stem: 'home page image', fullWidth: 1200, sizes: '100vw' }),
  ],
  server: { open: true },
  build: {
    rollupOptions: {
      output: {
        // Split the router and React out of the page chunk so a change to the
        // site's own code does not invalidate the whole vendor cache.
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'react'
          }
          if (id.includes('node_modules/lenis')) return 'lenis'
        },
      },
    },
  },
})
