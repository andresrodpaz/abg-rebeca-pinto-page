'use client'

import { useEffect } from 'react'
import { site } from '@/lib/site'
import { InstagramIcon, TikTokIcon } from '@/components/social-icons'
import { ExternalLink, Heart, MessageCircle, Play } from 'lucide-react'

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

const IG_SCRIPT_SRC = 'https://www.instagram.com/embed.js'

// Sample featured posts for Instagram feed preview
const INSTAGRAM_FEATURED_POSTS = [
  {
    id: 1,
    title: 'Novedades Reglamento de Extranjería (RD 1155/2024)',
    tag: 'Arraigo y Residencia',
    likes: '1.2k',
    comments: '84',
    url: site.social.instagram,
    isReel: true,
  },
  {
    id: 2,
    title: '¿Cómo tramitar la Nacionalidad Española por Residencia?',
    tag: 'Nacionalidad',
    likes: '950',
    comments: '42',
    url: site.social.instagram,
    isReel: false,
  },
  {
    id: 3,
    title: 'Visado de Nómada Digital: Requisitos y Ventajas 2026',
    tag: 'Visados',
    likes: '1.5k',
    comments: '112',
    url: site.social.instagram,
    isReel: true,
  },
  {
    id: 4,
    title: 'Resolución Favorable de Arraigo Social en 3 meses',
    tag: 'Casos Reales',
    likes: '2.1k',
    comments: '156',
    url: site.social.instagram,
    isReel: false,
  },
]

export default function SocialFeed() {
  const posts = site.social.instagramPosts

  useEffect(() => {
    // Load Instagram embed script
    if (posts.length > 0) {
      const existingIg = document.querySelector<HTMLScriptElement>(`script[src="${IG_SCRIPT_SRC}"]`)
      if (existingIg) {
        window.instgrm?.Embeds.process()
      } else {
        const script = document.createElement('script')
        script.src = IG_SCRIPT_SRC
        script.async = true
        script.onload = () => window.instgrm?.Embeds.process()
        document.body.appendChild(script)
      }
    }
  }, [posts])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* ── Instagram ── */}
      <div>
        <SocialHeader
          icon={<InstagramIcon className="w-4 h-4" />}
          label="Instagram"
          href={site.social.instagram}
          handle={site.social.handle}
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
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INSTAGRAM_FEATURED_POSTS.map(post => (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-xl border border-border bg-white p-5 hover:border-garnet/50 hover:shadow-md transition-all flex flex-col justify-between"
                  style={{ minHeight: '160px' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-garnet/10 text-garnet">
                        {post.tag}
                      </span>
                      {post.isReel && (
                        <span className="flex items-center gap-1 text-[10px] font-sans font-semibold text-garnet">
                          <Play className="w-3 h-3 fill-current" /> Reel
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-charcoal group-hover:text-garnet transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50 text-xs text-warm-gray font-sans">
                    <span className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-garnet/70" /> {post.likes}</span>
                      <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 text-warm-gray/70" /> {post.comments}</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-garnet opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              ))}
            </div>

            <FollowCard
              network="Instagram"
              href={site.social.instagram}
              handle={site.social.handle}
              icon={<InstagramIcon className="w-6 h-6" />}
              description="Publico novedades de extranjería, plazos y resoluciones de casos reales."
            />
          </div>
        )}
      </div>

      {/* ── TikTok ── */}
      <div>
        <SocialHeader
          icon={<TikTokIcon className="w-4 h-4" />}
          label="TikTok"
          href={site.social.tiktok}
          handle={`@${site.social.tiktokUsername}`}
        />

        <TikTokProfileCard
          username={site.social.tiktokUsername}
          href={site.social.tiktok}
        />
      </div>
    </div>
  )
}

function TikTokProfileCard({ username, href }: { username: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-garnet/40"
    >
      {/* Header banner */}
      <div
        className="h-24 relative flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #010101 0%, #1a1a2e 50%, #16213e 100%)' }}
      >
        {/* TikTok musical notes decoration */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-3 left-6 text-white text-2xl rotate-12">♪</div>
          <div className="absolute top-6 right-10 text-white text-xl -rotate-6">♫</div>
          <div className="absolute bottom-3 left-1/4 text-white text-lg rotate-6">♩</div>
          <div className="absolute bottom-4 right-1/4 text-white text-2xl -rotate-12">♬</div>
        </div>
        {/* TikTok logo */}
        <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34l.03-8.17a8.27 8.27 0 004.83 1.56V5.26a4.84 4.84 0 01-1.09-.57z" />
          </svg>
        </div>
      </div>

      {/* Profile info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-serif text-base font-semibold text-charcoal">Rebeca Pinto Camacho</p>
            <p className="text-xs font-sans text-warm-gray mt-0.5">@{username}</p>
          </div>
          <span
            className="flex items-center gap-1.5 text-xs font-sans font-semibold px-3 py-1.5 rounded-full transition-all duration-200 group-hover:bg-garnet group-hover:text-cream"
            style={{ background: 'oklch(0.95 0.010 80)', color: 'oklch(0.46 0.066 6)' }}
          >
            Seguir
          </span>
        </div>

        <p className="text-sm font-sans text-warm-gray leading-relaxed mb-4">
          Abogada de extranjería. Explico trámites de residencia, arraigo y nacionalidad española de forma clara y práctica.
        </p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { icon: '🎬', label: 'Vídeos' },
            { icon: '⚖️', label: 'Extranjería' },
            { icon: '🇪🇸', label: 'Residencia' },
          ].map(item => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1 py-2 rounded-xl text-center"
              style={{ background: 'oklch(0.97 0.010 80)' }}
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-[10px] font-sans font-semibold text-warm-gray">{item.label}</span>
            </div>
          ))}
        </div>

        <div
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-sans font-semibold transition-all duration-200"
          style={{ background: 'oklch(0.97 0.010 80)', color: 'oklch(0.32 0.12 15)' }}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Ver vídeos en TikTok
        </div>
      </div>
    </a>
  )
}

function SocialHeader({
  icon,
  label,
  href,
  handle,
}: {
  icon: React.ReactNode
  label: string
  href: string
  handle: string
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
        className="text-xs font-sans text-garnet font-semibold hover:text-garnet-light transition-colors"
      >
        {handle}
      </a>
    </div>
  )
}

function FollowCard({
  network,
  href,
  handle,
  icon,
  description,
}: {
  network: string
  href: string
  handle: string
  icon: React.ReactNode
  description: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-dashed border-gold/60 bg-white/80 p-8 text-center hover:border-garnet/50 hover:bg-white transition-all shadow-xs"
    >
      <span className="w-14 h-14 mx-auto mb-4 rounded-full bg-garnet/8 text-garnet flex items-center justify-center group-hover:bg-garnet group-hover:text-cream transition-colors">
        {icon}
      </span>
      <p className="font-serif text-lg text-charcoal uppercase tracking-[0.12em] mb-1.5 font-semibold">
        Sígueme en {network}
      </p>
      <p className="text-warm-gray text-sm leading-relaxed max-w-xs mx-auto font-sans mb-3">
        {description}
      </p>
      <span className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-garnet group-hover:underline">
        {handle} <ExternalLink className="w-3 h-3" />
      </span>
    </a>
  )
}
