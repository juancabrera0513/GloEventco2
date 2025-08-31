import NeonHeading from '../components/NeonHeading'
import { EMAIL, PHONE, ADDRESS_HTML } from '../lib/constants'

export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <title>Contact | Glo Event Co</title>
      <meta name="description" content="Reach out for availability and quotes. St. Louis & surrounding areas." />

      <NeonHeading kicker="CONTACT" title="You + Us = Awesome" subtitle="Reach out for availability and quotes." />
      <div className="grid md:grid-cols-2 gap-8 mt-10">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display text-xl neon-text-cyan">Contact Info</h3>
          <div className="text-sm text-gray-300 mt-3" dangerouslySetInnerHTML={{ __html: ADDRESS_HTML }} />
          <p className="mt-2">
            <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
          <p>
            <a className="underline" href={`tel:${PHONE}`}>{PHONE}</a>
          </p>
          <p className="text-xs text-gray-500 mt-4">Office Hours: 11am – 7pm</p>
        </div>

        {/* Conecta este form a EmailJS/Formspree o a tu backend */}
        <form className="glass rounded-2xl p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-sm">Name</label>
            <input className="mt-1 w-full rounded-md bg-white/5 border-white/10" required />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input type="email" className="mt-1 w-full rounded-md bg-white/5 border-white/10" required />
          </div>
          <div>
            <label className="text-sm">Message</label>
            <textarea rows="4" className="mt-1 w-full rounded-md bg-white/5 border-white/10" required />
          </div>
          <button className="rounded-xl px-4 py-2 bg-gradient-to-br from-[var(--color-neon-cyan)] to-[var(--color-neon-mint)] text-black font-semibold shadow-[var(--shadow-glow)]">
            Send
          </button>
          <p className="text-xs text-gray-500">Hook up EmailJS, Formspree, or your backend here.</p>
        </form>
      </div>
    </div>
  )
}
