import { useLayoutEffect, useRef, useState } from 'react'
import { Check, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setupGsap } from '../animations/gsap'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'BASIC',
    price: '₹999',
    period: '/ month',
    features: ['Gym Access', 'Cardio Area', 'Locker Access', 'Free Fitness Assessment'],
    button: 'GET STARTED',
    popular: false,
  },
  {
    name: 'PRO',
    price: '₹1,999',
    period: '/ month',
    features: [
      'Unlimited Gym Access',
      'Personal Training',
      'Group Classes',
      'Nutrition Guidance',
      'Progress Tracking',
    ],
    button: 'JOIN NOW',
    popular: true,
  },
  {
    name: 'ELITE',
    price: '₹3,999',
    period: '/ month',
    features: [
      'Everything in Pro',
      'Dedicated Personal Trainer',
      'Custom Meal Plan',
      'Priority Support',
      'Recovery Sessions',
    ],
    button: 'GO ELITE',
    popular: false,
  },
]

const Membership = () => {
  const [selected, setSelected] = useState('PRO')
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

      const cards = Array.from(cardsRef.current?.children || [])
      cards.forEach((card, i) => {
        const isPopular = plans[i]?.popular
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: isPopular ? 70 : 50, scale: isPopular ? 0.92 : 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: isPopular ? 1 : 0.8,
            delay: i * 0.12,
            ease: isPopular ? 'back.out(1.2)' : 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 75%', once: true },
          },
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="membership" className="relative overflow-hidden bg-[#070707] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container-max section-padding">
        <div ref={headingRef} className="mb-12 flex flex-col items-center text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent opacity-0">Membership</p>
          <h2 className="font-display text-5xl leading-[0.9] uppercase text-white opacity-0 sm:text-6xl lg:text-7xl">
            CHOOSE YOUR MEMBERSHIP
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-400 opacity-0 sm:text-base">
            Flexible plans built for every stage of your fitness journey, from getting started to going all in.
          </p>
        </div>

        <div ref={cardsRef} className="grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const isSelected = selected === plan.name
            const isPopular = plan.popular
            return (
              <div
                key={plan.name}
                role="button"
                tabIndex={0}
                onClick={() => setSelected(plan.name)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setSelected(plan.name)
                }}
                className={`relative h-full cursor-pointer rounded-3xl border p-7 opacity-0 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 ${
                  isPopular
                    ? 'border-accent/60 bg-gradient-to-b from-accent/15 to-white/[0.02] shadow-[0_25px_60px_rgba(255,45,45,0.18)] lg:-translate-y-2'
                    : 'glass-card hover:border-white/25'
                } ${isSelected ? 'ring-1 ring-accent/50' : ''}`}
                aria-pressed={isSelected}
              >
                {isPopular ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-red-900/40">
                      <Sparkles size={12} /> Popular
                    </span>
                  </div>
                ) : null}

                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-4xl uppercase leading-none text-white">{plan.name}</h3>
                    <div className="mt-4 flex items-end gap-1">
                      <span className="font-display text-5xl leading-none text-white">{plan.price}</span>
                      <span className="pb-1 text-sm text-neutral-400">{plan.period}</span>
                    </div>
                  </div>
                  <div
                    className={`mt-1 h-5 w-5 rounded-full border ${isSelected ? 'border-accent bg-accent' : 'border-white/30'}`}
                    aria-hidden="true"
                  >
                    {isSelected ? <span className="block h-full w-full rounded-full bg-white/20" /> : null}
                  </div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-neutral-300">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`mt-8 w-full rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-wide transition ${
                    isPopular
                      ? 'bg-accent text-white hover:bg-accent-dark hover:shadow-[0_12px_30px_rgba(255,45,45,0.35)]'
                      : 'border border-white/15 bg-white/5 text-white hover:border-accent/40 hover:bg-accent/10'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelected(plan.name)
                    const el = document.getElementById('contact')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {plan.button}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Membership
