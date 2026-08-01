import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { UserCheck, Scale, Award, Heart, Phone, MapPin } from 'lucide-react'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Sobre mí | Rebeca Pinto Camacho — Abogada de Extranjería',
  description:
    'Rebeca Pinto Camacho, abogada con trayectoria internacional. Graduada en Derecho en Venezuela y España (UNIR), Máster de Acceso a la Abogacía y colegiada en el Ilustre Colegio de Abogados de Alcalá de Henares. Especializada en extranjería, residencia y nacionalidad.',
}

const values = [
  {
    icon: UserCheck,
    title: 'Atención directa',
    body: 'Soy yo quien estudia tu caso, prepara tu expediente y te acompaña. Sin despachos masivos, sin delegar en becarios.',
  },
  {
    icon: Scale,
    title: 'Especialización exclusiva',
    body: 'Me dedico principalmente al derecho de extranjería. Conozco cada trámite, cada cambio normativo y cada oficina en profundidad.',
  },
  {
    icon: Award,
    title: 'Compromiso con el resultado',
    body: 'No presento expedientes a medias. Reviso cada documento hasta estar segura de que el expediente es sólido y completo.',
  },
  {
    icon: Heart,
    title: 'Cercanía y empatía',
    body: 'He vivido en primera persona un proceso migratorio. Sé lo que significa y mi trabajo es que te sientas acompañada y tranquila en todo momento.',
  },
]

/** Hitos de formación y ejercicio profesional */
const trayectoria = [
  {
    period: 'Venezuela',
    title: 'Graduada en Derecho',
    detail:
      'Universidad Arturo Michelena. Inscrita en el Instituto de Previsión Social del Abogado (INPREABOGADO) y colegiada en el Ilustre Colegio de Abogados del estado Yaracuy.',
  },
  {
    period: 'Hasta 2016',
    title: 'Defensora Pública en materia penal',
    detail:
      'Ejercicio de la defensa pública penal en el estado Carabobo (Venezuela), asistiendo a personas sin recursos en procedimientos penales.',
  },
  {
    period: '2017',
    title: 'Traslado a España',
    detail:
      'Emigra a España para continuar su desarrollo profesional y homologar su carrera dentro del ordenamiento jurídico español.',
  },
  {
    period: 'España',
    title: 'Graduada en Derecho — UNIR',
    detail:
      'Grado en Derecho por la Universidad Internacional de La Rioja, seguido del Máster de Acceso a la Abogacía y Procura en la misma universidad.',
  },
  {
    period: 'Noviembre 2025',
    title: 'Prueba de acceso a la abogacía superada',
    detail:
      'Supera el examen estatal de acceso a la profesión de abogado y se colegia en el Ilustre Colegio de Abogados de Alcalá de Henares.',
  },
  {
    period: 'Actualmente',
    title: 'Fundadora de su propio despacho',
    detail:
      'Dirige su despacho en Alcalá de Henares, dedicado principalmente al Derecho de Extranjería, con atención presencial y online en toda España.',
  },
]

export default function SobreMiPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-garnet py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-gold/70">Conóceme</p>
          <h1 className="display-lg text-cream text-3xl md:text-4xl mt-3 mb-5 text-balance">
            Sobre mí
          </h1>
          <span className="gold-divider mb-6" aria-hidden="true" />
          <p className="text-cream/70 text-base md:text-lg leading-relaxed max-w-2xl">
            Soy Rebeca Pinto Camacho, abogada con trayectoria internacional. Conozco el
            proceso migratorio desde dentro, porque yo también lo he recorrido. Hoy
            acompaño a personas y familias en sus trámites de extranjería con honestidad,
            proximidad y rigor.
          </p>
        </div>
      </section>

      <div className="h-px bg-gold" aria-hidden="true" />

      {/* CONTENIDO PRINCIPAL */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

            {/* Retrato */}
            <div className="md:col-span-1">
              <div className="relative">
                <span
                  className="absolute -inset-2.5 border border-gold/40 rounded-lg"
                  aria-hidden="true"
                />
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-cream-dark">
                  <Image
                    src="/about-me.jpeg"
                    alt="Rebeca Pinto Camacho frente a la Universidad de Alcalá de Henares"
                    fill
                    sizes="(max-width: 768px) 90vw, 280px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Contacto rápido */}
              <div className="mt-9 bg-garnet rounded-lg p-6 text-cream">
                <p className="display text-sm text-gold mb-1">¿Hablamos?</p>
                <span className="gold-divider mb-4" aria-hidden="true" />

                <ul className="space-y-3 text-xs text-cream/70 mb-5">
                  <li className="flex items-start gap-2.5">
                    <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                    <span>
                      {site.address.street}
                      <br />
                      {site.address.postalCode} {site.address.city}
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                    <a href={`tel:${site.phone.tel}`} className="hover:text-gold transition-colors">
                      {site.phone.display}
                    </a>
                  </li>
                </ul>

                <Link
                  href="/citas"
                  className="block text-center px-4 py-2.5 bg-gold text-charcoal text-sm font-semibold rounded hover:bg-gold-light transition-colors mb-2"
                >
                  Agendar cita
                </Link>
                <a
                  href={site.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-4 py-2.5 border border-cream/30 text-cream text-sm rounded hover:border-gold hover:text-gold transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Biografía */}
            <div className="md:col-span-2">
              <h2 className="display text-xl md:text-2xl text-charcoal mb-2">
                {site.name}
              </h2>
              <p className="eyebrow text-gold">{site.specialties.join(' · ')}</p>
              <span className="gold-divider mt-5 mb-7" aria-hidden="true" />

              <div className="space-y-5 text-warm-gray leading-relaxed text-sm">
                <p>
                  Mi carrera comenzó en Venezuela, donde me gradué en Derecho por la{' '}
                  <strong className="text-charcoal font-semibold">
                    Universidad Arturo Michelena
                  </strong>
                  . Allí ejercí como <strong className="text-charcoal font-semibold">
                  Defensora Pública en materia penal</strong> en el estado Carabobo hasta
                  2016, inscrita en el Instituto de Previsión Social del Abogado y
                  colegiada en el Ilustre Colegio de Abogados del estado Yaracuy. Fueron
                  años de sala, de expedientes urgentes y de defender a personas que no
                  tenían a nadie más: la mejor escuela posible para entender que detrás de
                  cada procedimiento hay una vida.
                </p>
                <p>
                  En <strong className="text-charcoal font-semibold">2017 emigré a
                  España</strong> para continuar mi desarrollo profesional. Reconstruir una
                  carrera desde cero en otro país significó volver a estudiar: me gradué en
                  Derecho por la{' '}
                  <strong className="text-charcoal font-semibold">
                    Universidad Internacional de La Rioja (UNIR)
                  </strong>{' '}
                  y cursé el{' '}
                  <strong className="text-charcoal font-semibold">
                    Máster de Acceso a la Abogacía y Procura
                  </strong>{' '}
                  en la misma universidad.
                </p>
                <p>
                  En{' '}
                  <strong className="text-charcoal font-semibold">noviembre de 2025</strong>{' '}
                  superé la prueba de acceso a la abogacía y actualmente estoy colegiada en
                  el{' '}
                  <strong className="text-charcoal font-semibold">{site.bar}</strong>.
                  Ese mismo camino —el de los papeles, los plazos, las citas previas y la
                  espera— es el que hoy recorro cada día junto a mis clientes.
                </p>
                <p>
                  Soy fundadora de mi propio despacho, dedicado principalmente al{' '}
                  <strong className="text-charcoal font-semibold">
                    Derecho de Extranjería
                  </strong>
                  . Acompaño a personas y familias en sus procesos de{' '}
                  <strong className="text-charcoal font-semibold">
                    residencia, nacionalidad y regularización en España
                  </strong>
                  , con atención presencial en Alcalá de Henares y online para clientes de
                  toda España.
                </p>
              </div>

              {/* Trayectoria */}
              <div className="mt-10 pt-9 border-t border-border">
                <h3 className="display text-lg text-charcoal mb-2">
                  Formación y trayectoria
                </h3>
                <span className="gold-divider mb-7" aria-hidden="true" />

                <ol className="relative space-y-7 pl-6 border-l border-gold/40">
                  {trayectoria.map((item) => (
                    <li key={item.title} className="relative">
                      <span
                        className="absolute -left-[1.655rem] top-1.5 w-2 h-2 rounded-full bg-gold ring-4 ring-cream"
                        aria-hidden="true"
                      />
                      <p className="eyebrow text-gold mb-1.5">{item.period}</p>
                      <h4 className="font-sans font-semibold text-charcoal text-sm mb-1">
                        {item.title}
                      </h4>
                      <p className="text-warm-gray text-sm leading-relaxed">{item.detail}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="py-16 bg-cream-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="display text-xl md:text-2xl text-charcoal mb-2">
            Mis valores profesionales
          </h2>
          <span className="gold-divider mb-10" aria-hidden="true" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white border border-border rounded-lg p-6 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-garnet/10 flex items-center justify-center shrink-0">
                  <v.icon className="w-5 h-5 text-garnet" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-charcoal text-sm mb-1.5">{v.title}</h3>
                  <p className="text-warm-gray text-sm leading-relaxed">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
