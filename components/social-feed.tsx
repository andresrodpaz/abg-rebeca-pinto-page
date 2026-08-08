'use client'

import { InstagramIcon, TikTokIcon } from '@/components/social-icons'

export default function SocialFeed() {
  const instagramUrl = 'https://www.instagram.com/abogadarebecapintocamacho'
  const tiktokUrl = 'https://www.tiktok.com/@rebecaandreinapintocamac'

  return (
    <div className="max-w-2xl mx-auto text-center">
      <p className="eyebrow text-gold font-semibold uppercase tracking-[0.20em] text-xs mb-3">
        Redes sociales
      </p>
      <h2 className="font-serif text-2xl md:text-3xl text-charcoal font-semibold mb-4 tracking-tight">
        También me encuentras en redes
      </h2>
      <span className="gold-divider mx-auto mb-6" aria-hidden="true" />
      <p className="text-warm-gray text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-8 font-sans">
        Comparto contenido práctico sobre extranjería, novedades en la ley y consejos útiles para resolver tus dudas de forma clara.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-lg font-sans text-sm font-semibold text-cream bg-garnet hover:bg-garnet-dark transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <InstagramIcon className="w-4 h-4 fill-current text-gold" />
          <span>Seguir en Instagram</span>
        </a>

        <a
          href={tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-lg font-sans text-sm font-semibold text-charcoal bg-gold hover:bg-gold-light transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <TikTokIcon className="w-4 h-4 fill-current text-charcoal" />
          <span>Seguir en TikTok</span>
        </a>
      </div>
    </div>
  )
}
