const variants = {
  default: 'glass',
  strong: 'glass-strong',
  card: 'glass-card',
}

const GlassPanel = ({ as: Tag = 'div', variant = 'default', className = '', children, ...props }) => {
  return (
    <Tag className={`${variants[variant] || variants.default} ${className}`} {...props}>
      {children}
    </Tag>
  )
}

export default GlassPanel
