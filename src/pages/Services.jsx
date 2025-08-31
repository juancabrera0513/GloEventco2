import GlowCard from '../components/GlowCard'
import NeonHeading from '../components/NeonHeading'
import { BOOK_SELFIE, BOOK_SILENT } from '../lib/constants'

export default function Services() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <title>Services | Glo Event Co</title>
      <meta
        name="description"
        content="Silent Disco & Modern Photo Booth rentals with clean setups, friendly staff, fast booking."
      />

      <NeonHeading
        kicker="SERVICES"
        title="Silent Disco & Modern Photo Booths"
        subtitle="Clean setups, friendly staff, fast booking."
      />
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <GlowCard
          title="Modern Photo Booth"
          eyebrow="Selfie Station"
          href={BOOK_SELFIE}
          cta="View packages →"
        >
          <ul className="list-disc pl-5">
            <li>Funtastic photos, GIFs, and boomerangs</li>
            <li>Text/email sharing</li>
            <li>Minimal footprint, fits any venue</li>
          </ul>
        </GlowCard>
        <GlowCard
          title="Silent Disco"
          eyebrow="Headphones + Multi-Channel"
          href={BOOK_SILENT}
          cta="View packages →"
          variant="pink"
        >
          <ul className="list-disc pl-5">
            <li>Up to 3 music channels</li>
            <li>LED headsets that match the vibe</li>
            <li>Great for weddings, corporate & festivals</li>
          </ul>
        </GlowCard>

        
      </div>
    </div>
  )
}
