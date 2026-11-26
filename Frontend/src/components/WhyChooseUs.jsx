import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setupGsap } from '../animations/gsap'

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  { num: '01', title: 'Premium Equipment', text: 'Train with industry-leading machines and free weights built for serious results.' },
  { num: '02', title: 'Certified Trainers', text: 'Work with experienced coaches who guide, motivate, and refine every session.' },
  { num: '03', title: 'Personalized Programs', text: 'Structured plans tailored to your goals, schedule, and current fitness level.' },
  { num: '04', title: 'Results Driven', text: 'Every program, class, and session is designed to deliver measurable progress.' },
  { num: '05', title: 'Clean & Modern Facility', text: 'A premium, well-maintained environment that makes training feel elevated.' },
  { num: '06', title: 'Supportive Community', text: 'Surround yourself with members and mentors who push you to be better.' },
]

const WhyChooseUs = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const imageWrapRef = useRef(null)
  const imageRef = useRef(null)
  const cardsRef = useRef(null)

  useLayoutEffect(() => {
    setupGsap()
    const section = sectionRef.current
    if (!section) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const mm = gsap.matchMedia(section)
    const ctx = gsap.context(() => {
      mm.add('(min-width: 0px)', () => {
        gsap.fromTo(
          headingRef.current?.children || [],
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 80%', once: true } },
        )
        gsap.fromTo(
          imageWrapRef.current,
          { autoAlpha: 0, x: -50 },
          { autoAlpha: 1, x: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%', once: true } },
        )
        gsap.fromTo(
          cardsRef.current?.children || [],
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%', once: true } },
        )

        if (imageRef.current) {
          gsap.to(imageRef.current, {
            yPercent: 8,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
          })
        }
      })

      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(imageWrapRef.current, { autoAlpha: 0, y: 30, x: 0 }, { autoAlpha: 1, y: 0, x: 0, duration: 0.8, scrollTrigger: { trigger: section, start: 'top 80%', once: true } })
      })
    }, section)

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="bg-neutral-950 py-20 sm:py-28">
      <div className="container-max section-padding grid items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <div ref={headingRef}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent opacity-0">The IRONFORGE Edge</p>
            <h2 className="font-display text-5xl leading-[0.9] uppercase text-white opacity-0 sm:text-6xl lg:text-7xl">
              WHY IRONFORGE?
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-neutral-400 opacity-0">
              We combine elite coaching, premium facilities, and a relentless focus on outcomes to create a training
              experience that goes beyond ordinary gyms.
            </p>
          </div>
          <div ref={imageWrapRef} className="mt-8 opacity-0">
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <div className="h-[360px] overflow-hidden sm:h-[440px]">
                <img
                  ref={imageRef}
                  src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1400&q=80"
                  alt="Athlete training with premium equipment at IRONFORGE"
                  className="h-[115%] w-full object-cover will-change-transform"
                  loading="lazy"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-accent/10" />
            </div>
          </div>
        </div>

        <div ref={cardsRef} className="grid gap-4 sm:grid-cols-2">
          {reasons.map((reason) => (
            <div key={reason.num} className="glass-card group h-full rounded-2xl p-5 opacity-0 transition duration-300 hover:-translate-y-1 hover:border-accent/40">
              <span className="font-display text-4xl leading-none text-accent/80 transition group-hover:text-accent">
                {reason.num}
              </span>
              <h3 className="mt-3 font-display text-2xl uppercase leading-none text-white">{reason.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-400">{reason.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
