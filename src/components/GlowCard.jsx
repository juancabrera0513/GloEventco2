export default function GlowCard({ title, eyebrow, children, cta, href, variant='cyan', alwaysOn=false }) {
    const hoverCls = variant === 'pink'
      ? (alwaysOn ? 'glo-on-pink' : 'glo-hover-pink')
      : (alwaysOn ? 'glo-on'     : 'glo-hover')
  
    return (
      <div className={`glass rounded-2xl p-6 transition-shadow ${hoverCls}`}>
        {eyebrow && <div className="text-xs tracking-widest text-[color:var(--color-neon-cyan)]/90">{eyebrow}</div>}
        <h3 className="font-display text-xl mt-1 mb-3 neon-text-cyan">{title}</h3>
        <div className="prose prose-invert max-w-none text-gray-300">{children}</div>
        {href && (
          <a className="inline-block mt-4 underline underline-offset-4 glo-hover" href={href} target="_blank" rel="noreferrer">
            {cta || 'Learn more →'}
          </a>
        )}
      </div>
    )
  }
  