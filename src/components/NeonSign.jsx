export default function NeonSign({ children, color='cyan', flicker='slow', as:Tag='h2', className='' }) {
    const colorCls   = color === 'pink' ? 'pink' : 'cyan'
    const flickerCls = flicker ? `flicker-${flicker}` : ''
    return (
      <Tag className={`neon-sign ${colorCls} ${flickerCls} ${className}`.trim()}>
        {children}
      </Tag>
    )
  }
  