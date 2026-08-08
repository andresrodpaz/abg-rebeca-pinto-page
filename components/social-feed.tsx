'use client'

import { site } from '@/lib/site'
import { InstagramIcon, TikTokIcon } from '@/components/social-icons'
import { ExternalLink, Sparkles, Heart, Users, MessageSquare } from 'lucide-react'

export default function SocialFeed() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
      {/* ── Instagram CTA Card ── */}
      <a
        href={site.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col justify-between rounded-2xl p-7 lg:p-8 bg-white border border-border transition-all duration-300 hover:shadow-xl hover:border-garnet/40 overflow-hidden"
        style={{
          boxShadow: '0 4px 20px -4px oklch(0.32 0.12 15 / 0.08)',
        }}
      >
        {/* Subtle background glow effect on hover */}
        <div
          className="absolute -right-12 -top-12 w-40 h-40 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #F56040)' }}
        />

        <div>
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #F56040)', boxShadow: '0 4px 12px rgba(225, 48, 108, 0.3)' }}
              >
                <InstagramIcon className="w-6 h-6 fill-current" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold uppercase tracking-wider text-garnet">
                  <Sparkles className="w-3 h-3" /> Instagram
                </span>
                <p className="font-serif text-lg font-semibold text-charcoal">
                  Rebeca Pinto Camacho
                </p>
              </div>
            </div>
            <span className="text-xs font-sans font-semibold text-garnet group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              {site.social.handle}
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>

          <p className="text-sm font-sans text-warm-gray leading-relaxed mb-6">
            Sígueme en Instagram para estar al día sobre resoluciones de extranjería, consejos legales prácticos, novedades de residencia y respuestas a dudas habituales.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[
              { icon: <Heart className="w-4 h-4 text-garnet" />, label: 'Consejos' },
              { icon: <Users className="w-4 h-4 text-garnet" />, label: 'Casos Reales' },
              { icon: <MessageSquare className="w-4 h-4 text-garnet" />, label: 'Novedades' },
            ].map(item => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-xl text-center"
                style={{ background: 'oklch(0.97 0.010 80)' }}
              >
                {item.icon}
                <span className="text-xs font-sans font-medium text-charcoal">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div
          className="w-full py-3.5 px-4 rounded-xl text-sm font-sans font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #833AB4, #E1306C, #FD1D1D)',
            color: 'white',
            boxShadow: '0 4px 14px rgba(225, 48, 108, 0.25)',
          }}
        >
          <InstagramIcon className="w-4 h-4 fill-current" />
          Seguir en Instagram
        </div>
      </a>

      {/* ── TikTok CTA Card ── */}
      <a
        href={site.social.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col justify-between rounded-2xl p-7 lg:p-8 bg-white border border-border transition-all duration-300 hover:shadow-xl hover:border-garnet/40 overflow-hidden"
        style={{
          boxShadow: '0 4px 20px -4px oklch(0.32 0.12 15 / 0.08)',
        }}
      >
        {/* Subtle background glow effect on hover */}
        <div
          className="absolute -right-12 -top-12 w-40 h-40 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #00f2fe, #4facfe, #000000)' }}
        />

        <div>
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #010101 0%, #16213e 100%)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)' }}
              >
                <TikTokIcon className="w-6 h-6 fill-current text-white" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold uppercase tracking-wider text-garnet">
                  <Sparkles className="w-3 h-3" /> TikTok
                </span>
                <p className="font-serif text-lg font-semibold text-charcoal">
                  Rebeca Pinto Camacho
                </p>
              </div>
            </div>
            <span className="text-xs font-sans font-semibold text-garnet group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              @{site.social.tiktokUsername}
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>

          <p className="text-sm font-sans text-warm-gray leading-relaxed mb-6">
            Vídeos cortos y explicaciones directas sobre trámites de arraigo, residencia, nacionalidad y cambios en la legislación de extranjería.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[
              { icon: '🎬', label: 'Vídeos útiles' },
              { icon: '⚖️', label: 'Extranjería' },
              { icon: '🇪🇸', label: 'Nacionalidad' },
            ].map(item => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-xl text-center"
                style={{ background: 'oklch(0.97 0.010 80)' }}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="text-xs font-sans font-medium text-charcoal">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div
          className="w-full py-3.5 px-4 rounded-xl text-sm font-sans font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #010101, #1a1a2e)',
            color: 'white',
            boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
          }}
        >
          <TikTokIcon className="w-4 h-4 fill-current text-white" />
          Seguir en TikTok
        </div>
      </a>
    </div>
  )
}
