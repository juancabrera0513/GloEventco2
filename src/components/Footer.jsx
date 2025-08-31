// src/components/Footer.jsx
import { ADDRESS_HTML, EMAIL, PHONE } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-base-bg">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-display text-lg neon-text-cyan">Glo Event Co</h3>
          <p className="text-sm text-gray-400 mt-2">
            Silent disco & modern photo booth rentals in St. Louis & nearby areas.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-200">Contact</h4>
          <div
            className="text-sm text-gray-400 mt-2"
            dangerouslySetInnerHTML={{ __html: ADDRESS_HTML }}
          />
          <p className="text-sm mt-2">
            <a className="hover:underline glo-hover-soft px-1 rounded" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </p>
          <p className="text-sm">
            <a className="hover:underline glo-hover-soft px-1 rounded" href={`tel:${PHONE}`}>
              {PHONE}
            </a>
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-200">Book</h4>
          <ul className="mt-2 text-sm text-gray-400 space-y-1">
            <li>
              <a
                className="hover:underline glo-hover-soft px-1 rounded"
                href="https://glo-event-co.checkcherry.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Availability & Booking
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t border-white/5">
        © {new Date().getFullYear()} Glo Event Co
        <span className="mx-2">•</span>
        Site by{' '}
        <a
          href="https://domiwebsites.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 glo-hover-soft px-1 rounded"
        >
          Domi Websites
        </a>
      </div>
    </footer>
  )
}
