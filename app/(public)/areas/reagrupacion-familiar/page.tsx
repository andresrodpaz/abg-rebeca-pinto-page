import type { Metadata } from 'next'
import AreaPageTemplate from '@/components/area-page-template'
import { Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reagrupación Familiar | Rebeca Pinto Camacho',
  description:
    'Reúnete con tu familia en España. Asesoramiento especializado en reagrupación familiar en Alcalá de Henares y online.',
}

export default function ReagrupacionPracticePage() {
  return (
    <AreaPageTemplate
      icon={Users}
      eyebrow="Áreas de práctica"
      title="Reagrupación familiar"
      subtitle="Reúnete con tus seres queridos en España. Te guiamos en cada requisito para que el proceso sea lo más rápido y seguro posible."
      intro="La reagrupación familiar permite a los extranjeros residentes en España reunirse con determinados familiares: cónyuge o pareja de hecho, hijos menores de edad o mayores incapacitados, ascendientes y, en ciertos casos, otros familiares a cargo. Para solicitar la reagrupación, el reagrupante debe acreditar residencia legal, vivienda adecuada y medios económicos suficientes para atender a los familiares reagrupados. Una vez concedida la autorización, los familiares deben solicitar el visado en el consulado español de su país de residencia."
      requirements={[
        'Autorización de residencia en vigor del reagrupante',
        'Vivienda adecuada en España (informe del Ayuntamiento)',
        'Medios económicos suficientes según el número de familiares a reagrupar',
        'Documentos que acrediten el vínculo familiar apostillados y traducidos',
        'Carencia de antecedentes penales en España y en el país de origen',
        'Para menores: libro de familia o certificado de nacimiento apostillado',
        'Para cónyuge: certificado de matrimonio apostillado',
        'Seguro médico público o privado para los familiares reagrupados',
      ]}
      steps={[
        {
          number: 1,
          title: 'Verificación de requisitos del reagrupante',
          description: 'Comprobamos que tienes los requisitos de residencia, vivienda y medios económicos necesarios para iniciar el proceso.',
        },
        {
          number: 2,
          title: 'Preparación del expediente',
          description: 'Recopilamos todos los documentos necesarios, gestionamos las apostillas y traducciones y solicitamos el informe de vivienda.',
        },
        {
          number: 3,
          title: 'Presentación ante la Oficina de Extranjería',
          description: 'Presentamos la solicitud de reagrupación familiar y respondemos cualquier requerimiento adicional.',
        },
        {
          number: 4,
          title: 'Gestión del visado consular',
          description: 'Una vez concedida la autorización, orientamos a tus familiares sobre cómo solicitar el visado en el consulado y qué documentación aportar.',
        },
      ]}
      faqs={[
        {
          question: '¿Cuánto tiempo de residencia necesito para reagrupar a mi familia?',
          answer: 'En general, debes contar con al menos 1 año de residencia legal y tener renovada o en trámite tu autorización de residencia por al menos otro año más.',
        },
        {
          question: '¿Puedo reagrupar a mis padres?',
          answer: 'Sí, es posible reagrupar a ascendientes en primer grado (padres) si están a tu cargo y si el reagrupante tiene residencia de larga duración, o en ciertos casos especiales.',
        },
        {
          question: '¿Los familiares reagrupados pueden trabajar en España?',
          answer: 'Sí. Los familiares reagrupados obtienen una autorización de residencia y trabajo, por lo que pueden trabajar en España por cuenta ajena o propia.',
        },
        {
          question: '¿Qué pasa si se deniega la reagrupación?',
          answer: 'Cabe recurso de alzada o recurso contencioso-administrativo. Analizamos la causa de la denegación y estudiamos las opciones disponibles.',
        },
      ]}
    />
  )
}
