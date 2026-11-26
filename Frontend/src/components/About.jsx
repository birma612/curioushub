import { useLayoutEffect, useRef } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setupGsap } from '../animations/gsap'

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  'Professional equipment',
  'Experienced trainers',
  'Personalized training',
  'Supportive community',
  'Modern facilities',
  'Results-focused programs',
]

const About = () => {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headingRef = useRef(null)
  const textRef = useRef(null)
  const listRef = useRef(null)
  const ctaRef = useRef(null)
  const imageWrapRef = useRef(null)
  const imageRef = useRef(null)
  const statCardRef = useRef(null)

  useLayoutEffect(() => {
    setupGsap()
    const section = sectionRef.current
    if (!section) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const mm = gsap.matchMedia(section)
    const ctx = gsap.context(() => {
      mm.add('(min-width: 0px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
          defaults: { ease: 'power3.out' },
        })
        tl.fromTo(eyebrowRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6 })
          .fromTo(headingRef.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.35')
          .fromTo(textRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.4')
          .fromTo(
            listRef.current?.children || [],
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06 },
            '-=0.25',
          )
          .fromTo(ctaRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.45 }, '-=0.2')
          .fromTo(imageWrapRef.current, { autoAlpha: 0, x: -60 }, { autoAlpha: 1, x: 0, duration: 0.9 }, 0.1)
          .fromTo(
            statCardRef.current,
            { autoAlpha: 0, scale: 0.85, y: 20 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.7 },
            '-=0.5',
          )

        if (imageRef.current) {
          gsap.to(imageRef.current, {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
          })
        }
      })

      mm.add('(max-width: 767px)', () => {
        // gentler image slide on mobile
        gsap.fromTo(imageWrapRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: section, start: 'top 80%', once: true } })
      })
    }, section)

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden bg-[#070707] py-20 sm:py-28">
      <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
      <div className="container-max section-padding grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div ref={imageWrapRef} className="relative opacity-0">
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <div className="h-[420px] overflow-hidden sm:h-[520px]">
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1400&q=80"
                alt="Modern IRONFORGE gym interior with premium training equipment"
                className="h-[115%] w-full object-cover will-change-transform"
                loading="lazy"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          </div>
          <div ref={statCardRef} className="glass-strong absolute -bottom-6 -right-2 rounded-2xl p-5 opacity-0 sm:-right-6 sm:p-6">
            <p className="font-display text-5xl leading-none text-white">10+</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-accent">Years of Excellence</p>
            <p className="mt-2 max-w-[180px] text-xs text-neutral-400">Building stronger bodies and sharper mindsets since day one.</p>
          </div>
        </div>

        <div>
          <p ref={eyebrowRef} className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent opacity-0">About IRONFORGE</p>
          <h2 ref={headingRef} className="font-display text-5xl leading-[0.9] uppercase text-white opacity-0 sm:text-6xl lg:text-7xl">
            MORE THAN A GYM.
            <br />
            <span className="text-neutral-300">A COMMUNITY.</span>
          </h2>
          <p ref={textRef} className="mt-6 max-w-xl text-base leading-7 text-neutral-400 opacity-0">
            IRONFORGE is built for people who want more from their training. From professional-grade equipment and
            modern facilities to experienced coaches and personalized programs, every detail is designed to help you
            perform, progress, and belong to a community that pushes you forward.
          </p>

          <div ref={listRef} className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item} className="glass flex items-start gap-3 rounded-xl p-3 opacity-0">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm text-neutral-300">{item}</span>
              </div>
            ))}
          </div>

          <button
            ref={ctaRef}
            type="button"
            onClick={() => scrollTo('programs')}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white opacity-0 transition hover:border-accent/50 hover:bg-accent/10"
          >
            Learn More
            <ArrowRight size={16} className="text-accent" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default About
