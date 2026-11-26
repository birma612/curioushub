import { useLayoutEffect, useRef } from 'react'
import { X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setupGsap } from '../animations/gsap'
import { trainers } from '../data/trainers'

gsap.registerPlugin(ScrollTrigger)

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
  </svg>
)

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6h1.5V3.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H8v3h2.5v8h3z" />
  </svg>
)

const socialIcons = [InstagramIcon, FacebookIcon, X]

const Trainers = () => {
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
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%', once: true } },
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="trainers" className="bg-neutral-950 py-20 sm:py-28">
      <div className="container-max section-padding">
        <div ref={headingRef} className="mb-12 flex flex-col items-center text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent opacity-0">Team</p>
          <h2 className="font-display text-5xl leading-[0.9] uppercase text-white opacity-0 sm:text-6xl lg:text-7xl">
            MEET THE EXPERTS
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-400 opacity-0 sm:text-base">
            Certified professionals dedicated to coaching, accountability, and real results.
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer) => (
            <article key={trainer.name} className="glass-card group overflow-hidden rounded-2xl opacity-0 transition duration-300 hover:-translate-y-1.5 hover:border-accent/40">
              <div className="relative h-96 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={`${trainer.name}, ${trainer.specialty} at IRONFORGE`}
                  className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 right-4 flex translate-y-3 items-center justify-end gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {socialIcons.map((Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      aria-label={`${trainer.name} social profile`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition hover:border-accent hover:bg-accent"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-3xl uppercase leading-none text-white">{trainer.name}</h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-accent">{trainer.specialty}</p>
                <p className="mt-2 text-sm text-neutral-400">{trainer.experience}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trainers
