import type { Metadata } from 'next'
import AreaPageTemplate from '@/components/area-page-template'
import { Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Visados | Rebeca Pinto Camacho',
  description:
    'Asesoramiento en visados de trabajo, estudio, pareja de hecho y otros. Especializada en derecho de extranjería en Alcalá de Henares y online.',
}

export default function VisadosPracticePage() {
  return (
    <AreaPageTemplate
      icon={Globe}
      eyebrow="Áreas de práctica"
      title="Visados"
      subtitle="El visado es la puerta de entrada a España. Te asesoro sobre el tipo de visado que necesitas y cómo conseguirlo con éxito."
      intro="Existen múltiples tipos de visados para entrar a España: visado de trabajo (incluido el visado de búsqueda de empleo), visado de estudios, visado de reagrupación familiar, visado de pareja de hecho, visado de emprendimiento y el visado para nómadas digitales, entre otros. Cada tipo tiene sus propios requisitos, documentación y plazos de resolución. La solicitud se realiza en el consulado español del país de residencia, por lo que es crucial preparar el expediente correctamente antes de acudir a la cita consular."
      requirements={[
        'Pasaporte en vigor con al menos 6 meses de validez',
        'Formulario de solicitud de visado debidamente cumplimentado',
        'Justificante del motivo del visado (contrato, carta de admisión, etc.)',
        'Medios económicos suficientes para el período de estancia',
        'Seguro médico con cobertura en España',
        'Certificado de antecedentes penales del país de origen apostillado',
        'Fotografía reciente en formato carné',
        'Tasa consular abonada',
      ]}
      steps={[
        {
          number: 1,
          title: 'Identificación del tipo de visado más adecuado',
          description: 'Analizamos tu situación y objetivo para determinar qué tipo de visado se ajusta mejor a tu caso y qué documentación necesitas reunir.',
        },
        {
          number: 2,
          title: 'Preparación completa del expediente',
          description: 'Recopilamos, apostillamos y traducimos todos los documentos, y revisamos que el expediente sea sólido antes de la cita consular.',
        },
        {
          number: 3,
          title: 'Asesoramiento para la cita en el consulado',
          description: 'Te preparamos para la entrevista consular, si es necesaria, y resolvemos cualquier duda sobre el proceso.',
        },
        {
          number: 4,
          title: 'Seguimiento post-entrada a España',
          description: 'Una vez en España, te asesoramos sobre los pasos a seguir: alta en la Seguridad Social, obtención del TIE, empadronamiento, etc.',
        },
      ]}
      faqs={[
        {
          question: '¿Cuánto tiempo tarda en resolverse un visado de trabajo?',
          answer: 'Los visados de trabajo suelen resolverse en 1 a 3 meses desde la solicitud en el consulado, aunque puede variar según el tipo de visado y el consulado correspondiente.',
        },
        {
          question: '¿Puedo solicitar el visado de emprendimiento si tengo un proyecto de negocio?',
          answer: 'Sí. El visado de emprendimiento (Ley de Startups) está diseñado para emprendedores innovadores. Requiere un informe favorable de ENISA u otro organismo acreditado.',
        },
        {
          question: '¿Qué es el visado para nómadas digitales?',
          answer: 'Es un permiso que permite vivir en España trabajando de forma remota para empresas o clientes ubicados fuera de España. Tiene requisitos específicos de ingresos mínimos y actividad profesional.',
        },
        {
          question: '¿El visado me da derecho a trabajar inmediatamente?',
          answer: 'Depende del tipo de visado. El visado de trabajo habilita para trabajar desde la llegada. Otros visados (turismo, estudios parciales) pueden tener restricciones laborales.',
        },
      ]}
    />
  )
}
