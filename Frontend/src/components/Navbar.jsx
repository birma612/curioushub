import { useState } from 'react'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Membership', href: '#membership' },
    { name: 'Gallery', href: '#gallery' },
  ]

  return (
    <nav className="absolute top-0 z-50 w-full">
     <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <a
            href="#home"
            className="text-2xl font-black tracking-[-0.05em] text-white"
          >
            PULSE<span className="text-[#c8ff00]">FLEX</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="
                  text-[13px] font-medium uppercase tracking-wide
                  text-white/75
                  transition-colors duration-300
                  hover:text-[#c8ff00]
                "
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-8 lg:flex">

            <a
              href="#join"
              className="
                flex items-center gap-2
                text-[13px] font-bold uppercase
                text-[#c8ff00]
                transition-all duration-300
                hover:text-white
              "
            >
              <span className="h-2 w-2 rounded-full bg-[#c8ff00]" />
              Join Now
            </a>

            <a
              href="#contact"
              className="
                flex items-center gap-2
                text-[13px] font-bold uppercase
                text-[#c8ff00]
                transition-all duration-300
                hover:text-white
              "
            >
              <span className="h-2 w-2 rounded-full bg-[#c8ff00]" />
              Contact
            </a>

          </div>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Toggle navigation"
          >
            <span
              className={`h-0.5 w-6 bg-white transition-all ${
                menuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />

            <span
              className={`h-0.5 w-6 bg-white transition-all ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />

            <span
              className={`h-0.5 w-6 bg-white transition-all ${
                menuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-black/90 px-2 py-5 lg:hidden">

            <div className="flex flex-col">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="
                    border-b border-white/10
                    py-4
                    text-sm font-medium uppercase
                    tracking-wide text-white/80
                    hover:text-[#c8ff00]
                  "
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-5 flex gap-6">
              <a
                href="#join"
                className="text-sm font-bold uppercase text-[#c8ff00]"
              >
                ● Join Now
              </a>

              <a
                href="#contact"
                className="text-sm font-bold uppercase text-[#c8ff00]"
              >
                ● Contact
              </a>
            </div>

          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar