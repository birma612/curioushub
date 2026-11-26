import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setupGsap } from '../animations/gsap'
import { programs } from '../data/programs'

gsap.registerPlugin(ScrollTrigger)

const Programs = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)

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
        cardsRef.current?.children || [],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%', once: true } },
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="programs" className="bg-[#070707] py-20 sm:py-28">
      <div className="container-max section-padding">
        <div ref={headingRef} className="mb-12 flex flex-col items-center text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent opacity-0">Programs</p>
          <h2 className="font-display text-5xl leading-[0.9] uppercase text-white opacity-0 sm:text-6xl lg:text-7xl">
            TRAIN WITH PURPOSE
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-400 opacity-0 sm:text-base">
            Choose a program designed around your goals, from building strength to transforming performance.
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <article key={program.title} className="glass-card group relative overflow-hidden rounded-2xl opacity-0 transition duration-300 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={program.image}
                  alt={`${program.title} training at IRONFORGE`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition duration-500 group-hover:from-black/90 group-hover:via-black/50" />
                <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-200 backdrop-blur-sm">
                  {program.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-3xl uppercase leading-none text-white">{program.title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-400">{program.description}</p>
                <Link
                  to="/membership"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent transition group-hover:gap-3 hover:text-red-400"
                >
                  Join Program
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Programs
