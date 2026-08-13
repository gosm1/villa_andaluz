/**
 * ⚠️ SET THIS BEFORE LAUNCH.
 * The canonical origin, no trailing slash. It is the base for the canonical
 * link, the Open Graph URL, the sitemap and the structured data. Pointing at
 * the wrong host makes Google index the wrong domain and kills link previews.
 */
export const SITE_URL = 'https://villaandaluz.ma'

export const villa = {
  name: 'Villa Andaluz',
  fullName: 'Villa Andaluz Cabo Negro',
  location: 'Cabo Negro, Tétouan, Morocco',
  region: 'Tanger-Tétouan-Al Hoceïma',
  guests: 13,
  bedrooms: 5,
  beds: 10,
  baths: 5,
  plotSize: '3 000 m²',
  rating: 4.8,
  reviewCount: 15,
  superhost: true,

  hero: {
    // Split so the accent words can be set in italic serif.
    line1: ['Where the Mediterranean light meets ', 'private', ' luxury'],
    kicker: 'Cabo Negro · Tétouan · Morocco',
    cta: 'Explore the villa',
  },

  host: {
    name: 'Mohamed',
    initial: 'M',
    yearsHosting: 2,
    livesIn: 'Tétouan, Morocco',
    responseRate: 100,
    responseTime: 'within an hour',
    languages: ['العربية', 'Français', 'English'],
  },

  map: {
    lat: 35.6539183,
    lng: -5.2989997,
    plusCode: 'MP32+H9, Cabo Negro',
    link: 'https://maps.app.goo.gl/vXChq3MBVULLj8VH7',
  },

  // Where enquiries go.
  contact: {
    // Displayed as written; `tel:` and `wa.me` links strip the spaces, so keep
    // it in international form or those links break for guests abroad.
    phone: '+212 661 10 29 45',
    email: 'hello@villaandaluz.ma', // TODO: confirm the real inbox before launch
    whatsapp: 'Message on WhatsApp',
  },

  stats: [
    { value: '3 000', unit: 'm²', label: 'of grounds and garden' },
    { value: '13', unit: '', label: 'guests across 5 bedrooms' },
    { value: '4,8', unit: '★', label: 'from 15 verified stays' },
    { value: '100', unit: '%', label: 'host response rate' },
  ],

  about: {
    heading: ['A modern 3 000 m² villa built for ', 'family', ' and ', 'gatherings', '.'],
    body: [
      'Five bedrooms, three lounges with sofa beds, five brand-new bathrooms and two fully equipped kitchens. Everything here is new, generous and set up so that thirteen people can share a house without ever getting in each other\'s way.',
      'The garden wraps the whole plot, with the private pool at its centre and space to eat, swim and sit out long after the sun has gone down.',
      'Strategically placed on the IKEA road, 400 metres from La Cassia and its restaurants, directly on the main street beside Cappoccino.',
    ],
  },

  tour: {
    eyebrow: 'Interactive tour',
    // Split so the accent word can be set in italic serif, as in the hero.
    title: ['Walk the house before you ', 'book', ''],
    body: 'Nine spaces, inside and out, joined door to door. Drag to look around, click a marker to step through, and switch the whole house to after dark.',
    cta: 'Enter the tour',
    meta: ['9 rooms', 'Day & night', 'Nothing to install'],
  },

  statement: {
    title: 'A house made for staying in',
    subtitle: 'space, light and quiet, fifteen minutes from the sea',
    body: 'Five bedrooms, three lounges, two kitchens and a pool in the middle of a walled garden, with the cafés and restaurants of La Cassia four hundred metres down the road. Write to us and we will hold your dates.',
    cta: 'Enquire about dates',
  },

  inside: [
    { lead: '2', text: 'fully equipped kitchens, one open to the living room and one closed' },
    { lead: '5', text: 'brand-new bathrooms, spread across both floors' },
    { lead: '3', text: 'lounges, each with a sofa bed for extra guests' },
    { lead: '5', text: 'bedrooms sleeping thirteen in ten beds' },
    { lead: '', text: 'Dedicated workspace, wifi and a television throughout' },
  ],

  outside: [
    { lead: '3 000 m²', text: 'of grounds with a large planted garden' },
    { lead: '1,90 m', text: 'private pool, reserved for adults' },
    { lead: '400 m', text: 'to La Cassia, its cafés and restaurants' },
    { lead: '', text: 'Free parking on site, directly on the main street' },
    { lead: '', text: 'Beach view and panoramic views over the town' },
  ],

  bedroomsDetail: [
    { name: 'Bedroom 1', beds: '1 king bed' },
    { name: 'Bedroom 2', beds: '1 king bed' },
    { name: 'Bedroom 3', beds: '1 king bed' },
    { name: 'Bedroom 4', beds: '3 single beds, 1 sofa bed' },
    { name: 'Bedroom 5', beds: '2 single beds, 1 sofa bed' },
  ],

  amenities: [
    { icon: 'map', label: 'Beach view' },
    { icon: 'globe', label: 'Panoramic city view' },
    { icon: 'kitchen', label: 'Two equipped kitchens' },
    { icon: 'wifi', label: 'Wifi' },
    { icon: 'workspace', label: 'Dedicated workspace' },
    { icon: 'parking', label: 'Free parking on site' },
    { icon: 'pool', label: 'Private pool' },
    { icon: 'pet', label: 'Pets allowed' },
    { icon: 'tv', label: 'Television' },
    { icon: 'washer', label: 'Washing machine' },
    { icon: 'ac', label: 'Air conditioning' },
    { icon: 'bbq', label: 'Outdoor dining area' },
  ],
  amenityTotal: 70,

  houseRules: [
    'Check-in from 15:00 · Checkout before 11:00',
    'Maximum 13 guests',
    'Marriage certificate required for couples (Moroccan law)',
    'The pool is 1,90 m deep and reserved for adults',
    'Pets allowed',
  ],

  safety: ['Carbon monoxide detector', 'Smoke detector', 'Pool without a gate or lock'],

  nearby: [
    { name: 'Cappoccino', detail: 'Café next door', time: 'On the street' },
    { name: 'La Cassia', detail: 'Restaurants and shops', time: '400 m' },
    { name: 'Grocery shop', detail: 'Everyday essentials', time: '3 min walk' },
    { name: 'IKEA road', detail: 'HyperU, McDonald\'s', time: '5 min drive' },
    { name: 'Cabo Negro beach', detail: 'Sand and beach clubs', time: '10 min drive' },
    { name: 'Tétouan', detail: 'Medina, UNESCO site', time: '20 min drive' },
  ],

}
