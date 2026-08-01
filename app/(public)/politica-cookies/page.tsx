import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies | Rebeca Pinto Camacho',
  robots: { index: false },
}

export default function PoliticaCookiesPage() {
  return (
    <section className="py-16 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl text-charcoal mb-2">Política de Cookies</h1>
        <span className="gold-divider mb-8 block" />

        <div className="space-y-6 leading-relaxed text-warm-gray text-sm">
          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños ficheros de texto que se almacenan en el dispositivo del usuario al navegar por un sitio web. Permiten que el sitio recuerde información sobre tu visita, como tu idioma preferido y otras opciones, facilitando así tu próxima visita.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">¿Qué cookies utiliza este sitio web?</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs border-collapse border border-border">
                <thead>
                  <tr className="bg-cream-dark">
                    <th className="border border-border px-3 py-2 text-left text-charcoal">Cookie</th>
                    <th className="border border-border px-3 py-2 text-left text-charcoal">Tipo</th>
                    <th className="border border-border px-3 py-2 text-left text-charcoal">Finalidad</th>
                    <th className="border border-border px-3 py-2 text-left text-charcoal">Duración</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-3 py-2">cookie-consent</td>
                    <td className="border border-border px-3 py-2">Técnica (propia)</td>
                    <td className="border border-border px-3 py-2">Almacena la preferencia de consentimiento del usuario</td>
                    <td className="border border-border px-3 py-2">1 año</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2">better-auth.session_token</td>
                    <td className="border border-border px-3 py-2">Técnica (propia)</td>
                    <td className="border border-border px-3 py-2">Gestión de sesión de usuario autenticado (panel de administración)</td>
                    <td className="border border-border px-3 py-2">7 días</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">Este sitio web no utiliza cookies analíticas ni publicitarias de terceros.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">¿Cómo gestionar las cookies?</h2>
            <p>Puedes aceptar o rechazar las cookies a través del banner que aparece en tu primera visita. Además, puedes configurar tu navegador para bloquear o eliminar las cookies existentes. Ten en cuenta que bloquear las cookies técnicas puede afectar al funcionamiento del sitio web.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">Más información</h2>
            <p>Para más información sobre el tratamiento de tus datos personales, consulta nuestra <a href="/politica-privacidad" className="text-garnet underline underline-offset-2">política de privacidad</a>.</p>
          </section>

          <p className="text-xs text-warm-gray/60 mt-8">Última actualización: julio 2025</p>
        </div>
      </div>
    </section>
  )
}
