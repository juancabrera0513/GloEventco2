import NeonHeading from '../components/NeonHeading'

export default function Portfolio() {
  // Reemplaza con tus imágenes reales
  const samples = Array.from({ length: 12 }).map((_, i) => `/images/sample-${i + 1}.jpg`)

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <title>Portfolio | Glo Event Co</title>
      <meta name="description" content="Backdrop gallery & event highlights for Silent Disco and Photo Booth." />

      <NeonHeading
        kicker="PORTFOLIO"
        title="Backdrop Gallery & Event Highlights"
        subtitle="Swap these placeholders with real events."
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
        {samples.map((src) => (
          <figure key={src} className="relative group overflow-hidden rounded-2xl glass">
            <img
              src={src}
              alt="Event sample"
              className="w-full h-56 object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </div>
  )
}
