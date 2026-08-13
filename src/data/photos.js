// Every photo of the villa lives here. The files themselves stay in /assets —
// Vite hashes and copies them at build time, so these are the only paths that
// ever need touching if a photo is renamed or replaced.
import exteriorDay from '../../assets/home page image.avif'
import exteriorNight from '../../assets/main image night mode.avif'
import pool from '../../assets/pool.avif'
import outsideKitchen from '../../assets/outside kitchen.avif'
import bbq from '../../assets/bbq.avif'
import kitchen from '../../assets/kitchen 1.avif'
import living from '../../assets/living room.avif'
import living1 from '../../assets/living room 1 .avif'
import living2 from '../../assets/living room 2.avif'
import bedroomMaster from '../../assets/sleeep room 1.avif'
import bedroomMasterAlt from '../../assets/sleeep room 1 2.avif'
import bedroomTwo from '../../assets/sleeep room 2.avif'
import bedroomKids from '../../assets/kids sleeep room 1.avif'
import room from '../../assets/room.avif'
import room2 from '../../assets/room 2.avif'
import room4 from '../../assets/room 4.avif'
import room5 from '../../assets/room 5.avif'
import room6 from '../../assets/room 6.avif'
import room7 from '../../assets/room 7.avif'
import bath1 from '../../assets/toilet 1.avif'
import bath1Alt from '../../assets/toilet 1 2.avif'
import bath2 from '../../assets/toilet 2.avif'
import bath2Alt from '../../assets/toilet 2 2.avif'

/** `room` groups the gallery page into sections. */
export const photos = [
  { src: exteriorDay, room: 'The villa', alt: 'The villa and garden seen from the grounds' },
  { src: pool, room: 'Pool & garden', alt: 'The private pool at the centre of the garden' },
  { src: living, room: 'Living areas', alt: 'Open-plan lounge with seating for the whole group' },
  { src: outsideKitchen, room: 'Outdoor living', alt: 'Covered outdoor kitchen and dining table' },
  { src: bedroomMaster, room: 'Bedrooms', alt: 'Bedroom with king bed' },
  { src: exteriorNight, room: 'The villa', alt: 'The villa lit up after dark' },
  { src: bbq, room: 'Outdoor living', alt: 'Barbecue and terrace dining' },
  { src: kitchen, room: 'Kitchens', alt: 'One of the two fully equipped kitchens' },
  { src: living1, room: 'Living areas', alt: 'Second lounge with sofa bed' },
  { src: living2, room: 'Living areas', alt: 'Third lounge and dining table' },
  { src: bedroomMasterAlt, room: 'Bedrooms', alt: 'King bedroom seen from the doorway' },
  { src: bedroomTwo, room: 'Bedrooms', alt: 'Second king bedroom' },
  { src: bedroomKids, room: 'Bedrooms', alt: 'Family room with single beds' },
  { src: room, room: 'Bedrooms', alt: 'Bedroom with garden view' },
  { src: room2, room: 'Bedrooms', alt: 'Bedroom with fitted wardrobes' },
  { src: room4, room: 'Bedrooms', alt: 'Room with three single beds' },
  { src: room5, room: 'Bedrooms', alt: 'Bedroom with terrace access' },
  { src: room6, room: 'Bedrooms', alt: 'Guest bedroom' },
  { src: room7, room: 'Bedrooms', alt: 'Bedroom with reading corner' },
  { src: bath1, room: 'Bathrooms', alt: 'New bathroom with walk-in shower' },
  { src: bath1Alt, room: 'Bathrooms', alt: 'Bathroom vanity' },
  { src: bath2, room: 'Bathrooms', alt: 'En-suite bathroom' },
  { src: bath2Alt, room: 'Bathrooms', alt: 'En-suite shower' },
]

/* ------------------------------------------------------------------
   Responsive variants
   ------------------------------------------------------------------ */

import { imageSizes } from './imageSizes.js'

// Picks up every `name-480w.avif` / `name-800w.avif` beside the originals, so
// adding a width is a matter of dropping the file in and rebuilding.
const files = import.meta.glob('../../assets/*.avif', {
  eager: true,
  query: '?url',
  import: 'default',
})

/** stem -> { full, widths: [[w, url], ...] } */
const sets = {}
for (const [path, url] of Object.entries(files)) {
  const name = path.split('/').pop().replace(/\.avif$/, '')
  const variant = name.match(/^(.+)-(\d+)w$/)
  const stem = variant ? variant[1] : name
  const entry = (sets[stem] ||= { full: null, widths: [] })
  if (variant) entry.widths.push([Number(variant[2]), url])
  else entry.full = url
}

// Reverse lookup: components hold the imported (hashed) URL, not the stem.
const byUrl = new Map()
for (const [stem, entry] of Object.entries(sets)) {
  if (entry.full) byUrl.set(entry.full, { ...entry, stem })
}

/**
 * Everything an <img> needs for one photo: `src`, `srcSet`, and intrinsic
 * `width`/`height` so the box is reserved before the bytes arrive.
 *
 * `sizes` must be supplied by the caller — only the layout knows how wide the
 * image will actually be, and getting it wrong makes the browser pick badly.
 */
export function responsive(src, sizes) {
  const entry = byUrl.get(src)
  const intrinsic = entry && imageSizes[entry.stem]
  if (!entry || !intrinsic) return { src }

  const [width, height] = intrinsic
  if (!entry.widths.length) return { src, width, height }

  // Include the original only when no variant already covers its width —
  // otherwise the srcset carries two entries with the same `w` descriptor and
  // the browser is free to pick the larger file.
  const covered = new Set(entry.widths.map(([w]) => w))
  const all = [...entry.widths, ...(covered.has(width) ? [] : [[width, entry.full]])].sort(
    (a, b) => a[0] - b[0],
  )

  // `src` is the fallback for anything that ignores srcset. Point it at the
  // largest *variant* rather than the untouched original: the variants are
  // better compressed, so the original would otherwise be the one file that
  // ships without ever being the right choice for anyone.
  const fallback = all[all.length - 1][1]

  return {
    src: fallback,
    srcSet: all.map(([w, url]) => `${url} ${w}w`).join(', '),
    sizes,
    width,
    height,
  }
}

/** Full-bleed hero image. */
export const heroPhoto = exteriorDay

/** The hero crossfades between these two — the villa by day and by night. */
export const heroSlides = [
  { src: exteriorDay, label: 'By day' },
  { src: exteriorNight, label: 'By night' },
]

/** Square image beside the about copy. */
export const aboutPhoto = pool

/** The scrolling strip further down the page. */
export const stripPhotos = [living, outsideKitchen, bedroomMaster, exteriorNight, kitchen, bbq, living2, bath1]

/** Image inside the stats band. */
export const statsPhoto = living1

/** Behind the band that leads into the interactive tour. */
export const tourPhoto = exteriorNight
