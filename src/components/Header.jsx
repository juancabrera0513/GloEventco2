// src/components/Header.jsx
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import GlowButton from './GlowButton'
import { PHONE, BOOK_SELFIE, BOOK_SILENT, LOGO_TEXT } from '../lib/constants'

const logoSrc = '/images/logo.png'

export default function Header() {
  const [open, setOpen] = useState(false)

  const nav = (
    <nav className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `glo-hover px-2 py-1 rounded hover:underline underline-offset-4 ${isActive ? 'text-white' : 'text-gray-300'}`
        }
      >
        Home
      </NavLink>
      <NavLink to="/services"  className="text-gray-300 hover:underline underline-offset-4 glo-hover px-2 py-1 rounded">Services</NavLink>
      <NavLink to="/portfolio" className="text-gray-300 hover:underline underline-offset-4 glo-hover px-2 py-1 rounded">Portfolio</NavLink>
      <NavLink to="/faq"       className="text-gray-300 hover:underline underline-offset-4 glo-hover px-2 py-1 rounded">FAQ</NavLink>
      <NavLink to="/contact"   className="text-gray-300 hover:underline underline-offset-4 glo-hover px-2 py-1 rounded">Contact</NavLink>
      <div className="flex gap-2 pt-2 lg:pt-0">
        <GlowButton href={BOOK_SELFIE} external appearance="glass">Selfie Station</GlowButton>
        <GlowButton href={BOOK_SILENT} external variant="pink">Silent Disco</GlowButton>
      </div>
    </nav>
  )

  return (
    <header className="sticky top-0 z-50 bg-[color:var(--color-base-bg)]/70 backdrop-blur glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative h-9 w-9 rounded-md flex items-center justify-center neon-border glo-on">
            <img
              src={logoSrc}
              alt="Glo Event Co logo"
              className="h-6 w-auto glo-drop"
              fetchPriority="high"
            />
          </div>
          <span className="font-display text-xl tracking-widest neon-text-cyan drop-shadow-[var(--shadow-glow)]">
            {LOGO_TEXT}
          </span>
        </Link>

        <button
          className="lg:hidden p-2 rounded neon-border glo-hover"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        <div className="hidden lg:block">{nav}</div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/5 px-4 pb-4">
          {nav}
          <a href={`tel:${PHONE}`} className="mt-3 inline-block text-sm text-gray-300 glo-hover px-2 py-1 rounded">
            Call {PHONE}
          </a>
        </div>
      )}
    </header>
  )
}
