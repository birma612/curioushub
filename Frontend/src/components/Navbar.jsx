import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { setupGsap } from '../animations/gsap'

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Programs', to: '/programs' },
  { name: 'Trainers', to: '/trainers' },
  { name: 'Membership', to: '/membership' },
  { name: 'Gallery', to: '/gallery' },
  { name: 'Contact', to: '/contact' },
]

const Navbar = () => {
  const headerRef = useRef(null)
  const navInnerRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const mobileLinksRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useLayoutEffect(() => {
    setupGsap()
    const header = headerRef.current
    if (!header) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      gsap.set(header, { clearProps: 'all', opacity: 1, y: 0 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(header, { y: -40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 })
    }, header)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      const delta = y - lastY
      if (Math.abs(delta) > 8) {
        if (y > 120 && delta > 0 && !open) setHidden(true)
        else setHidden(false)
        lastY = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  useEffect(() => {
    const menu = mobileMenuRef.current
    if (!menu) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const links = mobileLinksRef.current ? Array.from(mobileLinksRef.current.children) : []

    if (open) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      if (!reduceMotion) {
        gsap.fromTo(menu, { xPercent: 100 }, { xPercent: 0, duration: 0.45, ease: 'power3.out', overwrite: true })
        if (links.length) {
          gsap.fromTo(links, { autoAlpha: 0, x: 20 }, { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.05, delay: 0.1, ease: 'power2.out', overwrite: true })
        }
      }
      return () => {
        document.body.style.overflow = original
      }
    }

    if (!reduceMotion) {
      gsap.to(menu, { xPercent: 100, duration: 0.35, ease: 'power3.inOut', overwrite: true })
    }
  }, [open])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return
    gsap.to(header, {
      y: hidden ? -100 : 0,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [hidden])

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 z-50 w-full transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled || open
            ? 'glass-strong border-b border-white/10 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <nav ref={navInnerRef} className="container-max section-padding flex h-20 items-center justify-between">
          <Link
            to="/"
            className="font-display text-3xl tracking-wide text-white"
            aria-label="IRONFORGE home"
          >
            IRON<span className="text-accent">FORGE</span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative text-sm font-medium uppercase tracking-wide transition-colors ${
                    isActive ? 'text-white' : 'text-neutral-300 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      className={`absolute -bottom-2 left-0 h-0.5 bg-accent transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link
              to="/membership"
              className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent-dark hover:shadow-[0_0_24px_rgba(255,45,45,0.35)]"
            >
              Join Now
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/30 hover:bg-white/5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <aside
        ref={mobileMenuRef}
        id="mobile-menu"
        className="glass-strong fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm translate-x-full border-l border-white/10 lg:hidden"
        aria-hidden={!open}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <span className="font-display text-2xl tracking-wide text-white">
            IRON<span className="text-accent">FORGE</span>
          </span>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex h-[calc(100%-5rem)] flex-col justify-between px-6 py-8">
          <div ref={mobileLinksRef} className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-medium uppercase tracking-wide transition-all ${
                    isActive ? 'bg-white/5 text-white' : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          <Link
            to="/membership"
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent-dark"
          >
            Join Now
          </Link>
        </div>
      </aside>
    </>
  )
}

export default Navbar
