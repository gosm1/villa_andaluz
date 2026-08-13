# Villa Andaluz · landing page

Single-page React site for the villa at Cabo Negro, Tétouan.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
npm run preview  # serve the build
```

## Where things live

| What | File |
|---|---|
| All copy, figures, rules, contact details | [src/data/villa.js](src/data/villa.js) |
| Photo list, captions and section grouping | [src/data/photos.js](src/data/photos.js) |
| Colours, type scale, spacing | the `:root` block in [src/styles.css](src/styles.css) |
| Page section order | [src/pages/Home.jsx](src/pages/Home.jsx) |
| The interactive tour — rooms, markers, copy | the `NODES` object in [public/tour/index.html](public/tour/index.html) |

Photos are imported from the top-level `assets/` folder — Vite hashes and copies
them at build time, so `assets/` stays the single source of truth. To swap a
photo, drop the new file in and change the one import in `photos.js`.

## Before going live

- **Contact details** in `villa.js` (`contact.phone`, `contact.email`) are
  placeholders.
- **The enquiry form** in [src/components/Enquire.jsx](src/components/Enquire.jsx)
  has no backend — it shows a thank-you and stops there. Point `handleSubmit`
  at Formspree, Resend, a WhatsApp deep link, or your own endpoint.
- **Bedroom breakdown**: the listing only specifies bedrooms 3, 4 and 5. Rooms 1
  and 2 are listed as one king bed each, which is what makes the total come to
  the ten beds the listing advertises — confirm and correct in `villa.js` if
  they differ.

## The interactive tour

`/tour` is a walkable graph of nine spaces — drag to look around, click a marker
to step through a doorway, toggle the whole house to after dark. It lives in
[public/tour/](public/tour/) as one dependency-free file plus its photos, so
Vite copies it verbatim and the engine stays untouched by the build.

- `/tour` frames it via [src/pages/TourPage.jsx](src/pages/TourPage.jsx). Framing
  keeps its ~2 MB of photos off the landing page — nothing loads until asked for.
- The band that leads into it is
  [src/components/TourBand.jsx](src/components/TourBand.jsx); its copy is
  `villa.tour` in `villa.js`.
- The tour's **Enquire** and **Close tour** buttons `postMessage` up to the React
  app rather than navigating the frame. Opened as a standalone file they fall
  back to plain links, so `public/tour/index.html` still works on its own.
- Phones (`max-width: 820px`) load a second, smaller photo set from
  `public/tour/images/mobile/` — 868 KB against 2.0 MB, and a quarter of the GPU
  memory. The switch is the `SMALL` constant; `NODES` stores bare filenames and
  `BASE` prefixes the right directory, so **every photo must exist in both
  folders**.
- Portrait phones get a different layout, not a scaled one: the stage becomes a
  flex column (bar, photo, panel), markers are zero-size anchors so a long label
  can never drag the ring off its door, and the per-marker labels are replaced by
  one shared `#hint` pill that can't be clipped or collide.
- To move a marker, press **C** in the tour, click the spot, and paste the copied
  `at:[x, y]` into `NODES`. Full detail in [docs/tour.md](docs/tour.md).

Its photos are the same villa as `assets/`, shot as a connected sequence. The
stair appears in three rooms but leads nowhere — there are no first-floor photos
yet — and six source photos are low-resolution enough to look soft full-bleed.

## Notes

- The hero crossfades between the day and night exterior shots every 7s, with a
  by day / by night toggle. Change the pair in `heroSlides` in `photos.js`.
- The map is Google's keyless `output=embed` iframe, centred on the coordinates
  resolved from the listing's Maps link (35.6539, −5.2990).
- Routes: `/` for the landing page, `/photos` for the filterable photo tour,
  `/tour` for the interactive tour. `/tour` renders without the site header and
  footer — it carries its own chrome.
- No analytics, no cookies, no third-party scripts beyond Google Fonts and the
  map iframe.
