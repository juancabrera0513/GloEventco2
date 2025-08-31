// src/components/OurWork.jsx
import NeonHeading from './NeonHeading'

export default function OurWork({
  items = [],
  kicker = 'OUR WORK',
  title = 'Brand Activations & Event Highlights',
  ctaHref = '/portfolio',
  ctaLabel = 'View all →',
}) {
  return (
    <section className="border-b border-white/5" aria-labelledby="our-work-heading">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <NeonHeading kicker={kicker} title={title} />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ src, alt, title, blurb, href }, i) => {
            const key = `${src}-${i}`
            const Card = (
              <div className="group block glass rounded-2xl overflow-hidden glo-hover card">
                <img
                  src={src}
                  alt={alt || title || 'Case study'}
                  className="h-56 w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-5">
                  <h3 className="font-semibold">{title || `Case Study ${i + 1}`}</h3>
                  {blurb && <p className="text-sm text-gray-400 mt-1">{blurb}</p>}
                </div>
              </div>
            )
            return (
              <div key={key}>
                {href ? (
                  <a href={href} className="contents">
                    {Card}
                  </a>
                ) : (
                  Card
                )}
              </div>
            )
          })}
        </div>

        {ctaHref && (
          <div className="text-center mt-10">
            <a
              href={ctaHref}
              className="underline underline-offset-4 text-gray-300 hover:text-white glo-hover px-2 py-1 rounded"
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
