export default function GlowButton({
    children,
    href,
    onClick,
    external = false,
    variant = 'cyan',          // cyan | pink
    appearance = 'solid',      // solid | glass | outline
    alwaysOn = false,
  }) {
    const solidGrad =
      variant === 'pink'
        ? 'bg-gradient-to-br from-[var(--color-neon-pink)] to-[var(--color-neon-purple)]'
        : 'bg-gradient-to-br from-[var(--color-neon-cyan)] to-[var(--color-neon-mint)]'
  
    const hoverCls =
      variant === 'pink'
        ? alwaysOn ? 'glo-on-pink' : 'glo-hover-pink'
        : alwaysOn ? 'glo-on'     : 'glo-hover'
  
    const base =
      appearance === 'solid'
        ? `text-black ${solidGrad} ${hoverCls}`
        : appearance === 'glass'
        ? `text-white bg-white/10 border border-white/20 backdrop-blur ${hoverCls}`
        : /* outline */
          `text-white border border-white/40 bg-transparent ${hoverCls}`
  
    const btn = (
      <span
        className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold ${base}`}
      >
        {children}
      </span>
    )
  
    if (href) {
      return (
        <a href={href} onClick={onClick} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
          {btn}
        </a>
      )
    }
    return <button onClick={onClick}>{btn}</button>
  }
  