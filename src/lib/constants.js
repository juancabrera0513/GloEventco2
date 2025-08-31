// src/lib/constants.js
export const LOGO_TEXT = 'GLO EVENT CO'
export const PHONE = '314-282-7888'
export const EMAIL = 'info@gloeventco.com'
export const ADDRESS_HTML = '11155 South Towne Sq. Suite C<br/>St. Louis, MO 63123'

export const BOOK_BASE = 'https://glo-event-co.checkcherry.com'
export const BOOK_SELFIE = `${BOOK_BASE}/reservation/event_type?package_group_id=13666`
export const BOOK_SILENT = `${BOOK_BASE}/reservation/package_group?service_id=9587`

// === Our Work (bundled assets con fallback a /public) ===
const caseMap = import.meta.glob('../assets/cases/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  as: 'url',
})
const getCase = (name) => caseMap[`../assets/cases/${name}`] ?? `/images/cases/${name}`

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

// === Testimonials ===
// Si luego agregas imágenes grandes para el carrusel 2-col, añade `image: '/images/testimonials/xyz-hero.jpg'`
export const TESTIMONIALS = [
  {
    name: 'Chris & Deanna L.',
    role: 'Founders of IKAGG',
    event: 'Corporate Christmas Party',
    quote:
      'We LOVE IT! Everyone is having a great time. It is easy to use. It’s fun. Not only do you get pictures but you can also do boomerangs, videos, and GIFs. We would definitely hire you back.',
    avatar: '/images/testimonials/ikagg.jpeg',
  },
  {
    name: 'Wendy F.',
    role: 'Event Coordinator',
    quote:
      "Working with Misty and Glo Event Co is always a great experience. Her preparation and professionalism really shine through her events. You can tell she really cares about her clients' experience. I always look forward to working with her and her team—whether it's a Silent Disco Party, the photo booth, or both. We have a great time, and I never worry about referring her services to my clients.",
    avatar: '/images/testimonials/wendy.png',
  },
  {
    name: 'Joy L.',
    role: 'Community Manager',
    quote:
      'Misty brought the photo booth to an event at one of my senior apartments. The residents had a blast! They really enjoyed using the props to get fun and unique photos. The whole setup was easy to use and made for a great activity. Thank you!',
    avatar: '/images/testimonials/joy.jpg',
  },
]
