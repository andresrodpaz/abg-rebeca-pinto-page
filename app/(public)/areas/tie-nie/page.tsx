import type { Metadata } from 'next'
import AreaPageTemplate from '@/components/area-page-template'
import { CreditCard } from 'lucide-react'

export const metadata: Metadata = {
  title: 'TIE y NIE | Rebeca Pinto Camacho',
  description:
    'Obtén o renueva tu TIE o NIE en España. Asesoramiento especializado en Alcalá de Henares y online.',
}

export default function TieNiePracticePage() {
  return (
    <AreaPageTemplate
      icon={CreditCard}
      eyebrow="Áreas de práctica"
      title="TIE / NIE"
      subtitle="El TIE y el NIE son documentos imprescindibles para vivir, trabajar y relacionarte con la Administración en España. Te ayudo a obtenerlos o renovarlos."
      intro="El NIE (Número de Identidad de Extranjero) es el número de identificación fiscal asignado a los extranjeros en España. Es necesario para casi cualquier gestión: abrir una cuenta bancaria, firmar un contrato, comprar un inmueble, etc. El TIE (Tarjeta de Identidad de Extranjero) es la tarjeta física que acredita la autorización de residencia o estancia y que incluye el NIE. Ambos documentos tienen procedimientos y requisitos distintos según la situación del solicitante, y es importante no confundirlos ni mezclar los trámites."
      requirements={[
        'Pasaporte en vigor o documento de identidad equivalente',
        'Formulario oficial (EX-15 para NIE o específico para TIE)',
        'Justificación de la causa que motiva la solicitud del NIE',
        'Tasa abonada (modelo 790 código 012)',
        'Para el TIE: resolución de concesión de la autorización de residencia',
        'Foto de carné reciente (para el TIE)',
        'Empadronamiento en el municipio de residencia',
        'Cita previa en la Comisaría de Policía o Oficina de Extranjería',
      ]}
      steps={[
        {
          number: 1,
          title: 'Identificamos qué documento necesitas',
          description: 'Determinamos si necesitas solo el NIE o también el TIE, y cuál es el procedimiento aplicable a tu situación concreta.',
        },
        {
          number: 2,
          title: 'Preparamos la documentación',
          description: 'Rellenamos los formularios, calculamos las tasas y recopilamos todos los documentos necesarios para la cita.',
        },
        {
          number: 3,
          title: 'Gestión de la cita previa',
          description: 'Gestionamos la solicitud de cita previa y, si lo prefieres, podemos acompañarte o representarte en la gestión.',
        },
        {
          number: 4,
          title: 'Seguimiento hasta la obtención del documento',
          description: 'Comprobamos que el trámite se complete correctamente y te informamos de cada paso hasta que tengas tu TIE o NIE en mano.',
        },
      ]}
      faqs={[
        {
          question: '¿Qué diferencia hay entre el NIE y el TIE?',
          answer: 'El NIE es únicamente el número de identificación (aparece en el certificado de NIE). El TIE es la tarjeta física que incluye el NIE y acredita la residencia legal en España. Son trámites distintos con formularios y tasas diferentes.',
        },
        {
          question: '¿Puedo solicitar el NIE siendo turista?',
          answer: 'Sí, siempre que puedas acreditar una razón económica, profesional o social que justifique su solicitud (compra de un inmueble, firma de contratos, etc.).',
        },
        {
          question: '¿Cada cuánto hay que renovar el TIE?',
          answer: 'El TIE se renueva al renovar la autorización de residencia. Si tienes una residencia temporal, generalmente se renueva cada 2 años.',
        },
        {
          question: '¿Cuánto tarda en expedirse el TIE?',
          answer: 'Una vez presentada la solicitud, el TIE suele estar listo en un plazo de 4 a 6 semanas, aunque puede variar según la carga de trabajo de la Comisaría.',
        },
      ]}
    />
  )
}
