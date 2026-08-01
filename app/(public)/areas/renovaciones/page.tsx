import type { Metadata } from 'next'
import AreaPageTemplate from '@/components/area-page-template'
import { RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Renovaciones de Residencia | Rebeca Pinto Camacho',
  description:
    'Renueva tu autorización de residencia en España sin errores ni retrasos. Asesoramiento especializado en Alcalá de Henares y online.',
}

export default function RenovacionesPracticePage() {
  return (
    <AreaPageTemplate
      icon={RefreshCw}
      eyebrow="Áreas de práctica"
      title="Renovaciones de residencia"
      subtitle="Renueva tu autorización de residencia a tiempo y sin errores. Te ocupo del proceso para que puedas centrarte en tu vida en España."
      intro="La renovación de la autorización de residencia es un trámite imprescindible para mantener la situación regular en España. Dependiendo del tipo de residencia (temporal, trabajo, no lucrativa, reagrupación familiar, etc.), los requisitos y plazos varían. Es fundamental presentar la solicitud de renovación antes de que expire la autorización vigente — idealmente entre 60 y 90 días antes — para evitar la irregularidad sobrevenida. Un error en la documentación o en los plazos puede tener consecuencias graves para tu situación migratoria."
      requirements={[
        'Pasaporte en vigor con al menos 4 meses de validez',
        'TIE vigente o caducado recientemente',
        'Empadronamiento actualizado',
        'Cotizaciones a la Seguridad Social o contrato de trabajo vigente',
        'Medios económicos suficientes (en renovaciones no lucrativas)',
        'Carencia de antecedentes penales',
        'Formulario oficial de renovación (EX-17 u otro según modalidad)',
        'Tasa abonada (modelo 790 código 052)',
      ]}
      steps={[
        {
          number: 1,
          title: 'Análisis de tu tipo de residencia y requisitos',
          description: 'Revisamos el tipo de autorización que tienes y cuáles son los requisitos exactos para su renovación, evitando sorpresas de última hora.',
        },
        {
          number: 2,
          title: 'Preparación del expediente',
          description: 'Recabamos toda la documentación necesaria y verificamos que esté completa y actualizada antes de presentarla.',
        },
        {
          number: 3,
          title: 'Presentación de la solicitud',
          description: 'Presentamos la renovación en el plazo adecuado y en la vía correspondiente (presencial o telemática).',
        },
        {
          number: 4,
          title: 'Seguimiento y renovación del TIE',
          description: 'Una vez resuelta la renovación, te ayudamos a pedir cita para renovar tu TIE y seguimos el proceso hasta el final.',
        },
      ]}
      faqs={[
        {
          question: '¿Cuándo debo presentar la solicitud de renovación?',
          answer: 'Debes presentarla dentro de los 60 días naturales previos a la caducidad de tu autorización vigente. También puedes presentarla hasta 90 días después de la caducidad, aunque en este caso conviene actuar rápido.',
        },
        {
          question: '¿Puedo trabajar mientras espero la resolución de la renovación?',
          answer: 'Sí. Mientras la solicitud de renovación está en trámite, tu autorización se prorroga automáticamente y puedes seguir trabajando con normalidad.',
        },
        {
          question: '¿Qué pasa si se me olvida renovar y mi residencia caduca?',
          answer: 'La situación puede regularizarse, pero se complica. Si han pasado más de 90 días desde la caducidad, es necesario analizar las opciones disponibles. Contacta conmigo cuanto antes.',
        },
        {
          question: '¿Puedo renovar aunque haya cambiado de empresa o de trabajo?',
          answer: 'En muchos casos, sí. Depende del tipo de autorización y de la situación laboral actual. Analizamos tu caso para ver la mejor estrategia.',
        },
      ]}
    />
  )
}
