import type { Metadata } from 'next'
import AreaPageTemplate from '@/components/area-page-template'
import { UserCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Arraigo Social, Laboral y Familiar | Rebeca Pinto Camacho',
  description:
    'Regulariza tu situación en España a través del arraigo social, laboral o familiar. Asesoramiento personalizado en Alcalá de Henares y online.',
}

export default function ArraigoPracticePage() {
  return (
    <AreaPageTemplate
      icon={UserCheck}
      eyebrow="Áreas de práctica"
      title="Arraigo"
      subtitle="Regulariza tu situación migratoria en España a través del arraigo social, laboral o familiar. Te acompaño en cada paso del proceso."
      intro="El arraigo es una de las vías más utilizadas para regularizar la situación irregular en España. Existen tres modalidades: arraigo social (3 años de permanencia y vínculos sociales), arraigo laboral (2 años de permanencia con relación laboral demostrable) y arraigo familiar (para cónyuge o ascendiente en primer grado de un ciudadano español). Cada modalidad tiene sus propios requisitos y documentación específica, por lo que es fundamental contar con asesoramiento especializado para presentar un expediente sólido."
      requirements={[
        'Permanencia continuada en España (2 o 3 años según modalidad)',
        'Pasaporte o documento de identidad en vigor',
        'Empadronamiento en el municipio de residencia',
        'Informe de arraigo social emitido por el Ayuntamiento (arraigo social)',
        'Contrato de trabajo o acreditación de actividad laboral (arraigo laboral)',
        'Certificado de parentesco con ciudadano/a español/a (arraigo familiar)',
        'Carencia de antecedentes penales en España y en el país de origen',
        'Medios económicos suficientes o contrato de trabajo',
      ]}
      steps={[
        {
          number: 1,
          title: 'Consulta inicial y análisis del caso',
          description: 'Estudiamos tu situación, los años de permanencia acreditables y qué modalidad de arraigo es la más adecuada para ti.',
        },
        {
          number: 2,
          title: 'Recopilación de documentación',
          description: 'Te indicamos exactamente qué documentos necesitas y cómo obtenerlos. Revisamos cada documento antes de presentar el expediente.',
        },
        {
          number: 3,
          title: 'Preparación y presentación de la solicitud',
          description: 'Redactamos y presentamos la solicitud ante la Oficina de Extranjería correspondiente, asegurándonos de que todo esté en regla.',
        },
        {
          number: 4,
          title: 'Seguimiento del expediente',
          description: 'Te informamos de cualquier novedad, respondemos requerimientos de documentación adicional y te preparamos para la entrevista si es necesaria.',
        },
      ]}
      faqs={[
        {
          question: '¿Cuánto tiempo tarda en resolverse el arraigo?',
          answer: 'El plazo legal de resolución es de 3 meses, aunque en la práctica puede prolongarse entre 3 y 6 meses según la carga de trabajo de la Oficina de Extranjería. Durante ese tiempo te mantengo informada.',
        },
        {
          question: '¿Puedo trabajar mientras espero la resolución del arraigo?',
          answer: 'Una vez presentada la solicitud, puedes solicitar la tarjeta de "en trámite", que te habilita para trabajar mientras se resuelve el expediente.',
        },
        {
          question: '¿Qué pasa si me deniegan el arraigo?',
          answer: 'Cabe interponer un recurso de alzada o un recurso contencioso-administrativo. Analizamos las causas de la denegación y te recomendamos la mejor estrategia.',
        },
        {
          question: '¿Qué vigencia tiene la autorización de arraigo?',
          answer: 'La autorización de arraigo tiene una vigencia inicial de 2 años, tras la cual puede renovarse por períodos de 2 años hasta obtener la residencia de larga duración.',
        },
      ]}
    />
  )
}
