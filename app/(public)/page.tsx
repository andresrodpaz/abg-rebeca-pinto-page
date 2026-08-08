import Image from 'next/image'
import Link from 'next/link'
import {
  UserCheck,
  Phone,
  Star,
  FileCheck,
  Users,
  RefreshCw,
  CreditCard,
  Globe,
  ChevronRight,
  Quote,
  MapPin,
  Video,
} from 'lucide-react'
import SocialFeed from '@/components/social-feed'
import { site } from '@/lib/site'

const practiceAreas = [
  {
    icon: UserCheck,
    title: 'Arraigo',
    description: 'Social, laboral y familiar. Te acompañamos en cada tipo de arraigo para regularizar tu situación.',
    href: '/areas/arraigo',
  },
  {
    icon: Star,
    title: 'Nacionalidad española',
    description: 'Adquiere la nacionalidad española por residencia u otras vías. Analizamos tu caso personalmente.',
    href: '/areas/nacionalidad',
  },
  {
    icon: Users,
    title: 'Reagrupación familiar',
    description: 'Reúnete con tu familia en España. Te guiamos en cada requisito y documentación necesaria.',
    href: '/areas/reagrupacion-familiar',
  },
  {
    icon: RefreshCw,
    title: 'Renovaciones de residencia',
    description: 'Renueva tu autorización de residencia a tiempo y sin errores. Seguimiento completo del expediente.',
    href: '/areas/renovaciones',
  },
  {
    icon: CreditCard,
    title: 'TIE / NIE',
    description: 'Obtención y renovación del TIE y el NIE. Gestión rápida y eficaz de la documentación.',
    href: '/areas/tie-nie',
  },
  {
    icon: Globe,
    title: 'Visados',
    description: 'Visados de estudio, trabajo, pareja de hecho y otros. Asesoramiento desde el primer paso.',
    href: '/areas/visados',
  },
]

const valores = [
  {
    icon: UserCheck,
    title: 'Atención directa',
    body: 'Soy yo quien estudia tu caso, prepara tu expediente y te acompaña. Sin despachos masivos, sin delegar en becarios.',
  },
  {
    icon: FileCheck,
    title: 'Especialización exclusiva',
    body: 'Me dedico exclusivamente al derecho de extranjería. Conozco cada trámite, cada cambio normativo y cada oficina en profundidad.',
  },
  {
    icon: Phone,
    title: 'Compromiso con el resultado',
    body: 'No presento expedientes a medias. Reviso cada documento hasta estar segura de que el expediente es sólido y completo.',
  },
  {
    icon: Users,
    title: 'Cercanía y empatía',
    body: 'Entiendo que los trámites de extranjería generan incertidumbre. Mi trabajo es que te sientas acompañado y tranquilo en todo momento.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-garnet overflow-hidden">
        {/* Diagonal decorativa */}
        <div className="absolute inset-0 bg-garnet-dark opacity-30 [clip-path:polygon(60%_0,100%_0,100%_100%,40%_100%)]" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div>
              <p className="eyebrow text-[#F5E6C8] font-semibold mb-5 tracking-[0.20em]">{site.role} · Alcalá de Henares</p>

              <h1 className="display-lg text-cream text-3xl md:text-4xl lg:text-5xl text-balance mb-6">
                Rebeca Pinto Camacho
              </h1>

              {/* Tagline de especialidades */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-7">
                {site.specialties.map((s, i) => (
                  <span key={s} className="flex items-center gap-3">
                    {i > 0 && <span className="w-1.5 h-1.5 rounded-full bg-[#F5E6C8]" aria-hidden="true" />}
                    <span className="font-serif text-[#F5E6C8] text-base md:text-lg uppercase tracking-[0.18em] font-semibold">
                      {s}
                    </span>
                  </span>
                ))}
              </div>

              <span className="gold-divider mb-7" aria-hidden="true" />

              <p className="text-cream/75 font-sans text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                Abogada con trayectoria internacional, colegiada en el {site.bar}. Estudio
                tu caso personalmente y te acompaño en cada paso de tu proceso de
                residencia, nacionalidad o regularización.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/citas"
                  className="px-6 py-3 bg-gold text-charcoal font-semibold text-sm rounded hover:bg-gold-light transition-colors"
                >
                  Agendar cita
                </Link>
                <a
                  href={`tel:${site.phone.tel}`}
                  className="flex items-center gap-2 px-6 py-3 border border-cream/30 text-cream text-sm rounded hover:border-gold hover:text-gold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {site.phone.display}
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-cream/60 text-xs font-sans">
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  {site.address.city} ({site.address.region})
                </span>
                <span className="flex items-center gap-2">
                  <Video className="w-3.5 h-3.5 text-gold" />
                  {site.coverageShort}
                </span>
              </div>
            </div>

            {/* Retrato */}
            <div className="relative w-full max-w-sm mx-auto md:mx-0 md:ml-auto">
              <span
                className="absolute -inset-3 border border-gold/35 rounded-lg"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-cream-dark">
                <Image
                  src="/hero-image.jpeg"
                  alt="Rebeca Pinto Camacho, abogada especializada en extranjería"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 400px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILETE DORADO */}
      <div className="h-px bg-gold w-full" aria-hidden="true" />

      {/* VALORES PROFESIONALES */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="eyebrow text-gold">Cómo trabajamos juntos</p>
            <h2 className="display text-2xl md:text-3xl text-charcoal mt-3 text-balance">
              Mis valores profesionales
            </h2>
            <span className="gold-divider mx-auto mt-5" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {valores.map((v) => (
              <div
                key={v.title}
                className="bg-white border border-border rounded-lg p-8 flex gap-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-garnet/10 flex items-center justify-center shrink-0 mt-0.5">
                  <v.icon className="w-5 h-5 text-garnet" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-charcoal font-semibold mb-2">{v.title}</h3>
                  <p className="text-warm-gray text-sm leading-relaxed">{v.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cita */}
          <div className="mt-16 bg-garnet rounded-lg p-10 flex flex-col md:flex-row items-start gap-6">
            <Quote className="w-10 h-10 text-gold/50 shrink-0 mt-1" aria-hidden="true" />
            <div>
              <p className="font-serif text-cream text-xl md:text-2xl leading-relaxed italic text-balance">
                &ldquo;Creo en una abogacía cercana y honesta. Mi objetivo no es solo resolver tu trámite, sino que te sientas acompañado y comprendido en cada momento.&rdquo;
              </p>
              <p className="mt-4 text-gold text-sm font-sans tracking-wide">— {site.name}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ÁREAS DE PRÁCTICA */}
      <section className="py-20 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="eyebrow text-gold">Servicios</p>
            <h2 className="display text-2xl md:text-3xl text-charcoal mt-3 text-balance">
              Áreas de práctica
            </h2>
            <span className="gold-divider mx-auto mt-5" aria-hidden="true" />
            <p className="mt-5 text-warm-gray text-sm max-w-xl mx-auto leading-relaxed">
              Especialización exclusiva en derecho de extranjería. Conozco cada trámite en profundidad para darte la mejor orientación desde el primer momento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((area) => (
              <Link
                key={area.href}
                href={area.href}
                className="group bg-white border border-border rounded-lg p-7 flex flex-col gap-4 hover:border-garnet/40 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-full bg-garnet/8 group-hover:bg-garnet/15 flex items-center justify-center transition-colors">
                  <area.icon className="w-5 h-5 text-garnet" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-charcoal font-semibold mb-1.5">{area.title}</h3>
                  <p className="text-warm-gray text-sm leading-relaxed">{area.description}</p>
                </div>
                <div className="flex items-center gap-1 text-garnet text-xs font-sans font-semibold tracking-wide mt-auto pt-2 border-t border-border">
                  Ver más <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REDES SOCIALES */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SocialFeed />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-garnet">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow text-gold/70">Da el primer paso</p>
          <h2 className="display text-cream text-2xl md:text-3xl mt-4 mb-5 text-balance">
            ¿Tienes dudas sobre tu situación migratoria?
          </h2>
          <span className="gold-divider mx-auto mb-6" aria-hidden="true" />
          <p className="text-cream/70 text-sm md:text-base leading-relaxed mb-8">
            Agenda una cita y cuéntame tu caso. Sin compromisos, con toda la confidencialidad.
            Te atiendo en el despacho de {site.address.city} o por videollamada desde
            cualquier punto de España.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/citas"
              className="px-8 py-3.5 bg-gold text-charcoal font-semibold text-sm rounded hover:bg-gold-light transition-colors"
            >
              Agendar cita
            </Link>
            <a
              href={`tel:${site.phone.tel}`}
              className="flex items-center gap-2 px-8 py-3.5 border border-cream/30 text-cream text-sm rounded hover:border-gold hover:text-gold transition-colors"
            >
              <Phone className="w-4 h-4" />
              {site.phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
