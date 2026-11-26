import { useLayoutEffect, useRef } from 'react'
import { Star, ArrowRightLeft } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setupGsap } from '../animations/gsap'
import { testimonials } from '../data/testimonials'

gsap.registerPlugin(ScrollTrigger)

const Stars = ({ count }) => (
  <div className="flex items-center gap-1 text-accent" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
    ))}
  </div>
)

const Testimonials = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)

  useLayoutEffect(() => {
    setupGsap()
    const section = sectionRef.current
    if (!section) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const mm = gsap.matchMedia(section)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.children || [],
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 80%', once: true } },
      )

      mm.add('(min-width: 768px)', () => {
        gsap.fromTo(
          cardsRef.current?.children || [],
          { autoAlpha: 0, x: 60, y: 20 },
          { autoAlpha: 1, x: 0, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%', once: true } },
        )
      })

      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(
          cardsRef.current?.children || [],
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 78%', once: true } },
        )
      })
    }, section)

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#070707] py-20 sm:py-28">
      <div className="container-max section-padding">
        <div ref={headingRef} className="mb-12 flex flex-col items-center text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent opacity-0">Transformations</p>
          <h2 className="font-display text-5xl leading-[0.9] uppercase text-white opacity-0 sm:text-6xl lg:text-7xl">
            REAL PEOPLE.
            <br />
            REAL RESULTS.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-400 opacity-0 sm:text-base">
            Proof that consistency, coaching, and the right environment can change everything.
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="glass-card h-full overflow-hidden rounded-2xl opacity-0">
              <div className="relative grid grid-cols-2">
                <div className="relative h-48 sm:h-56">
                  <img src={item.before} alt={`${item.name} before training at IRONFORGE`} className="h-full w-full object-cover" loading="lazy" />
                  <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-200">Before</span>
                </div>
                <div className="relative h-48 sm:h-56">
                  <img src={item.after} alt={`${item.name} after training at IRONFORGE`} className="h-full w-full object-cover" loading="lazy" />
                  <span className="absolute bottom-2 left-2 rounded bg-accent/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">After</span>
                </div>
                <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur-sm">
                    <ArrowRightLeft size={14} />
                  </span>
                </div>
              </div>

              <div className="p-6">
                <Stars count={item.rating} />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{item.result}</p>
                <p className="mt-4 text-sm leading-7 text-neutral-300">“{item.quote}”</p>
                <p className="mt-5 font-display text-2xl uppercase leading-none text-white">— {item.name}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
