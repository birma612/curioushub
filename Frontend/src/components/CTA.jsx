import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setupGsap } from '../animations/gsap'

gsap.registerPlugin(ScrollTrigger)

const CTA = () => {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const panelRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headingRef = useRef(null)
  const textRef = useRef(null)
  const buttonRef = useRef(null)

  useLayoutEffect(() => {
    setupGsap()
    const section = sectionRef.current
    if (!section) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.15 },
          {
            scale: 1.05,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
        defaults: { ease: 'power3.out' },
      })

      tl.fromTo(panelRef.current, { autoAlpha: 0, y: 50, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8 })
        .fromTo(eyebrowRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.4')
        .fromTo(headingRef.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.3')
        .fromTo(textRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.35')
        .fromTo(buttonRef.current, { autoAlpha: 0, y: 20, scale: 0.95 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 }, '-=0.25')
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 sm:py-28">
      <div
        ref={bgRef}
        className="absolute inset-[-10%] bg-cover bg-center will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1800&q=80')",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-accent/20" aria-hidden="true" />

      <div className="container-max section-padding relative z-10">
        <div ref={panelRef} className="glass-strong mx-auto max-w-3xl rounded-3xl p-8 text-center opacity-0 sm:p-12">
          <p ref={eyebrowRef} className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent opacity-0">Join the Movement</p>
          <h2 ref={headingRef} className="font-display text-5xl leading-[0.9] uppercase text-white opacity-0 sm:text-6xl lg:text-7xl">
            READY TO BECOME
            <br />
            STRONGER?
          </h2>
          <p ref={textRef} className="mt-5 text-base text-neutral-300 opacity-0 sm:text-lg">
            Your transformation starts with one decision.
          </p>
          <Link
            ref={buttonRef}
            to="/membership"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white opacity-0 transition hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-[0_14px_34px_rgba(255,45,45,0.35)]"
          >
            Join IRONFORGE
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTA
