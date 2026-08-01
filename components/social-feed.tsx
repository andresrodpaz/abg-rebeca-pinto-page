'use client'

import { useEffect } from 'react'
import { site } from '@/lib/site'
import { InstagramIcon, TikTokIcon } from '@/components/social-icons'

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

const IG_SCRIPT_SRC = 'https://www.instagram.com/embed.js'

/**
 * Previsualización embebida de las últimas publicaciones.
 *
 * · Instagram — embed oficial de cada post. Los códigos se configuran en
 *   `site.social.instagramPosts`; sin códigos se muestra el enlace al perfil.
 * · TikTok — embed oficial del perfil, que se actualiza solo con los
 *   últimos vídeos publicados.
 */
export default function SocialFeed() {
  const posts = site.social.instagramPosts

  useEffect(() => {
    if (posts.length === 0) return

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${IG_SCRIPT_SRC}"]`
    )

    if (existing) {
      window.instgrm?.Embeds.process()
      return
    }

    const script = document.createElement('script')
    script.src = IG_SCRIPT_SRC
    script.async = true
    script.onload = () => window.instgrm?.Embeds.process()
    document.body.appendChild(script)
  }, [posts])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* ── Instagram ── */}
      <div>
        <SocialHeader
          icon={<InstagramIcon className="w-4 h-4" />}
          label="Instagram"
          href={site.social.instagram}
        />

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {posts.slice(0, 4).map(code => (
              <blockquote
                key={code}
                className="instagram-media w-full"
                data-instgrm-permalink={`https://www.instagram.com/p/${code}/`}
                data-instgrm-version="14"
                data-instgrm-captioned
                style={{
                  background: '#FFF',
                  border: 0,
                  borderRadius: '0.5rem',
                  margin: 0,
                  maxWidth: '100%',
                  minWidth: 0,
                  padding: 0,
                  width: '100%',
                }}
              />
            ))}
          </div>
        ) : (
          <FollowCard
            network="Instagram"
            href={site.social.instagram}
            icon={<InstagramIcon className="w-6 h-6" />}
          />
        )}
      </div>

      {/* ── TikTok ── */}
      <div>
        <SocialHeader
          icon={<TikTokIcon className="w-4 h-4" />}
          label="TikTok"
          href={site.social.tiktok}
        />
        <div className="rounded-lg overflow-hidden border border-border bg-white shadow-sm">
          <iframe
            src={`https://www.tiktok.com/embed/@${site.social.username}`}
            title={`Últimos vídeos de ${site.social.handle} en TikTok`}
            loading="lazy"
            allow="encrypted-media"
            className="w-full block"
            style={{ height: 640, border: 0 }}
          />
        </div>
      </div>
    </div>
  )
}

function SocialHeader({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode
  label: string
  href: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-gold/40">
      <span className="flex items-center gap-2 text-charcoal">
        <span className="text-garnet">{icon}</span>
        <span className="font-serif text-base uppercase tracking-[0.16em]">{label}</span>
      </span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-sans text-garnet hover:text-garnet-light transition-colors"
      >
        {site.social.handle}
      </a>
    </div>
  )
}

function FollowCard({
  network,
  href,
  icon,
}: {
  network: string
  href: string
  icon: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-dashed border-gold/60 bg-white/60 p-10 text-center hover:border-garnet/50 hover:bg-white transition-colors"
    >
      <span className="w-14 h-14 mx-auto mb-4 rounded-full bg-garnet/8 text-garnet flex items-center justify-center group-hover:bg-garnet group-hover:text-cream transition-colors">
        {icon}
      </span>
      <p className="font-serif text-lg text-charcoal uppercase tracking-[0.12em] mb-1.5">
        Sígueme en {network}
      </p>
      <p className="text-warm-gray text-sm leading-relaxed max-w-xs mx-auto">
        Publico novedades de extranjería, plazos y resoluciones de casos reales en{' '}
        <span className="text-garnet font-medium">{site.social.handle}</span>.
      </p>
    </a>
  )
}
