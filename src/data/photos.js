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
