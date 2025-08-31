// src/pages/Home.jsx (o donde tengas tu Home)
import GlowButton from '../components/GlowButton';
import NeonHeading from '../components/NeonHeading';
import NeonSign from '../components/NeonSign';
import TrustedBy from '../components/TrustedBy';
import { BOOK_SELFIE, BOOK_SILENT } from '../lib/constants';
import OurWork from '../components/OurWork'
import { OUR_WORK } from '../lib/constants'
import TestimonialsCarousel from '../components/TestimonialsCarousel'
import { TESTIMONIALS } from '../lib/constants'

export default function Home() {
  return (
    <>
      <title>Home | Glo Event Co</title>
      <meta
        name="description"
        content="Silent Disco rentals & Modern Photo Booth in St. Louis & nearby areas."
      />
      <link rel="canonical" href="https://www.gloeventco.com" />

      {/* JSON-LD LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Glo Event Co',
            telephone: '314-282-7888',
            email: 'info@gloeventco.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '11155 South Towne Sq. Suite C',
              addressLocality: 'St. Louis',
              addressRegion: 'MO',
              postalCode: '63123',
              addressCountry: 'US',
            },
            url: 'https://www.gloeventco.com',
            sameAs: ['https://glo-event-co.checkcherry.com'],
          }),
        }}
      />

      {/* Enable global hover glow on interactive elements */}
      <main className="flex-1 glo-scope">
        {/* HERO — split layout */}
        <section className="relative border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs tracking-widest text-gray-400">
                ST. LOUIS & SURROUNDING AREAS
              </p>
              <NeonSign as="h1" color="cyan" flicker="slow" className="mt-3 text-5xl md:text-6xl">
                Glo Event Co — Silent Disco & Photo Booth 
              </NeonSign>
              <p className="mt-5 text-gray-400 max-w-xl">
                Modern experiences for weddings, corporate events, and private parties.
                Clean setups, branded overlays, and a vibe that elevates your event.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <GlowButton href={BOOK_SELFIE} external appearance="glass">
                  Book Selfie Station
                </GlowButton>
                <GlowButton href={BOOK_SILENT} external variant="pink">
                  Book Silent Disco
                </GlowButton>
              </div>
            </div>

            {/* Media (image or video) */}
            <div className="relative rounded-2xl glass glo-hover">
              <img
                src="/images/hero.webp"
                alt="Glo Event Co — event setup"
                className="w-full h-[420px] object-cover"
                loading="eager"
              />
              {/* extra halo */}
              <div className="pointer-events-none absolute inset-0 drop-shadow-[0_0_24px_rgba(0,229,255,0.45)]" />
            </div>
          </div>
        </section>

        {/* LOGO STRIP — usando el componente TrustedBy */}
        <TrustedBy />

        {/* 50/50 — Silent Disco */}
        <section className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl">
                Silent Disco <span className="neon-text-cyan">Rentals</span>
              </h2>
              <p className="mt-4 text-gray-400">
                Up to <strong>3 channels</strong>, LED headsets, and a clean setup that looks great at any venue.
                Perfect for weddings, corporate events, and festivals.
              </p>
              <ul className="mt-5 grid gap-2 text-gray-300">
                <li className="glass rounded-xl px-4 py-2 glo-hover">High-quality wireless headsets</li>
                <li className="glass rounded-xl px-4 py-2 glo-hover">Multi-channel (LED color per channel)</li>
                <li className="glass rounded-xl px-4 py-2 glo-hover">Discreet equipment, strong signal</li>
              </ul>
              <div className="mt-6">
                <GlowButton href={BOOK_SILENT} external variant="pink">
                  View packages
                </GlowButton>
              </div>
            </div>

            <div className="relative rounded-2xl glass glo-hover">
              <img
                src="/images/silent-disco.jpg"
                alt="Silent Disco — LED headsets"
                className="w-full h-[380px] object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 drop-shadow-[0_0_26px_rgba(255,0,230,0.35)]" />
            </div>
          </div>
        </section>

        {/* 50/50 — Photo Booth (inverted) */}
        <section className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1 relative rounded-2xl glass glo-hover">
              <img
                src="/images/photo-booth.png"
                alt="Modern Photo Booth — selfie station"
                className="w-full h-[380px] object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 drop-shadow-[0_0_26px_rgba(0,229,255,0.35)]" />
            </div>

            <div className="order-1 md:order-2">
              <h2 className="font-display text-4xl md:text-5xl">
                Modern <span className="neon-text-cyan">Photo Booth</span>
              </h2>
              <p className="mt-4 text-gray-400">
                Photos, GIFs, and boomerangs with brand overlays. Share via text/email and a minimal footprint.
              </p>
              <ul className="mt-5 grid gap-2 text-gray-300">
                <li className="glass rounded-xl px-4 py-2 glo-hover">Custom overlays</li>
                <li className="glass rounded-xl px-4 py-2 glo-hover">Online gallery</li>
                <li className="glass rounded-xl px-4 py-2 glo-hover">Friendly staff and fast setup</li>
              </ul>
              <div className="mt-6">
                <GlowButton href={BOOK_SELFIE} external>
                  View packages
                </GlowButton>
              </div>
            </div>
          </div>
        </section>

        <OurWork items={OUR_WORK} />


        {/* TESTIMONIALS */}
        <TestimonialsCarousel
  items={TESTIMONIALS} />

        {/* FINAL CTA (higher contrast on gradient) */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div
              className="rounded-2xl px-6 py-10 text-black
                         bg-gradient-to-br from-[var(--color-neon-cyan)] to-[var(--color-neon-mint)]
                         shadow-[var(--shadow-glow)] glo-hover"
            >
              <h3 className="font-display text-2xl md:text-3xl">Ready to make your event glow?</h3>
              <p className="mt-2">Check availability or request a quote in minutes.</p>
              <div className="mt-6 flex gap-3 justify-center">
                {/* glass = better contrast on cyan/mint background */}
                <GlowButton href={BOOK_SELFIE} external appearance="glass">
                  Selfie Station
                </GlowButton>
                <GlowButton href={BOOK_SILENT} external variant="pink">
                  Silent Disco
                </GlowButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
