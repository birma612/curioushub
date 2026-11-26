import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { X, ZoomIn } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setupGsap } from '../animations/gsap'

gsap.registerPlugin(ScrollTrigger)

const images = [
  { src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80', title: 'Weight Training', span: 'md:col-span-2 md:row-span-2' },
  { src: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=80', title: 'Cardio Zone', span: '' },
  { src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80', title: 'Personal Training', span: '' },
  { src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80', title: 'Gym Interior', span: 'md:col-span-2' },
  { src: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=900&q=80', title: 'Group Workouts', span: '' },
  { src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80', title: 'Strength & Equipment', span: '' },
  { src: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80', title: 'Members Training', span: 'md:col-span-2' },
]

const Gallery = () => {
  const [active, setActive] = useState(null)
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const gridRef = useRef(null)

  useLayoutEffect(() => {
    setupGsap()
    const section = sectionRef.current
    if (!section) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.children || [],
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 80%', once: true } },
      )
      gsap.fromTo(
        gridRef.current?.children || [],
        { autoAlpha: 0, y: 40, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%', once: true } },
      )
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!active) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
    }
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = original
      window.removeEventListener('keydown', onKey)
    }
  }, [active])

  return (
    <section ref={sectionRef} id="gallery" className="bg-neutral-950 py-20 sm:py-28">
      <div className="container-max section-padding">
        <div ref={headingRef} className="mb-12 flex flex-col items-center text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent opacity-0">Gallery</p>
          <h2 className="font-display text-5xl leading-[0.9] uppercase text-white opacity-0 sm:text-6xl lg:text-7xl">
            INSIDE IRONFORGE
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-400 opacity-0 sm:text-base">
            A look at the energy, equipment, and people that define the IRONFORGE experience.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[180px] md:grid-cols-4 lg:auto-rows-[210px]">
          {images.map((image) => (
            <div key={image.title} className={`opacity-0 ${image.span}`}>
              <button
                type="button"
                onClick={() => setActive(image)}
                className="glass-card group relative h-64 w-full overflow-hidden rounded-2xl text-left md:h-full"
              >
                <img
                  src={image.src}
                  alt={`${image.title} at IRONFORGE gym`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                  <div>
                    <p className="font-display text-2xl uppercase leading-none text-white">{image.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-300">View Image</p>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition group-hover:border-accent group-hover:bg-accent">
                    <ZoomIn size={16} />
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/10"
            onClick={() => setActive(null)}
            aria-label="Close image"
          >
            <X size={20} />
          </button>
          <div className="max-h-[85vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={active.src.replace('w=1200', 'w=1600').replace('w=900', 'w=1600')}
              alt={`${active.title} at IRONFORGE gym`}
              className="max-h-[75vh] w-full rounded-2xl object-contain"
            />
            <p className="mt-4 text-center font-display text-3xl uppercase tracking-wide text-white">{active.title}</p>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default Gallery
