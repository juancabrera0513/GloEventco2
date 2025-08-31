import NeonHeading from '../components/NeonHeading'

export default function FAQ() {
  const faqs = [
    { q: 'Do you travel outside St. Louis?', a: 'Yes—contact us for travel details and minimums.' },
    { q: 'Can we customize overlays?', a: 'Absolutely. We can match the event theme/brand.' },
    { q: 'Is setup included?', a: 'Yes. We handle setup/teardown and provide an attendant when needed.' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <title>FAQ | Glo Event Co</title>
      <meta name="description" content="Common questions about Silent Disco & Photo Booth rentals." />

      <NeonHeading kicker="FAQ" title="Quick Answers" />
      <dl className="mt-10 space-y-4">
        {faqs.map((f) => (
          <div key={f.q} className="glass rounded-2xl p-6">
            <dt className="font-semibold">{f.q}</dt>
            <dd className="text-gray-300 mt-2">{f.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
