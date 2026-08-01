import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'
import CookieBanner from '@/components/cookie-banner'
import { site } from '@/lib/site'

/** Datos estructurados para buscadores y fichas locales */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: `Abogada ${site.name}`,
  description:
    'Despacho especializado en Derecho de Extranjería: residencia, nacionalidad y regularización en España.',
  image: '/hero-image.jpeg',
  logo: '/logo.png',
  telephone: site.phone.tel,
  email: site.email,
  priceRange: '€€',
  areaServed: { '@type': 'Country', name: 'España' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: 'ES',
  },
  sameAs: [site.social.instagram, site.social.tiktok],
  knowsAbout: [...site.specialties],
  founder: {
    '@type': 'Person',
    name: site.name,
    jobTitle: 'Abogada',
    memberOf: { '@type': 'Organization', name: site.bar },
  },
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  )
}
