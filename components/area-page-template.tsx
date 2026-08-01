import Link from 'next/link'
import { ChevronRight, CheckCircle, Phone, LucideIcon } from 'lucide-react'
import { site } from '@/lib/site'

interface Step {
  number: number
  title: string
  description: string
}

interface FAQ {
  question: string
  answer: string
}

interface AreaPageProps {
  icon: LucideIcon
  eyebrow: string
  title: string
  subtitle: string
  intro: string
  requirements: string[]
  steps: Step[]
  faqs: FAQ[]
}

export default function AreaPageTemplate({
  icon: Icon,
  eyebrow,
  title,
  subtitle,
  intro,
  requirements,
  steps,
  faqs,
}: AreaPageProps) {
  return (
    <>
      {/* HERO */}
      <section className="bg-garnet py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-xs text-cream/50 mb-8">
            <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold">{eyebrow}</span>
          </nav>

          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
              <Icon className="w-7 h-7 text-gold" />
            </div>
            <div>
              <p className="eyebrow text-gold/70">{eyebrow}</p>
              <h1 className="display-lg text-cream text-2xl md:text-4xl mt-2 mb-4 text-balance">{title}</h1>
              <span className="gold-divider mb-5" aria-hidden="true" />
              <p className="text-cream/70 text-base md:text-lg leading-relaxed">{subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gold" aria-hidden="true" />

      {/* CONTENT */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Intro */}
              <div>
                <h2 className="display text-lg text-charcoal mb-4">¿En qué consiste?</h2>
                <span className="gold-divider mb-5 block" />
                <p className="text-warm-gray leading-relaxed">{intro}</p>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="display text-lg text-charcoal mb-4">Requisitos principales</h2>
                <span className="gold-divider mb-5 block" />
                <ul className="space-y-3">
                  {requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-garnet shrink-0 mt-0.5" />
                      <span className="text-warm-gray text-sm leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div>
                <h2 className="display text-lg text-charcoal mb-4">Cómo trabajamos juntas</h2>
                <span className="gold-divider mb-6 block" />
                <ol className="space-y-6">
                  {steps.map((step) => (
                    <li key={step.number} className="flex gap-5">
                      <div className="w-9 h-9 rounded-full bg-garnet flex items-center justify-center text-cream font-serif font-semibold text-sm shrink-0">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="font-sans font-semibold text-charcoal mb-1">{step.title}</h3>
                        <p className="text-warm-gray text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="display text-lg text-charcoal mb-4">Preguntas frecuentes</h2>
                <span className="gold-divider mb-6 block" />
                <div className="space-y-5">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border-l-2 border-gold/40 pl-4">
                      <h3 className="font-sans font-semibold text-charcoal text-sm mb-1.5">{faq.question}</h3>
                      <p className="text-warm-gray text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA card */}
              <div className="bg-garnet rounded-lg p-6 text-cream sticky top-24">
                <h3 className="display text-base text-gold mb-2">¿Necesitas ayuda?</h3>
                <span className="gold-divider mb-4" aria-hidden="true" />
                <p className="text-cream/70 text-sm leading-relaxed mb-5">
                  Cada caso es único. Agenda una consulta y analizamos juntas tu situación
                  sin compromiso, en el despacho de {site.address.city} o por videollamada.
                </p>
                <Link
                  href="/citas"
                  className="block text-center px-4 py-2.5 bg-gold text-charcoal text-sm font-semibold rounded hover:bg-gold-light transition-colors mb-3"
                >
                  Agendar cita
                </Link>
                <a
                  href={`tel:${site.phone.tel}`}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border border-cream/30 text-cream text-sm rounded hover:border-gold hover:text-gold transition-colors mb-3"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {site.phone.display}
                </a>
                <a
                  href={site.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-4 py-2.5 border border-cream/30 text-cream text-sm rounded hover:border-gold hover:text-gold transition-colors"
                >
                  WhatsApp
                </a>
              </div>

              {/* Other areas */}
              <div className="bg-cream-dark border border-border rounded-lg p-6">
                <h3 className="display text-sm text-charcoal mb-4">Otras áreas</h3>
                <ul className="space-y-2">
                  {[
                    ['Arraigo', '/areas/arraigo'],
                    ['Nacionalidad española', '/areas/nacionalidad'],
                    ['Reagrupación familiar', '/areas/reagrupacion-familiar'],
                    ['Renovaciones', '/areas/renovaciones'],
                    ['TIE / NIE', '/areas/tie-nie'],
                    ['Visados', '/areas/visados'],
                  ].map(([label, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="flex items-center gap-1.5 text-sm text-warm-gray hover:text-garnet transition-colors"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
