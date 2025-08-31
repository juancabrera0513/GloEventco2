// src/components/TestimonialsCarousel.jsx
import React, { useEffect, useRef, useState, createRef } from 'react'

// Line-clamp sin plugin
const clampStyle = (lines) => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})

// Fade con máscara (sin rectángulo)
const fadeMaskStyle = {
  WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent)',
  maskImage: 'linear-gradient(to bottom, black 78%, transparent)',
}

export default function TestimonialsCarousel({
  items = [],
  title = 'What clients say',
  kicker = 'TESTIMONIALS',
  autoPlay = false,
  interval = 5000,
  // Fallback por longitud (por si algún navegador no reporta overflow)
  wordThreshold = 45,
  charThreshold = 260,
  // Líneas visibles antes del clamp
  linesSm = 6,
  linesMd = 6,
  linesLg = 6,
}) {
  const scrollerRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [expanded, setExpanded] = useState({}) // { [i]: true|false }
  const many = items.length > 1

  // refs para medir overflow real
  const quoteRefs = useRef([])
  useEffect(() => {
    quoteRefs.current = items.map((_, i) => quoteRefs.current[i] || createRef())
  }, [items.length])

  const [overflows, setOverflows] = useState([])

  // autoplay
  useEffect(() => {
    if (!many || !autoPlay) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), interval)
    return () => clearInterval(id)
  }, [many, autoPlay, interval, items.length])

  // centrar slide activo
  useEffect(() => {
    if (!many) return
    const el = scrollerRef.current
    const child = el?.children?.[index]
    if (!el || !child) return
    const left = child.offsetLeft - (el.clientWidth - child.clientWidth) / 2
    el.scrollTo({ left, behavior: 'smooth' })
  }, [index, many])

  // líneas por breakpoint
  const getClampLines = () => {
    if (typeof window === 'undefined') return linesSm
    if (window.matchMedia('(min-width:1024px)').matches) return linesLg
    if (window.matchMedia('(min-width:768px)').matches)  return linesMd
    return linesSm
  }
  const [clampLines, setClampLines] = useState(getClampLines)
  useEffect(() => {
    const on = () => setClampLines(getClampLines())
    const mqMd = window.matchMedia('(min-width:768px)')
    const mqLg = window.matchMedia('(min-width:1024px)')
    mqMd.addEventListener?.('change', on)
    mqLg.addEventListener?.('change', on)
    return () => {
      mqMd.removeEventListener?.('change', on)
      mqLg.removeEventListener?.('change', on)
    }
  }, [])

  // medición robusta de overflow (y re-medir en resize/fonts)
  useEffect(() => {
    const measure = () => {
      const arr = quoteRefs.current.map((r, i) => {
        const el = r?.current
        if (!el) return false
        if (expanded[i]) return false
        return el.scrollHeight > el.clientHeight + 1
      })
      setOverflows(arr)
    }
    const ro = new ResizeObserver(measure)
    quoteRefs.current.forEach((r) => r?.current && ro.observe(r.current))
    document?.fonts?.ready?.then(() => requestAnimationFrame(measure)).catch(() => {})
    window.addEventListener('resize', measure)
    const raf = requestAnimationFrame(measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); cancelAnimationFrame(raf) }
  }, [items.length, clampLines, expanded])

  // fallback por longitud
  const longFallback = (quote = '') => {
    const words = quote.trim().split(/\s+/).filter(Boolean).length
    return words > wordThreshold || quote.length > charThreshold
  }
  const shouldShowReadMore = (i, quote) => overflows[i] || (!overflows[i] && longFallback(quote))

  const next = () => setIndex((i) => (i + 1) % items.length)
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)

  // ---- Card reutilizable ----
  // En móvil: altura automática; imagen con h-56/h-64; texto debajo.
  // Desde md: dos columnas y altura fija (h-[340]/[360]) para un look consistente.
  const Card = ({ t, i }) => {
    const imgSrc = t.image || t.photo || t.avatar
    const alt = t.alt || t.name || 'Testimonial'
    const objPos = t.objectPosition || 'center'
    const isOpen = !!expanded[i]
    const showMore = shouldShowReadMore(i, t.quote)

    return (
      <article
        className={
          many
            ? 'snap-center shrink-0 basis-[90%] sm:basis-[86%] md:basis-[72%] lg:basis-[60%] xl:basis-[52%] 2xl:basis-[48%]'
            : ''
        }
      >
        <div
          className={[
            // móvil: una columna, altura auto
            'grid grid-rows-[auto_1fr] md:grid-rows-none md:grid-cols-2',
            'rounded-2xl overflow-hidden neon-border glo-hover',
            // altura fija solo desde md
            'md:h-[340px] lg:h-[360px]',
          ].join(' ')}
        >
          {/* Imagen */}
          <div className="relative">
            {imgSrc && (
              <img
                src={imgSrc}
                alt={alt}
                className="w-full h-56 sm:h-64 md:h-full object-cover"
                style={{ objectPosition: objPos }}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            )}
            <div className="pointer-events-none absolute inset-0 drop-shadow-[0_0_24px_rgba(0,229,255,0.24)]" />
          </div>

          {/* Texto */}
          <div className="glass bg-black/30 backdrop-blur p-4 sm:p-5 md:p-6 flex flex-col min-w-0">
            {/* Contenedor del quote: en móvil auto; desde md ocupa el alto disponible */}
            <div className={`relative ${isOpen ? 'md:flex-1 md:min-h-0 md:overflow-auto md:pr-2' : 'md:flex-1 md:min-h-0 md:overflow-hidden'}`}>
              <blockquote
                ref={quoteRefs.current[i]}
                className="text-[15px] sm:text-base md:text-lg text-gray-100"
                style={
                  isOpen
                    ? undefined
                    : { ...clampStyle(clampLines), ...(showMore ? fadeMaskStyle : {}) }
                }
                title={t.quote}
              >
                {t.quote}
              </blockquote>
            </div>

            <div className="mt-4 flex items-center gap-3 justify-between shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                {t.avatar && (
                  <img
                    src={t.avatar}
                    alt=""
                    className="h-9 w-9 rounded-full object-cover neon-border glo-drop shrink-0"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                )}
                <div className="min-w-0">
                  <div className="font-semibold leading-tight truncate">{t.name}</div>
                  {(t.role || t.company || t.event) && (
                    <div className="text-xs text-gray-300 truncate">
                      {[t.role, t.company, t.event].filter(Boolean).join(' • ')}
                    </div>
                  )}
                </div>
              </div>

              {showMore && (
                <button
                  type="button"
                  className="text-xs sm:text-sm underline underline-offset-4 glo-hover px-2 py-1 rounded"
                  onClick={() => setExpanded((s) => ({ ...s, [i]: !s[i] }))}
                  aria-expanded={isOpen}
                >
                  {isOpen ? 'Read less' : 'Read more'}
                </button>
              )}
            </div>
          </div>
        </div>
      </article>
    )
  }

  // ---- 1 item ----
  if (!many) {
    const t = items[0]
    if (!t) return null
    return (
      <section className="border-b border-white/5" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            {kicker && <p className="text-xs tracking-widest text-gray-500">{kicker}</p>}
            <h2 id="testimonials-heading" className="font-display text-3xl md:text-4xl mt-2 neon-text-cyan">
              {title}
            </h2>
          </div>
          <div className="mt-10">
            <Card t={t} i={0} />
          </div>
        </div>
      </section>
    )
  }

  // ---- Carrusel (2+) ----
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
            className={[
              'flex gap-4 sm:gap-5 px-1 py-2',
              'overflow-x-auto overflow-y-hidden',
              'snap-x snap-mandatory scroll-smooth overscroll-contain',
              '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
            ].join(' ')}
            role="listbox"
            aria-label="Client testimonials"
            tabIndex={0}
            style={{ touchAction: 'pan-x' }} // mejora swipe horizontal en algunos navegadores
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') { e.preventDefault(); setIndex((i) => (i + 1) % items.length) }
              if (e.key === 'ArrowLeft')  { e.preventDefault(); setIndex((i) => (i - 1 + items.length) % items.length) }
            }}
          >
            {items.map((t, i) => (
              <Card key={(t.name || 't') + i} t={t} i={i} />
            ))}
          </div>

          {/* Flechas: ocultas en móvil para no tapar swipe */}
          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={prev}
                className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 items-center justify-center h-10 w-10 rounded-lg neon-border bg-white/5 backdrop-blur glo-hover"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>

              <button
                type="button"
                aria-label="Next testimonial"
                onClick={next}
                className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 items-center justify-center h-10 w-10 rounded-lg neon-border bg-white/5 backdrop-blur glo-hover"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </>
          )}

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={[
                  'h-2.5 w-2.5 rounded-full transition-all',
                  i === index ? 'bg-[var(--color-neon-cyan)] shadow-[var(--shadow-glow)]'
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
