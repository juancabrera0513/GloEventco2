import { useEffect, useRef, useState, createRef } from 'react'

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefers(!!mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])
  return prefers
}

export default function TestimonialsCarousel({
  items = [],
  title = 'What clients say',
  kicker = 'TESTIMONIALS',
  autoPlay = true,
  interval = 5000,
}) {
  const scrollerRef = useRef(null)
  const slideRefs = useRef([])
  const hoveringRef = useRef(false)
  const [index, setIndex] = useState(0)
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    slideRefs.current = items.map((_, i) => slideRefs.current[i] || createRef())
  }, [items.length])

  // ⬇️ scroll solo en X (evita saltos verticales del documento)
  const scrollToIndex = (i, behavior = reduceMotion ? 'auto' : 'smooth') => {
    const el = scrollerRef.current
    const slide = slideRefs.current[i]?.current
    if (!el || !slide) return
    const left = slide.offsetLeft - (el.clientWidth - slide.clientWidth) / 2
    el.scrollTo({ left, behavior })
  }

  const goTo = (i) => {
    const len = Math.max(items.length, 1)
    const clamped = (i + len) % len
    setIndex(clamped)
    scrollToIndex(clamped)
  }
  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  // centra el primer slide sin animación
  useEffect(() => {
    if (items.length) scrollToIndex(0, 'auto')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length])

  // sync índice al hacer scroll manual
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2
      let best = 0, bestDist = Infinity
      slideRefs.current.forEach((r, i) => {
        const s = r.current
        if (!s) return
        const mid = s.offsetLeft + s.clientWidth / 2
        const d = Math.abs(center - mid)
        if (d < bestDist) { bestDist = d; best = i }
      })
      setIndex(best)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // autoplay con pausa por hover y reduce-motion
  useEffect(() => {
    if (!autoPlay || reduceMotion || items.length <= 1) return
    const id = setInterval(() => { if (!hoveringRef.current) next() }, interval)
    return () => clearInterval(id)
  }, [autoPlay, reduceMotion, interval, items.length, index])

  return (
    <section className="border-b border-white/5" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          {kicker && <p className="text-xs tracking-widest text-gray-500">{kicker}</p>}
          <h2 id="testimonials-heading" className="font-display text-3xl md:text-4xl mt-2 neon-text-cyan">
            {title}
          </h2>
        </div>

        <div
          className="relative mt-10"
          onMouseEnter={() => (hoveringRef.current = true)}
          onMouseLeave={() => (hoveringRef.current = false)}
        >
          <div
            ref={scrollerRef}
            className={[
              'flex gap-6 px-1 py-2',
              'overflow-x-auto overflow-y-hidden',   // ⬅️ bloquea scroll vertical interno
              'snap-x snap-mandatory',
              'scroll-smooth',
              'overscroll-contain',                  // ⬅️ evita que la rueda burbujee al body
              '[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]',
            ].join(' ')}
            role="listbox"
            aria-label="Client testimonials"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') { e.preventDefault(); next() }
              if (e.key === 'ArrowLeft')  { e.preventDefault(); prev() }
            }}
          >
            {items.map((t, i) => (
              <article
                key={(t.name || 't') + i}
                ref={slideRefs.current[i]}
                role="option"
                aria-selected={index === i}
                className="snap-center shrink-0 basis-full md:basis-1/2 lg:basis-1/3 glass rounded-2xl p-6 glo-hover"
              >
                <div className="flex items-center gap-3">
                  {t.avatar && (
                    <img
                      src={t.avatar}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover neon-border glo-drop"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  )}
                  <div>
                    <h3 className="font-semibold leading-tight">{t.name}</h3>
                    {t.role && <p className="text-xs text-gray-400">{t.role}</p>}
                  </div>
                </div>

                <blockquote className="mt-4 text-gray-300">{t.quote}</blockquote>

                {(t.event || t.company) && (
                  <p className="mt-3 text-xs text-gray-500">
                    {[t.company, t.event].filter(Boolean).join(' • ')}
                  </p>
                )}
              </article>
            ))}
          </div>

          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center h-9 w-9 rounded-lg neon-border bg-white/5 backdrop-blur glo-hover"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Next testimonial"
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center h-9 w-9 rounded-lg neon-border bg-white/5 backdrop-blur glo-hover"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </>
          )}

          {items.length > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={[
                    'h-2.5 w-2.5 rounded-full transition-all',
                    i === index
                      ? 'bg-[var(--color-neon-cyan)] shadow-[var(--shadow-glow)]'
                      : 'bg-white/20 hover:bg-white/40',
                  ].join(' ')}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
