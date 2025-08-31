// src/pages/FAQ.jsx
import NeonHeading from '../components/NeonHeading'
import GlowButton from '../components/GlowButton'
import { BOOK_SELFIE, BOOK_SILENT } from '../lib/constants'

const faqs = [
  {
    q: 'What is Silent Disco?',
    a: `Silent Disco (or Silent Party) is an event where people dance to music through wireless headphones.
Instead of using speakers, the music is broadcast via radio frequency to the headsets. Guests without headphones
won’t hear the music—which is why it can look like everyone’s dancing “to nothing”… except for the folks who sing along.`,
  },
  {
    q: 'Do I have to hire my own DJ, or do you provide one?',
    a: `Either works. You can bring your own DJ, we can provide a DJ, or you can plug our transmitters into your own
devices and run the party without a DJ at all.`,
    cta: 'dj',
  },
  {
    q: 'How long has Silent Disco been around?',
    a: `Silent Disco parties began popping up in the late 1990s and early 2000s, originally popularized by eco-activists
looking to reduce noise pollution.`,
  },
  {
    q: 'Are the headphones only for music?',
    a: `Not at all. We also support multi-language corporate events—present to an audience in different languages in
the same room, each listening in their native language. Silent Cinema is also an option: host an outdoor movie night
where guests listen through headphones (up to three movies at once), or keep it to one to avoid neighbor complaints.`,
  },
  {
    q: 'Can I use the headphones at home?',
    a: `Yes, but they are not Bluetooth. You’ll need our specialized transmitters to send audio to the headsets.`,
  },
  {
    q: 'Can I purchase my own Silent Disco headphones and equipment?',
    a: `Yes. Contact Glo Event Co for pricing and purchasing details.`,
  },
  {
    q: 'What is the transmission range?',
    a: `Because we use specialized radio frequencies, you can broadcast up to roughly 300 yards (~274 meters).
For the best sound quality, we recommend keeping events within that range.`,
  },
  {
    q: 'How long do the headphones last?',
    a: `Up to 10 hours on a single charge under normal use.`,
  },
  {
    q: 'How many audio channels can I use at once?',
    a: `Up to three channels simultaneously. Each channel lights up a different LED color on the headsets.`,
  },
  {
    q: 'Can I rent headphones for longer than 24 hours?',
    a: `Yes. We can customize the rental duration to fit your needs.`,
    cta: 'duration',
  },
  {
    q: 'What if the headphones or equipment are damaged, lost, or stolen?',
    a: `Please plan good security for your event and remind guests that the headsets only work with our transmitters.
If something goes missing or is damaged, the replacement fee is $100 per item.`,
  },
  {
    q: 'How do I reserve my date and equipment?',
    a: `A non-refundable deposit of $200 or 20% (whichever is greater) secures your reservation. The remaining balance
is due 7 days prior to your event. We accept all major credit cards and PayPal.`,
    cta: 'reserve',
  },
  {
    q: 'Will you provide staff for my event?',
    a: `Headphone Rentals: to keep costs down, we do not provide staff for rentals. A team member will show you how to
operate the equipment beforehand, but staff will not remain on-site during your party.

Party Packages with DJ: we provide full-service event staff so you can enjoy the night. If you have volunteers,
we can train them to reduce staffing costs. We always provide at least one staff member for setup and takedown.
Staffing levels depend on event size.`,
  },
  {
    q: 'Do you ship the equipment?',
    a: `At this time we do not ship. We service the entire state of Missouri and Metro-East Illinois.`,
  },
]

// IDs accesibles/anclables (#q-what-is-silent-disco)
const slug = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

export default function FAQ() {
  const pageTitle = 'FAQ | Glo Event Co'
  const pageDesc = 'Common questions about Silent Disco & Party Packages from Glo Event Co.'

  const faqLD = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const CTA = ({ type }) => {
    if (type === 'dj') {
      return (
        <div className="mt-4 flex flex-wrap gap-3">
          <GlowButton href={BOOK_SILENT} external variant="pink">
            Book Silent Disco
          </GlowButton>
        </div>
      )
    }
    if (type === 'reserve') {
      return (
        <div className="mt-4 flex flex-wrap gap-3">
          <GlowButton href={BOOK_SELFIE} external appearance="glass">
            Book Selfie Station
          </GlowButton>
          <GlowButton href={BOOK_SILENT} external variant="pink">
            Book Silent Disco
          </GlowButton>
        </div>
      )
    }
    if (type === 'duration') {
      return (
        <div className="mt-4 flex flex-wrap gap-3">
          <GlowButton href={BOOK_SELFIE} external appearance="glass">
            Book Selfie Station
          </GlowButton>
          <GlowButton href={BOOK_SILENT} external variant="pink">
            Book Silent Disco
          </GlowButton>
        </div>
      )
    }
    return null
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />

      <NeonHeading kicker="FAQ" title="Frequently Asked Questions" />
      <p className="mt-3 text-gray-400">
        Frequently asked questions about our Silent Disco and party packages from{' '}
        <span className="text-white">Glo Event Co</span>.
      </p>

      <dl className="mt-10 space-y-4">
        {faqs.map((f) => {
          const id = `q-${slug(f.q)}`
          return (
            <div key={id} className="glass rounded-2xl neon-border glo-hover">
              <details className="group open:rounded-b-none">
                <summary id={id} className="flex items-center justify-between cursor-pointer list-none px-5 py-4">
                  <dt className="font-semibold pr-4">{f.q}</dt>
                  <span
                    className="ml-auto inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/5 neon-border transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>

                <dd className="px-5 pb-5 pt-1 text-gray-300 whitespace-pre-line">
                  {f.a}
                  {f.cta && <CTA type={f.cta} />}
                </dd>
              </details>
            </div>
          )
        })}
      </dl>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />
    </div>
  )
}
