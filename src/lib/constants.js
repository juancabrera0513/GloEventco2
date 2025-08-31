// src/lib/constants.js
export const LOGO_TEXT = 'GLO EVENT CO'
export const PHONE = '314-282-7888'
export const EMAIL = 'info@gloeventco.com'
export const ADDRESS_HTML = '11155 South Towne Sq. Suite C<br/>St. Louis, MO 63123'

export const BOOK_BASE = 'https://glo-event-co.checkcherry.com'
export const BOOK_SELFIE = `${BOOK_BASE}/packages/selfie-station-rentals`
export const BOOK_SILENT = `${BOOK_BASE}/packages/silent-disco`

// === Our Work (assets bundlados) ===
// Carga todas las imágenes de /src/assets/cases como URLs con hash
const caseMap = import.meta.glob('../assets/cases/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  as: 'url',
})
const getCase = (name) => caseMap[`../assets/cases/${name}`]

// Si tus archivos son .png/.jpg/.webp, ajusta los nombres abajo:
export const OUR_WORK = [
  {
    src: getCase('case-1.png'),
    alt: 'LED headsets crowd',
    title: 'Festival Silent Disco',
    blurb: '3 channels • 300 headsets • Clean RF setup',
    href: '/portfolio',
  },
  {
    src: getCase('case-2.png'),
    alt: 'Corporate lobby activation',
    title: 'Corporate Brand Activation',
    blurb: 'Custom overlays • Lead capture kiosk',
    href: '/portfolio',
  },
  {
    src: getCase('case-3.jpg'),
    alt: 'Wedding dance floor',
    title: 'Wedding Silent Disco',
    blurb: 'No noise complaints • Big dance energy',
    href: '/portfolio',
  },
  {
    src: getCase('case-4.jpg'),
    alt: 'Photo booth backdrop',
    title: 'Modern Photo Booth',
    blurb: 'GIFs • Boomerangs • Online gallery',
    href: '/portfolio',
  },
  {
    src: getCase('case-5.png'),
    alt: 'Outdoor brand tent',
    title: 'Pop-Up Experience',
    blurb: 'Minimal footprint • Fast setup',
    href: '/portfolio',
  },
  {
    src: getCase('case-6.jpg'),
    alt: 'Team posing at booth',
    title: 'Community Event',
    blurb: 'Family-friendly • Share via text/email',
    href: '/portfolio',
  },
]

// src/lib/constants.js
// ...tus exports existentes (LOGO_TEXT, PHONE, EMAIL, BOOK_* , OUR_WORK, etc.)

export const TESTIMONIALS = [
  {
    name: 'Chris & Deanna L.',
    role: 'Founders of IKAGG',
    event: 'Corporate Christmas Party',
    quote: '“We LOVE IT! Easy to use, fun, and we’d definitely hire again.”',
    avatar: '/images/testimonials/ikagg.jpeg', // opcional (ponlo en /public/images/testimonials/)
  },
  {
    name: 'Wendy F.',
    role: 'Event Coordinator',
    quote: '“Preparation and professionalism shine through every event.”',
    avatar: '/images/testimonials/wendy.png',
  },
  {
    name: 'Joy L.',
    role: 'Community Manager',
    quote: '“Residents had a blast—fun props and unique photos!”',
    avatar: '/images/testimonials/joy.jpg',
  },
]
