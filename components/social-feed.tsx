import { InstagramIcon, TikTokIcon } from '@/components/social-icons'
import { site } from '@/lib/site'

export default function SocialFeed() {
  return (
    <div className="text-center max-w-xl mx-auto">
      <p className="eyebrow text-gold mb-3">Redes sociales</p>
      <h2 className="font-serif text-2xl md:text-3xl text-charcoal font-semibold mb-4 tracking-tight">
        También estoy en redes
      </h2>
      <span className="gold-divider mx-auto mb-6" aria-hidden="true" />
      <p className="text-warm-gray text-sm md:text-base leading-relaxed font-sans mb-10">
        Comparto contenido sobre extranjería de forma cercana y sin tecnicismos.
        Sígueme para estar al día.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-sans text-sm font-semibold text-cream bg-garnet hover:bg-garnet-dark transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-px"
        >
          <InstagramIcon className="w-4 h-4 fill-current" />
          Seguir en Instagram
        </a>

        <a
          href={site.social.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-sans text-sm font-semibold text-charcoal bg-gold/20 border border-gold/40 hover:bg-gold/30 transition-all duration-200 hover:-translate-y-px"
        >
          <TikTokIcon className="w-4 h-4 fill-current text-charcoal" />
          Seguir en TikTok
        </a>
      </div>
    </div>
  )
}
