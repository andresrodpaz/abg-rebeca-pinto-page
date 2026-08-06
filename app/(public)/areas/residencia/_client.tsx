'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, CheckCircle, Phone, ChevronDown, Home } from 'lucide-react'
import { site } from '@/lib/site'

function FAQ({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-2 mt-6">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="border rounded-lg overflow-hidden"
          style={{ borderColor: 'oklch(0.638 0.112 68 / 0.25)' }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors duration-200"
            style={{ background: open === i ? 'oklch(0.46 0.066 6 / 0.05)' : 'white' }}
            aria-expanded={open === i}
          >
            <span className="font-sans font-semibold text-sm" style={{ color: 'oklch(0.22 0.005 0)' }}>
              {faq.question}
            </span>
            <ChevronDown
              className="w-4 h-4 shrink-0 transition-transform duration-200"
              style={{
                color: 'oklch(0.46 0.066 6)',
                transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-4 pt-1" style={{ background: 'oklch(0.46 0.066 6 / 0.03)' }}>
              <p className="text-sm font-sans leading-relaxed" style={{ color: 'oklch(0.50 0.010 50)' }}>
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const RESIDENCIA_TEMPORAL_SUBTIPOS = [
  {
    title: 'Sin autorización de trabajo (No lucrativa)',
    desc: 'Para quienes residen en España sin ejercer actividad laboral, acreditando medios económicos propios suficientes (mínimo 400% del IPREM anual, ~31.200 €/año).',
  },
  {
    title: 'Por cuenta ajena',
    desc: 'Vinculada a un contrato de trabajo con empleador español. El primer año está limitado al empleador, sector y provincia; a partir del segundo año, sin restricciones.',
  },
  {
    title: 'Por cuenta propia (autónomo)',
    desc: 'Para trabajadores autónomos o emprendedores. El primer año, limitada a la comunidad autónoma y sector; desde la primera renovación, sin restricciones.',
  },
  {
    title: 'Por circunstancias excepcionales (arraigo)',
    desc: 'Incluye las 5 modalidades de arraigo (social, sociolaboral, familiar, socioformativo y de segunda oportunidad). Permite trabajar desde el primer día.',
  },
  {
    title: 'Por reagrupación familiar',
    desc: 'Concedida a familiares de un residente legal en España: cónyuge/pareja, hijos dependientes y, en determinadas condiciones, ascendientes a cargo.',
  },
  {
    title: 'De estudiante',
    desc: 'Para quienes cursan estudios oficiales o reglados en España. Habilita a trabajar hasta 30 horas semanales si es compatible con el horario lectivo.',
  },
]

export default function ResidenciaClientPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ background: 'oklch(0.46 0.066 6)' }} className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-xs mb-8" style={{ color: 'oklch(0.936 0.022 71 / 0.5)' }}>
            <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: 'oklch(0.638 0.112 68)' }}>Áreas de práctica</span>
          </nav>
          <div className="flex items-start gap-5">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'oklch(0.638 0.112 68 / 0.18)' }}
            >
              <Home className="w-7 h-7" style={{ color: 'oklch(0.638 0.112 68)' }} />
            </div>
            <div>
              <p className="eyebrow mb-2" style={{ color: 'oklch(0.638 0.112 68 / 0.75)' }}>Áreas de práctica</p>
              <h1 className="display-lg text-2xl md:text-4xl mt-1 mb-4 text-balance" style={{ color: 'oklch(0.936 0.022 71)' }}>
                Tipos de Residencia
              </h1>
              <span className="gold-divider mb-5" aria-hidden="true" />
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'oklch(0.936 0.022 71 / 0.70)' }}>
                En España existen dos grandes categorías de autorización de residencia: la{' '}
                <strong style={{ color: 'oklch(0.936 0.022 71)' }}>residencia temporal</strong> (de 90 días a 5 años, con múltiples subtipos) y la{' '}
                <strong style={{ color: 'oklch(0.936 0.022 71)' }}>residencia de larga duración</strong> (indefinida, tras 5 años de residencia legal continuada).
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px" style={{ background: 'oklch(0.638 0.112 68)' }} aria-hidden="true" />

      {/* CONTENT */}
      <section className="py-14 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Main */}
            <div className="lg:col-span-2 space-y-14">

              {/* ── Residencia Temporal ── */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="display text-xl text-charcoal">Residencia Temporal</h2>
                  <span
                    className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ background: 'oklch(0.638 0.112 68 / 0.14)', color: 'oklch(0.46 0.005 68)' }}
                  >
                    Hasta 5 años
                  </span>
                </div>
                <span className="gold-divider mb-5 block" />
                <p className="text-warm-gray leading-relaxed mb-8">
                  La residencia temporal autoriza a residir en España por un período superior a 90 días e inferior a 5 años.
                  Se concede inicialmente por períodos de 1 o 2 años y puede renovarse sucesivamente. Existen varios subtipos
                  en función del motivo de la residencia.
                </p>

                <h3 className="display text-base text-charcoal mb-4">Subtipos de residencia temporal</h3>
                <span className="gold-divider mb-6 block" />
                <div className="space-y-4">
                  {RESIDENCIA_TEMPORAL_SUBTIPOS.map((subtipo, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-5 border"
                      style={{ borderColor: 'oklch(0.638 0.112 68 / 0.22)', background: 'white' }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-serif font-semibold text-xs"
                          style={{ background: 'oklch(0.46 0.066 6)', color: 'oklch(0.936 0.022 71)' }}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <h4 className="font-sans font-semibold text-sm text-charcoal mb-1.5">{subtipo.title}</h4>
                          <p className="text-warm-gray text-sm leading-relaxed">{subtipo.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="display text-base text-charcoal mb-4">Características comunes</h3>
                  <span className="gold-divider mb-5 block" />
                  <ul className="space-y-3">
                    {[
                      'Duración inicial entre 1 y 2 años (según el tipo), renovable',
                      'Exige mantener activos los motivos que dieron lugar a la concesión',
                      'Se acredita mediante la Tarjeta de Identidad de Extranjero (TIE)',
                      'La TIE debe renovarse antes de su vencimiento para mantener la continuidad de la residencia legal',
                      'Ausencias superiores a 6 meses consecutivos pueden interrumpir la continuidad para la larga duración',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'oklch(0.46 0.066 6)' }} />
                        <span className="text-warm-gray text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ── Residencia de Larga Duración ── */}
              <div className="pt-4 border-t" style={{ borderColor: 'oklch(0.638 0.112 68 / 0.25)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="display text-xl text-charcoal">Residencia de Larga Duración</h2>
                  <span
                    className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ background: 'oklch(0.46 0.066 6 / 0.12)', color: 'oklch(0.36 0.058 6)' }}
                  >
                    Indefinida
                  </span>
                </div>
                <span className="gold-divider mb-5 block" />
                <p className="text-warm-gray leading-relaxed mb-8">
                  La residencia de larga duración se concede tras <strong>5 años de residencia legal continuada en España</strong>.
                  Es la autorización más estable: no tiene límite temporal y otorga condiciones prácticamente idénticas a las de
                  un ciudadano español para trabajar, vivir y acceder a servicios públicos.
                </p>

                <h3 className="display text-base text-charcoal mb-4">Requisitos para solicitarla</h3>
                <span className="gold-divider mb-5 block" />
                <ul className="space-y-3 mb-8">
                  {[
                    '5 años de residencia legal continuada en España (sin interrupciones significativas)',
                    'Carencia de antecedentes penales en España durante el último período',
                    'Medios económicos suficientes (generalmente equivalentes al 100% del IPREM mensual)',
                    'No encontrarse en situación de prohibición de entrada ni de expulsión en tramitación',
                  ].map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'oklch(0.46 0.066 6)' }} />
                      <span className="text-warm-gray text-sm leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className="rounded-xl px-5 py-5 mb-2"
                  style={{
                    background: 'linear-gradient(135deg, oklch(0.46 0.066 6 / 0.06), oklch(0.638 0.112 68 / 0.04))',
                    border: '1px solid oklch(0.46 0.066 6 / 0.18)',
                  }}
                >
                  <h4 className="font-sans font-semibold text-sm text-charcoal mb-4">Ventajas de la larga duración</h4>
                  <ul className="space-y-2.5">
                    {[
                      'Autorización indefinida: no caduca ni requiere renovaciones anuales',
                      'Mismas condiciones que un ciudadano español para trabajar y residir',
                      'Acceso a servicios públicos en igualdad de condiciones',
                      'Base sólida para solicitar la nacionalidad española (10 años en general, menos en casos específicos)',
                      'Movilidad ampliada dentro del espacio Schengen',
                    ].map((v, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'oklch(0.46 0.066 6)' }} />
                        <span className="text-sm font-sans leading-relaxed" style={{ color: 'oklch(0.30 0.005 0)' }}>{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQ */}
              <div className="pt-4 border-t" style={{ borderColor: 'oklch(0.638 0.112 68 / 0.25)' }}>
                <h3 className="display text-base text-charcoal mb-4">Preguntas frecuentes sobre residencia</h3>
                <span className="gold-divider mb-2 block" />
                <FAQ faqs={[
                  {
                    question: '¿Cuándo empieza a contar el tiempo para la larga duración?',
                    answer: 'Desde que obtienes la primera autorización de residencia legal en España. Los años como estudiante también cuentan si tu autorización es de residencia (no solo visado de corta duración).',
                  },
                  {
                    question: '¿Puedo perder la residencia de larga duración si me voy de España?',
                    answer: 'Sí. Superar 12 meses consecutivos fuera de la Unión Europea puede hacer perder la residencia de larga duración. Si la ausencia es dentro de la UE, el plazo se amplía a 6 años. Existen excepciones por motivos laborales o personales graves.',
                  },
                  {
                    question: '¿La tarjeta de residencia de larga duración tiene que renovarse?',
                    answer: 'La autorización es indefinida, pero la tarjeta TIE física tiene validez de 5 años y debe renovarse por un trámite administrativo sin que eso afecte a la continuidad de la autorización. Es solo una renovación del documento, no de la autorización.',
                  },
                  {
                    question: '¿Qué tipo de residencia necesito para solicitar la nacionalidad?',
                    answer: 'Puedes solicitar la nacionalidad desde cualquier tipo de residencia legal, siempre que cumplas el período de residencia requerido (10 años en general, 2 años para iberoamericanos y sefardíes, 1 año en casos especiales como matrimonio con español/a). No es necesario tener larga duración.',
                  },
                  {
                    question: '¿Puedo trabajar con cualquier tipo de residencia temporal?',
                    answer: 'Depende del subtipo. La residencia no lucrativa no permite trabajar. El arraigo, la residencia por trabajo y la de nómada digital sí habilitan para trabajar desde el primer día. La residencia de estudiante permite hasta 30 horas semanales. Cada tipo tiene sus condiciones específicas.',
                  },
                  {
                    question: '¿La residencia de larga duración me permite trabajar en toda España?',
                    answer: 'Sí. La residencia de larga duración no está vinculada a ninguna comunidad autónoma, provincia ni sector económico. Puedes vivir, trabajar y cambiar de domicilio libremente por todo el territorio español.',
                  },
                  {
                    question: '¿Qué ocurre si supero los 12 meses fuera de la UE con larga duración?',
                    answer: 'Si superas 12 meses consecutivos fuera de la Unión Europea, puedes perder la residencia de larga duración. Aunque la autorización es indefinida, la tarjeta física debe renovarse cada 5 años. Ambas cuestiones son independientes: no renovar la tarjeta no extingue la autorización, pero superar el período de ausencia permitido sí puede hacerlo.',
                  },
                ]} />
              </div>

              {/* Nota normativa */}
              <div
                className="rounded-xl px-5 py-4 flex gap-3 mt-2"
                style={{
                  background: 'oklch(0.638 0.112 68 / 0.07)',
                  border: '1px solid oklch(0.638 0.112 68 / 0.22)',
                }}
              >
                <span className="text-base shrink-0 mt-0.5" aria-hidden="true">📋</span>
                <div>
                  <p className="text-xs font-sans font-semibold uppercase tracking-wider mb-1" style={{ color: 'oklch(0.46 0.005 68)', letterSpacing: '0.10em' }}>
                    Nota sobre normativa
                  </p>
                  <p className="text-xs font-sans leading-relaxed" style={{ color: 'oklch(0.50 0.010 50)' }}>
                    La información de esta página refleja la normativa vigente en 2026 conforme al{' '}
                    <strong style={{ color: 'oklch(0.30 0.005 0)' }}>Real Decreto 1155/2024</strong> (Reglamento de Extranjería). Las cifras de{' '}
                    <strong style={{ color: 'oklch(0.30 0.005 0)' }}>IPREM y SMI</strong> se actualizan cada año mediante Ley de Presupuestos o norma equivalente —
                    Rebeca Pinto Camacho revisa y actualiza este contenido periódicamente.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="rounded-lg p-6 text-cream sticky top-24" style={{ background: 'oklch(0.46 0.066 6)' }}>
                <h3 className="display text-base mb-2" style={{ color: 'oklch(0.638 0.112 68)' }}>¿Necesitas ayuda?</h3>
                <span className="gold-divider mb-4" aria-hidden="true" />
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'oklch(0.936 0.022 71 / 0.70)' }}>
                  Cada caso es único. Agenda una consulta y analizamos juntas tu situación sin compromiso, en el despacho de {site.address.city} o por videollamada.
                </p>
                <Link
                  href="/citas"
                  className="block text-center px-4 py-2.5 text-sm font-semibold rounded transition-colors mb-3"
                  style={{ background: 'oklch(0.638 0.112 68)', color: 'oklch(0.22 0.005 0)' }}
                >
                  Agendar cita · 50 €
                </Link>
                <a
                  href={`tel:${site.phone.tel}`}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border text-sm rounded transition-colors mb-3"
                  style={{ borderColor: 'oklch(0.936 0.022 71 / 0.30)', color: 'oklch(0.936 0.022 71)' }}
                >
                  <Phone className="w-3.5 h-3.5" />
                  {site.phone.display}
                </a>
                <a
                  href={site.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-4 py-2.5 border text-sm rounded transition-colors"
                  style={{ borderColor: 'oklch(0.936 0.022 71 / 0.30)', color: 'oklch(0.936 0.022 71)' }}
                >
                  WhatsApp
                </a>
              </div>

              <div className="bg-cream-dark border border-border rounded-lg p-6">
                <h3 className="display text-sm text-charcoal mb-4">Comparativa rápida</h3>
                <div className="space-y-3 text-xs font-sans">
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-semibold text-charcoal">Temporal</span>
                    <span className="text-warm-gray text-right">90 días – 5 años · renovable</span>
                  </div>
                  <div className="h-px" style={{ background: 'oklch(0.638 0.112 68 / 0.20)' }} />
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-semibold text-charcoal">Larga Duración</span>
                    <span className="text-warm-gray text-right">Indefinida · tras 5 años</span>
                  </div>
                </div>
              </div>

              <div className="bg-cream-dark border border-border rounded-lg p-6">
                <h3 className="display text-sm text-charcoal mb-4">Otras áreas</h3>
                <ul className="space-y-2">
                  {[
                    ['Arraigo', '/areas/arraigo'],
                    ['Visados', '/areas/visados'],
                    ['Nacionalidad española', '/areas/nacionalidad'],
                    ['Reagrupación familiar', '/areas/reagrupacion-familiar'],
                    ['Renovaciones', '/areas/renovaciones'],
                    ['TIE / NIE', '/areas/tie-nie'],
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
