import { useLayoutEffect, useRef } from 'react'
import { Dumbbell, HeartPulse, Users, Flame, Bike, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setupGsap } from '../animations/gsap'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: Dumbbell, title: 'Premium Equipment', description: 'Top-tier machines and free weights engineered for performance, safety, and progress.' },
  { icon: Users, title: 'Personal Training', description: 'Expert one-on-one coaching tailored to your goals, lifestyle, and training level.' },
  { icon: HeartPulse, title: 'Group Classes', description: 'High-energy sessions that build strength, endurance, and community together.' },
  { icon: Flame, title: 'Strength Training', description: 'Structured programs focused on building power, resilience, and total-body strength.' },
  { icon: Bike, title: 'Cardio Zone', description: 'Modern cardio floor with equipment designed to elevate stamina and conditioning.' },
  { icon: Sparkles, title: 'Recovery Area', description: 'Dedicated space to reset, recharge, and support long-term performance and wellness.' },
]

const Features = () => {
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
    <section ref={sectionRef} className="bg-neutral-950 py-20 sm:py-28">
      <div className="container-max section-padding">
        <div ref={headingRef} className="mb-12 flex flex-col items-center text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent opacity-0">Why Train Here</p>
          <h2 className="font-display text-5xl leading-[0.9] uppercase text-white opacity-0 sm:text-6xl lg:text-7xl">
            EVERYTHING YOU NEED TO GET STRONGER
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-400 opacity-0 sm:text-base">
            A premium training environment with the tools, coaching, and atmosphere to unlock your best.
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="glass-card group relative h-full overflow-hidden rounded-2xl p-6 opacity-0 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(255,45,45,0.14)]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(255,45,45,0.18),transparent_45%)]" />
                <div className="relative">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent transition duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-3xl uppercase leading-none text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-400">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
