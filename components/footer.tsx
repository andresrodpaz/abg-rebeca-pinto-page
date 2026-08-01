import Link from 'next/link'
import { MapPin, Phone, Mail, Video, Scale } from 'lucide-react'
import BrandMark from '@/components/brand-mark'
import { InstagramIcon, TikTokIcon } from '@/components/social-icons'
import { site } from '@/lib/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-garnet-dark text-cream/80">
      <div className="gold-rule" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Marca */}
          <div>
            <BrandMark />
            <p className="mt-4 eyebrow text-gold/70">{site.specialties.join(' · ')}</p>
            <p className="mt-4 text-sm leading-relaxed text-cream/60 max-w-xs">
              Despacho especializado en derecho de extranjería. Acompaño a personas y
              familias en sus procesos de residencia, nacionalidad y regularización en
              España.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram de ${site.name}`}
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`TikTok de ${site.name}`}
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Áreas */}
          <div>
            <h3 className="display text-cream text-sm mb-4">Áreas de práctica</h3>
            <span className="gold-divider mb-5" aria-hidden="true" />
            <ul className="space-y-2 text-sm">
              {[
                ['Arraigo social, laboral y familiar', '/areas/arraigo'],
                ['Nacionalidad española', '/areas/nacionalidad'],
                ['Reagrupación familiar', '/areas/reagrupacion-familiar'],
                ['Renovaciones de residencia', '/areas/renovaciones'],
                ['TIE / NIE', '/areas/tie-nie'],
                ['Visados', '/areas/visados'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-cream/60 hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="display text-cream text-sm mb-4">Contacto</h3>
            <span className="gold-divider mb-5" aria-hidden="true" />
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/60 hover:text-gold transition-colors not-italic"
                >
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city} ({site.address.region})
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <a
                  href={`tel:${site.phone.tel}`}
                  className="text-cream/60 hover:text-gold transition-colors"
                >
                  {site.phone.display}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <a
                  href={`mailto:${site.email}`}
                  className="text-cream/60 hover:text-gold transition-colors break-all"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Video className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-cream/60">{site.coverage}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Scale className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-cream/60">Colegiada en el {site.bar}</span>
              </li>
            </ul>
            <div className="mt-5">
              <Link
                href="/citas"
                className="inline-block px-5 py-2 bg-gold text-charcoal text-sm font-semibold rounded hover:bg-gold-light transition-colors"
              >
                Agendar cita
              </Link>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="border-t border-cream/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <p>© {year} {site.name}. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/aviso-legal" className="hover:text-gold transition-colors">Aviso legal</Link>
            <Link href="/politica-privacidad" className="hover:text-gold transition-colors">Privacidad</Link>
            <Link href="/politica-cookies" className="hover:text-gold transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
