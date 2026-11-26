const base =
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold uppercase tracking-wide transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 disabled:cursor-not-allowed disabled:opacity-70'

const variants = {
  primary:
    'bg-accent px-7 py-3.5 text-white hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-[0_12px_30px_rgba(255,45,45,0.4)]',
  secondary:
    'glass px-7 py-3.5 text-white hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10',
  outline:
    'border border-white/15 bg-white/5 px-6 py-3 text-white hover:border-accent/50 hover:bg-accent/10',
}

const Button = ({ as: Tag = 'button', variant = 'primary', className = '', children, ...props }) => {
  return (
    <Tag className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </Tag>
  )
}

export default Button
