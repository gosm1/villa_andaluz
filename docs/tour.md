# The interactive tour

Maintenance notes for `public/tour/`. "Dar Sania" was the prototype's
placeholder name; the photos are Villa Andaluz.

A dependency-free, single-file WebGL photo tour. Drop it into a page as a
full-viewport hero section.

## Files

```
public/tour/index.html          the whole tour, markup + CSS + JS in one file
public/tour/images/*.webp       12 photos, 8 day + 4 night, 1800px max
public/tour/images/mobile/*.webp the same 12 at 1000px, loaded under 820px wide
```

No build step, no framework, no npm. Open `index.html` directly.

## How it works

A fullscreen WebGL quad samples one photo per layer and offsets the sample
UV by an estimated depth, so near things travel further than far things as
the pointer moves. Two layers cross-fade for transitions.

There is **no depth map**. Depth is approximated per photo by `depth`:

- `"open"` , ground near the bottom, sky far (exteriors)
- `"room"` , frame edges near, `focal` point far (interiors)

To use a real depth map later (Depth Anything V2 exports a grayscale PNG),
add it as a second texture and replace the body of `nearness()` in the
fragment shader. Nothing else changes.

## The house is a graph

Everything lives in the `NODES` object at the top of the `<script>`. Each
room has photos, copy, depth settings, and the markers that lead out of it.

```js
pool:{
  day:"images/pool.webp",
  night:"images/pool_n.webp",     // omit for day-only rooms
  kind:"Outside", name:"The pool garden", note:"...",
  nightKind:…, nightName:…, nightNote:…,   // optional night copy
  depth:"open", focal:[.42,.55], strength:.052,
  nightFocal:[…], nightStrength:…,          // optional, night framing differs
  spots:[      { to:"lounge", at:[.418,.488], label:"Main lounge",
                 sub:"Under the pergola", lane:-34, flip:false } ],
  nightSpots:[ … ]                          // optional
}
```

- `at:[x,y]` is **image space, origin bottom-left**, 0–1 on both axes.
- `lane` nudges a label up/down in px so neighbouring labels don't collide.
- `flip` makes the label extend leftward instead of rightward.
- `RAIL` sets the order of the bottom room switcher; `"|"` is a divider.

Rooms with a `night` photo appear in night mode; the rest are hidden. The
pergola is night-only (`nightOnly:true`, no `day` key).

## Moving a marker

Press **C** in the browser. Parallax freezes, a grid appears, and the
readout shows the live coordinate. Click anywhere to copy `at:[x, y]` to
the clipboard, then paste it into `NODES`. Press **C** again to exit.

## Keyboard

`C` calibrate · `N` day/night · `←` `→` move between rooms · `Esc` back

## Known limits

- Six photos are low-resolution at source (720–1200px) and look soft when
  blown up full-bleed: `garden`, `hearth`, `hidden`, `pool`, `lounge_n`,
  `hidden_n`. Replace with full-resolution originals when available.
- The `hearth` marker inside `lounge` is a rough guess , that photo looks
  back toward the room rather than through a door.
- The stair appears in three rooms but leads nowhere; there are no
  first-floor photos yet.
- The two night photos were taken at different times: `pool_n` shows the
  old cantilever umbrella, `terrace_n` shows the newer wooden pergola.

## Embedding

Simplest: `<iframe src="tour/index.html" style="width:100%;height:100svh;border:0">`.
The tour manages its own fullscreen layout and never scrolls the parent.

To inline it instead, lift `#stage`, the `<style>` block and the `<script>`
into the host page. The only global it defines is inside one IIFE-free
script block, so rename `cur`/`night`/`images` if they clash.

## Production notes

- Serve the images from a CDN; add `<link rel="preload">` for the first
  photo (`arrival`) so the loader clears fast.
- Add a JPEG fallback via `<picture>` only if you need pre-2020 Safari.
- The loader waits for **all 12** images before starting. For a faster
  first paint, load `arrival` first and stream the rest in the background.
