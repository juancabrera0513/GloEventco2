// src/components/TestimonialsCarousel.jsx
import React, { useEffect, useRef, useState } from 'react'

// Line-clamp sin plugin
const clampStyle = (lines) => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})

export default function TestimonialsCarousel({
  items = [],
  title = 'What clients say',
  kicker = 'TESTIMONIALS',
  autoPlay = false,
  interval = 5000,
  linesSm = 6,
  linesMd = 6,
  linesLg = 6,
}) {
  const scrollerRef = useRef(null)
  const cardRefs = useRef([])
  const [index, setIndex] = useState(0)
  const [expanded, setExpanded] = useState({})

  const getClampLines = () => {
    if (typeof window === 'undefined') return linesSm
    if (window.matchMedia('(min-width:1024px)').matches) return linesLg
    if (window.matchMedia('(min-width:768px)').matches)  return linesMd
    return linesSm
  }
  const [clampLines, setClampLines] = useState(getClampLines)
  useEffect(() => {
    const on = () => setClampLines(getClampLines())
    const md = window.matchMedia('(min-width:768px)')
    const lg = window.matchMedia('(min-width:1024px)')
    md.addEventListener?.('change', on)
    lg.addEventListener?.('change', on)
    return () => { md.removeEventListener?.('change', on); lg.removeEventListener?.('change', on) }
  }, [])

  const scrollToIndex = (i, behavior = 'smooth') => {
    const el = scrollerRef.current
    const card = cardRefs.current[i]
    if (!el || !card) return
    const left = card.offsetLeft - (el.clientWidth - card.clientWidth) / 2
    el.scrollTo({ left, behavior })
  }
  const next = () => setIndex((i) => (i + 1) % items.length)
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)

  useEffect(() => {
    if (items.length <= 1) return
    scrollToIndex(index, index === 0 ? 'auto' : 'smooth')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, items.length])

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), interval)
    return () => clearInterval(id)
  }, [autoPlay, interval, items.length])

  // Mantiene dots en sync sin “pegones”
  useEffect(() => {
    const root = scrollerRef.current
    if (!root) return
    const obs = new IntersectionObserver(
      (entries) => {
        let bestI = index, bestRatio = 0
        entries.forEach((e) => {
          if (e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio
            bestI = Number(e.target.dataset.idx || 0)
          }
        })
        setIndex(bestI)
      },
      { root, threshold: [0.4, 0.6, 0.8] }
    )
    cardRefs.current.forEach((n) => n && obs.observe(n))
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length])

  const Card = ({ t, i }) => {
    const imgSrc = t.image || t.photo || t.avatar
    const alt = t.alt || t.name || 'Testimonial'
    const objPos = t.objectPosition || 'center'
    const isOpen = !!expanded[i]

    return (
      <article
        ref={(n) => (cardRefs.current[i] = n)}
        data-idx={i}
        className="snap-center shrink-0 basis-[90%] sm:basis-[86%] md:basis-[72%] lg:basis-[60%] xl:basis-[52%] 2xl:basis-[48%]"
      >
        <div className="grid grid-rows-[auto_1fr] md:grid-rows-none md:grid-cols-2 rounded-2xl overflow-hidden neon-border glo-hover md:h-[360px]">
          {/* Imagen como background */}
          <div
            role="img"
            aria-label={alt}
            className="w-full h-56 sm:h-64 md:h-full"
            style={{
              backgroundImage: imgSrc ? `url("${imgSrc}")` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: objPos,
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Texto */}
          <div className="glass bg-black/30 backdrop-blur p-4 sm:p-5 md:p-6 min-w-0 flex flex-col">
            <div className={`relative flex-1 min-h-0 ${isOpen ? 'overflow-auto pr-2' : 'overflow-hidden pb-16'}`}>
              <blockquote
                className="m-0 leading-relaxed text-[15px] sm:text-base md:text-lg text-gray-100"
                style={isOpen ? undefined : clampStyle(clampLines)}
              >
                {t.quote}
              </blockquote>

              {!isOpen && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(10,10,15,0) 0%, rgba(10,10,15,0.88) 60%, rgba(10,10,15,0.96) 100%)',
                  }}
                />
              )}
            </div>

            {/* Footer (nombre/rol) + botón en su PROPIA fila, alineado a la derecha */}
            <div className="mt-4">
              <div className="min-w-0">
                <div className="font-semibold leading-tight truncate">{t.name}</div>
                {(t.role || t.company || t.event) && (
                  <div className="text-xs text-gray-300 truncate">
                    {[t.role, t.company, t.event].filter(Boolean).join(' • ')}
                  </div>
                )}
              </div>

              <button
                type="button"
                className="mt-3 block w-fit ml-auto text-xs sm:text-sm underline underline-offset-4 glo-hover-soft px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                onClick={() => setExpanded((s) => ({ ...s, [i]: !s[i] }))}
                aria-expanded={isOpen}
              >
                {isOpen ? 'Read less' : 'Read more'}
              </button>
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <section className="border-b border-white/5" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          {kicker && <p className="text-xs tracking-widest text-gray-500">{kicker}</p>}
          <h2 id="testimonials-heading" className="font-display text-3xl md:text-4xl mt-2 neon-text-cyan">
            {title}
          </h2>
        </div>

        <div className="relative mt-10" role="region" aria-roledescription="carousel">
          <div
            ref={scrollerRef}
            className="flex gap-4 sm:gap-5 px-1 py-2 overflow-x-auto overflow-y-hidden snap-x snap-proximity scroll-smooth overscroll-contain"
            role="listbox"
            aria-label="Client testimonials"
            tabIndex={0}
            style={{ touchAction: 'pan-x' }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') { e.preventDefault(); next() }
              if (e.key === 'ArrowLeft')  { e.preventDefault(); prev() }
            }}
          >
            {items.map((t, i) => (
              <Card key={(t.name || 't') + i} t={t} i={i} />
            ))}
          </div>

          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => { prev(); scrollToIndex((index - 1 + items.length) % items.length) }}
                className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 items-center justify-center h-10 w-10 rounded-lg neon-border bg-white/5 backdrop-blur glo-hover"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => { next(); scrollToIndex((index + 1) % items.length) }}
                className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 items-center justify-center h-10 w-10 rounded-lg neon-border bg-white/5 backdrop-blur glo-hover"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </>
          )}

          <div className="mt-6 flex justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={[
                  'h-2.5 w-2.5 rounded-full transition-all',
                  i === index
                    ? 'bg-[var(--color-neon-cyan)] shadow-[var(--shadow-glow)]'
                    : 'bg-white/20 hover:bg-white/40',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
