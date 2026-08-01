import type { Metadata } from 'next'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Aviso Legal | Rebeca Pinto Camacho',
  robots: { index: false },
}

export default function AvisoLegalPage() {
  return (
    <section className="py-16 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl text-charcoal mb-2">Aviso Legal</h1>
        <span className="gold-divider mb-8 block" />

        <div className="prose prose-sm max-w-none text-warm-gray space-y-6 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">1. Datos identificativos del titular</h2>
            <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, se informa de los siguientes datos:</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li><strong>Titular:</strong> {site.name}</li>
              <li><strong>Actividad:</strong> Servicios jurídicos de extranjería, residencia y nacionalidad</li>
              <li><strong>Domicilio profesional:</strong> {site.address.full}</li>
              <li><strong>Teléfono:</strong> {site.phone.display}</li>
              <li><strong>Email:</strong> {site.email}</li>
              <li><strong>Colegio de Abogados:</strong> {site.bar}</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">2. Objeto y ámbito de aplicación</h2>
            <p>El presente aviso legal regula el uso del sitio web <strong>rebecapintocamacho.es</strong> (en adelante, &ldquo;el Sitio Web&rdquo;). El acceso y uso del Sitio Web implica la aceptación plena y sin reservas de las presentes condiciones.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">3. Propiedad intelectual e industrial</h2>
            <p>Todos los contenidos del Sitio Web (textos, imágenes, logotipos, diseño gráfico, código fuente) son propiedad de Rebeca Pinto Camacho o cuentan con la licencia correspondiente. Queda prohibida su reproducción, distribución o comunicación pública sin autorización expresa.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">4. Exclusión de responsabilidad</h2>
            <p>La información contenida en este Sitio Web tiene carácter meramente informativo y no constituye asesoramiento jurídico. Rebeca Pinto Camacho no se responsabiliza de los daños derivados del uso de la información publicada sin consulta previa con el despacho.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-charcoal mb-3">5. Legislación aplicable y jurisdicción</h2>
            <p>El presente aviso legal se rige por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales de Alcalá de Henares, con renuncia a cualquier otro fuero que pudiera corresponderles.</p>
          </section>

          <p className="text-xs text-warm-gray/60 mt-8">Última actualización: julio 2025</p>
        </div>
      </div>
    </section>
  )
}
