import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setupGsap } from '../animations/gsap'
import Button from './ui/Button'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 500, suffix: '+', label: 'ACTIVE MEMBERS' },
  { value: 25, suffix: '+', label: 'EXPERT TRAINERS' },
  { value: 10, suffix: '+', label: 'YEARS EXPERIENCE' },
]

const Hero = () => {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const badgeRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const actionsRef = useRef(null)
  const statsRef = useRef(null)
  const statRefs = useRef([])
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)

  useLayoutEffect(() => {
    setupGsap()
    const section = sectionRef.current
    if (!section) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      gsap.set([badgeRef.current, titleRef.current, descRef.current, actionsRef.current, ...(statsRef.current?.children || [])], {
        clearProps: 'all',
        opacity: 1,
        y: 0,
        scale: 1,
      })
      statRefs.current.forEach((el, i) => {
        if (el) el.textContent = `${stats[i].value}${stats[i].suffix}`
      })
      return
    }

    const mm = gsap.matchMedia(section)

    const ctx = gsap.context(() => {
      mm.add('(min-width: 768px)', () => {
        if (bgRef.current) {
          gsap.fromTo(
            bgRef.current,
            { scale: 1.1 },
            { scale: 1.03, duration: 1.8, ease: 'power2.out' },
          )
          gsap.to(bgRef.current, {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        }
      })

      mm.add('(max-width: 767px)', () => {
        if (bgRef.current) {
          gsap.fromTo(bgRef.current, { scale: 1.08 }, { scale: 1.02, duration: 1.4, ease: 'power2.out' })
        }
      })

      mm.add('(min-width: 0px)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.fromTo(badgeRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.7 })
          .fromTo(titleRef.current, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.95 }, '-=0.35')
          .fromTo(descRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.45')
          .fromTo(
            actionsRef.current?.children || [],
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.12 },
            '-=0.35',
          )
          .fromTo(
            statsRef.current?.children || [],
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 },
            '-=0.25',
          )

        if (orb1Ref.current) {
          gsap.to(orb1Ref.current, { y: -18, x: 10, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        }
        if (orb2Ref.current) {
          gsap.to(orb2Ref.current, { y: 16, x: -12, duration: 7.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        }

        statRefs.current.forEach((el, i) => {
          if (!el) return
          const counter = { val: 0 }
          gsap.to(counter, {
            val: stats[i].value,
            duration: 1.6,
            ease: 'power1.out',
            snap: { val: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              once: true,
            },
            onUpdate: () => {
              el.textContent = `${Math.round(counter.val)}${stats[i].suffix}`
            },
          })
        })
      })
    }, section)

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="home" className="relative flex min-h-screen items-center overflow-hidden bg-black">
      <div
        ref={bgRef}
        className="absolute inset-[-8%] bg-cover bg-center will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=80')",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-[#050505]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,45,45,0.22),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.1),transparent_30%)]" aria-hidden="true" />

      <div ref={orb1Ref} className="pointer-events-none absolute -top-10 right-[10%] h-64 w-64 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
      <div ref={orb2Ref} className="pointer-events-none absolute bottom-24 left-[5%] h-80 w-80 rounded-full bg-red-500/10 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 container-max section-padding w-full pt-28 pb-20">
        <div className="max-w-4xl">
          <div ref={badgeRef} className="glass mb-6 inline-flex items-center gap-3 rounded-full px-4 py-2 opacity-0">
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(255,45,45,0.8)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-200">
              Premium Fitness & Training
            </span>
          </div>

          <h1 ref={titleRef} className="font-display text-6xl leading-[0.85] uppercase text-white opacity-0 sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            BUILD YOUR
            <br />
            <span className="text-gradient">STRONGEST SELF.</span>
          </h1>

          <p ref={descRef} className="mt-6 max-w-2xl text-base leading-7 text-neutral-300 opacity-0 sm:text-lg">
            Train harder. Move stronger. Become unstoppable.
          </p>

          <div ref={actionsRef} className="mt-10 flex flex-wrap items-center gap-4">
            <Button as={Link} to="/membership" variant="primary" className="opacity-0">
              Start Your Journey
            </Button>
            <Button as={Link} to="/programs" variant="secondary" className="opacity-0">
              Explore Programs
            </Button>
          </div>

          <div ref={statsRef} className="mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <div key={stat.label} className="glass-card rounded-2xl px-5 py-4 opacity-0">
                <p className="font-display text-4xl leading-none text-white sm:text-5xl">
                  <span ref={(el) => { statRefs.current[i] = el }}>0{stat.suffix}</span>
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link
        to="/about"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-neutral-400 transition hover:text-white md:flex"
        aria-label="Go to about page"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/20">
          <span className="animate-scroll-line absolute top-0 left-0 h-1/2 w-full bg-accent" />
        </span>
        <ArrowDown size={14} className="text-accent" />
      </Link>
    </section>
  )
}

export default Hero
