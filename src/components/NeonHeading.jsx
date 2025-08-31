export default function NeonHeading({ kicker, title, subtitle }){
    return (
    <div className="text-center max-w-3xl mx-auto">
    {kicker && <div className="text-xs tracking-widest text-neon-cyan/90">{kicker}</div>}
    <h2 className="font-display text-4xl md:text-5xl mt-2 neon-text-cyan animate-flicker">{title}</h2>
    {subtitle && <p className="text-gray-400 mt-3">{subtitle}</p>}
    </div>
    )
    }