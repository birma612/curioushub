import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
  </svg>
)

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6h1.5V3.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H8v3h2.5v8h3z" />
  </svg>
)

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23 12s0-3.2-.4-4.6c-.2-.8-.8-1.4-1.6-1.6C19.6 5.4 12 5.4 12 5.4s-7.6 0-9 .4c-.8.2-1.4.8-1.6 1.6C1 8.8 1 12 1 12s0 3.2.4 4.6c.2.8.8 1.4 1.6 1.6 1.4.4 9 .4 9 .4s7.6 0 9-.4c.8-.2 1.4-.8 1.6-1.6.4-1.4.4-4.6.4-4.6zM10 15.5v-7l6 3.5-6 3.5z" />
  </svg>
)

const links = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Programs', to: '/programs' },
  { name: 'Trainers', to: '/trainers' },
  { name: 'Membership', to: '/membership' },
  { name: 'Contact', to: '/contact' },
]

const socials = [
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: YoutubeIcon, label: 'YouTube' },
  { icon: X, label: 'X' },
]

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/60 backdrop-blur-md">
      <div className="container-max section-padding py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link
              to="/"
              className="font-display text-4xl uppercase tracking-wide text-white"
            >
              IRON<span className="text-accent">FORGE</span>
            </Link>
            <p className="mt-3 font-display text-2xl uppercase tracking-wide text-neutral-300">
              BUILD. TRAIN. TRANSFORM.
            </p>
            <p className="mt-4 max-w-md text-sm leading-7 text-neutral-400">
              Premium fitness and training in a space built for strength, performance, and lasting results.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white">Explore</h3>
            <ul className="mt-4 space-y-3">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-sm text-neutral-400 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white">Connect</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.02] text-neutral-300 transition hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/10 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <div className="mt-6 space-y-2 text-sm text-neutral-400">
              <p>Industrial Area, Baddi, Himachal Pradesh</p>
              <p>info@ironforgegym.com</p>
              <p>+91 XXXXX XXXXX</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-neutral-500 sm:flex-row">
          <p>© 2026 IronForge Fitness. All rights reserved.</p>
          <p className="uppercase tracking-[0.2em] text-neutral-600">Strength. Discipline. Results.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
