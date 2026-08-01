import type { Metadata } from 'next'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Rebeca Pinto Camacho',
  robots: { index: false },
}

export default function PoliticaPrivacidadPage() {
  return (
    <section className="py-16 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl text-charcoal mb-2">Política de Privacidad</h1>
        <span className="gold-divider mb-8 block" />

        <div className="space-y-6 leading-relaxed text-warm-gray text-sm">
          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">1. Responsable del tratamiento</h2>
            <p>{site.name}, colegiada en el {site.bar}, con domicilio profesional en {site.address.full}. Teléfono: {site.phone.display}. Email: {site.email}.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">2. Datos recabados y finalidades</h2>
            <p>A través del formulario de contacto y del sistema de citas recabamos los siguientes datos: nombre, teléfono, situación migratoria y mensaje. La finalidad es atender la consulta formulada, gestionar la cita solicitada y enviar comunicaciones relacionadas con el servicio.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">3. Base jurídica</h2>
            <p>El tratamiento se basa en el consentimiento del interesado (art. 6.1.a RGPD) y, en su caso, en la ejecución de un contrato de prestación de servicios jurídicos (art. 6.1.b RGPD).</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">4. Conservación de los datos</h2>
            <p>Los datos se conservarán durante el tiempo necesario para atender la consulta o gestionar el servicio, y posteriormente durante los plazos legales aplicables a la actividad jurídica.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">5. Destinatarios</h2>
            <p>No se ceden datos a terceros, salvo obligación legal. Para el envío de comunicaciones se utiliza el proveedor Resend (EE.UU.), con las garantías adecuadas previstas en el RGPD.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">6. Derechos</h2>
            <p>Puedes ejercer tus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición dirigiéndote a {site.email}, adjuntando copia de tu DNI o documento equivalente. Tienes derecho a presentar reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).</p>
          </section>

          <p className="text-xs text-warm-gray/60 mt-8">Última actualización: julio 2025</p>
        </div>
      </div>
    </section>
  )
}
