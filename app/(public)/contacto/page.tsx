'use client'

import { useState } from 'react'
import { MapPin, Mail, Video, Send, Phone, Clock } from 'lucide-react'
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/social-icons'
import { site } from '@/lib/site'

const MIGRATORY_OPTIONS = [
  'Arraigo social',
  'Arraigo laboral',
  'Arraigo familiar',
  'Nacionalidad española',
  'Reagrupación familiar',
  'Renovación de residencia',
  'TIE / NIE',
  'Visado',
  'Otra situación',
]

export default function ContactoPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    situation: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Error al enviar')
      setSent(true)
      setForm({ name: '', phone: '', situation: '', message: '' })
    } catch {
      setError(
        `Ha ocurrido un error. Por favor, llámame al ${site.phone.display} o escríbeme por WhatsApp.`
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      {/* HERO */}
      <section className="bg-garnet py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-gold/70">Estoy aquí para ayudarte</p>
          <h1 className="display-lg text-cream text-3xl md:text-4xl mt-3 mb-5 text-balance">
            Contacto
          </h1>
          <span className="gold-divider mb-6" aria-hidden="true" />
          <p className="text-cream/70 text-base leading-relaxed max-w-2xl">
            Cuéntame tu situación. Sin compromisos y con total confidencialidad. Te respondo lo antes posible.
          </p>
        </div>
      </section>

      <div className="h-px bg-gold" aria-hidden="true" />

      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

            {/* Form */}
            <div className="md:col-span-3">
              <h2 className="display text-lg text-charcoal mb-1">Envíame un mensaje</h2>
              <span className="gold-divider mb-6" aria-hidden="true" />

              {sent ? (
                <div className="bg-garnet/10 border border-garnet/20 rounded-lg p-6 text-center">
                  <Send className="w-8 h-8 text-garnet mx-auto mb-3" />
                  <p className="font-serif text-xl text-charcoal mb-2">Mensaje enviado</p>
                  <p className="text-warm-gray text-sm">Gracias por contactarme. Te respondo en breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-charcoal uppercase tracking-wide mb-1.5">
                      Nombre completo <span className="text-garnet">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Tu nombre y apellidos"
                      className="w-full px-4 py-2.5 border border-border rounded bg-white text-charcoal placeholder:text-warm-gray/50 text-sm focus:outline-none focus:ring-2 focus:ring-garnet/30 focus:border-garnet transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-charcoal uppercase tracking-wide mb-1.5">
                      Teléfono / WhatsApp <span className="text-garnet">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Tu número de teléfono"
                      className="w-full px-4 py-2.5 border border-border rounded bg-white text-charcoal placeholder:text-warm-gray/50 text-sm focus:outline-none focus:ring-2 focus:ring-garnet/30 focus:border-garnet transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="situation" className="block text-xs font-semibold text-charcoal uppercase tracking-wide mb-1.5">
                      Situación migratoria <span className="text-garnet">*</span>
                    </label>
                    <select
                      id="situation"
                      name="situation"
                      required
                      value={form.situation}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-border rounded bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-garnet/30 focus:border-garnet transition-colors"
                    >
                      <option value="">Selecciona tu situación</option>
                      {MIGRATORY_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-charcoal uppercase tracking-wide mb-1.5">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Cuéntame brevemente tu situación..."
                      className="w-full px-4 py-2.5 border border-border rounded bg-white text-charcoal placeholder:text-warm-gray/50 text-sm focus:outline-none focus:ring-2 focus:ring-garnet/30 focus:border-garnet transition-colors resize-none"
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3 bg-garnet text-cream text-sm font-semibold rounded hover:bg-garnet-dark transition-colors disabled:opacity-60"
                  >
                    {sending ? 'Enviando...' : 'Enviar mensaje'}
                  </button>
                  <p className="text-xs text-warm-gray/60 leading-relaxed">
                    Al enviar este formulario aceptas nuestra{' '}
                    <a href="/politica-privacidad" className="underline underline-offset-2 hover:text-garnet transition-colors">
                      política de privacidad
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>

            {/* Información de contacto */}
            <aside className="md:col-span-2 space-y-6">
              <div>
                <h2 className="display text-lg text-charcoal mb-1">Información de contacto</h2>
                <span className="gold-divider mb-6" aria-hidden="true" />
              </div>

              {/* Teléfono destacado */}
              <a
                href={`tel:${site.phone.tel}`}
                className="flex items-center gap-3 bg-garnet rounded-lg p-4 text-cream hover:bg-garnet-light transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gold">Llámame</p>
                  <p className="font-serif text-lg tracking-wide">{site.phone.display}</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={site.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 rounded-lg p-4 hover:bg-[#25D366]/15 transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                </span>
                <div>
                  <p className="font-semibold text-sm text-charcoal">WhatsApp</p>
                  <p className="text-xs text-warm-gray">Respuesta rápida y directa</p>
                </div>
              </a>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-charcoal">Despacho</p>
                    <a
                      href={site.address.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-warm-gray hover:text-garnet transition-colors not-italic"
                    >
                      {site.address.street}
                      <br />
                      {site.address.postalCode} {site.address.city} ({site.address.region})
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Video className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-charcoal">Atención online</p>
                    <p className="text-warm-gray">
                      Consultas por videollamada para clientes de toda España
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-charcoal">Email</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-warm-gray hover:text-garnet transition-colors break-all"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-charcoal">Horario</p>
                    <p className="text-warm-gray">{site.schedule}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <InstagramIcon className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-charcoal">Redes sociales</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <a
                        href={site.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-warm-gray hover:text-garnet transition-colors"
                      >
                        <InstagramIcon className="w-3.5 h-3.5" />
                        Instagram
                      </a>
                      <a
                        href={site.social.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-warm-gray hover:text-garnet transition-colors"
                      >
                        <TikTokIcon className="w-3.5 h-3.5" />
                        TikTok
                      </a>
                    </div>
                    <p className="text-xs text-warm-gray/70 mt-0.5">{site.social.handle}</p>
                  </div>
                </div>
              </div>

              {/* Mapa */}
              <div className="rounded-lg overflow-hidden border border-border">
                <iframe
                  title={`Ubicación del despacho: ${site.address.full}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    `${site.address.street}, ${site.address.postalCode} ${site.address.city}, ${site.address.region}`
                  )}&z=16&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full block"
                  style={{ height: 220, border: 0 }}
                />
              </div>

              <div className="bg-garnet/8 border border-garnet/15 rounded-lg p-4">
                <p className="text-xs text-warm-gray leading-relaxed">
                  <strong className="text-charcoal">Horario de atención:</strong>{' '}
                  {site.schedule}. Las consultas urgentes por WhatsApp se atienden con la
                  mayor brevedad posible.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
