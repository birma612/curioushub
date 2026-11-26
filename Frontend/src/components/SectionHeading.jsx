import Reveal from './Reveal'

const SectionHeading = ({ eyebrow, title, description, align = 'center' }) => {
  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center'

  return (
    <Reveal className={`mb-12 flex flex-col ${alignClass}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-5xl leading-[0.9] uppercase text-white sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 max-w-2xl text-sm leading-7 text-neutral-400 sm:text-base ${align === 'left' ? '' : 'mx-auto'}`}>
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}

export default SectionHeading
