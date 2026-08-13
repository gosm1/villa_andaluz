import Lenis from 'lenis'

// Inertial scrolling for the landing page. Every programmatic scroll on the
// site goes through scrollToTarget() below so that anchor jumps share the same
// easing as the wheel — mixing native smooth scrolling with Lenis produces two
// animations fighting over the same scroll position.

let lenis = null
let frame = 0

/**
 * Momentum scrolling is a fine-pointer affordance. Touch scrollers already have
 * inertia, and overriding it costs a frame of latency on every drag, which
 * reads as lag rather than polish. Reduced-motion users opt out entirely.
 */
export function prefersSmoothScroll() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export function startSmoothScroll() {
  if (lenis || !prefersSmoothScroll()) return
  lenis = new Lenis({
    // Long enough to feel weighted, short enough that a flick still lands.
    duration: 1.25,
    // expo-out: quick to pick up speed, long unhurried settle.
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    wheelMultiplier: 0.9,
    smoothWheel: true,
    syncTouch: false,
  })
  const raf = (time) => {
    lenis.raf(time)
    frame = requestAnimationFrame(raf)
  }
  frame = requestAnimationFrame(raf)
}

export function stopSmoothScroll() {
  if (!lenis) return
  cancelAnimationFrame(frame)
  lenis.destroy()
  lenis = null
  frame = 0
}

/**
 * Hold the page still behind a modal. `body { overflow: hidden }` alone is not
 * enough once Lenis owns the scroll: it keeps integrating wheel input while the
 * overlay is up and applies the accumulated delta the moment it closes.
 * Safe to call when smooth scrolling is off.
 */
export function pauseSmoothScroll() {
  lenis?.stop()
}

export function resumeSmoothScroll() {
  lenis?.start()
}

/**
 * @param target element, or a number of pixels from the top.
 * @param immediate jump with no animation (route changes).
 */
export function scrollToTarget(target, { immediate = false } = {}) {
  if (lenis) {
    // `force` because a caller may scroll in the same tick it closes a modal:
    // the effect cleanup that resumes Lenis has not run yet, and a stopped
    // Lenis drops the request silently. That is the drawer's nav links.
    lenis.scrollTo(target, { immediate, offset: 0, force: true })
    return
  }
  // No Lenis: touch, reduced motion, or the tour route. Fall back to the
  // platform, which honours scroll-behavior in the stylesheet.
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' })
  } else if (target) {
    target.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' })
  }
}

/** Scroll to a `#id`, no-op if it isn't on the page. */
export function scrollToHash(hash) {
  const el = document.querySelector(hash)
  if (el) scrollToTarget(el)
}
