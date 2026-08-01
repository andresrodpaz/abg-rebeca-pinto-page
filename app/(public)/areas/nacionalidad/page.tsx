import type { Metadata } from 'next'
import AreaPageTemplate from '@/components/area-page-template'
import { Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nacionalidad Española | Rebeca Pinto Camacho',
  description:
    'Obtén la nacionalidad española por residencia, carta de naturaleza u otras vías. Asesoramiento especializado en Alcalá de Henares y online.',
}

export default function NacionalidadPracticePage() {
  return (
    <AreaPageTemplate
      icon={Star}
      eyebrow="Áreas de práctica"
      title="Nacionalidad española"
      subtitle="Adquiere la nacionalidad española y consolida tu futuro en España. Analizamos tu vía más favorable y preparamos un expediente sin fisuras."
      intro="La vía más habitual para obtener la nacionalidad española es la residencia legal y continuada en España durante 10 años (reducible a 5, 2 o 1 año según el origen y las circunstancias personales). El proceso implica superar las pruebas del CCSE e idioma español (salvo excepciones), acreditar una integración social suficiente y no tener antecedentes penales. Tramitar correctamente todos los documentos y preparar el expediente de forma exhaustiva marca la diferencia entre una resolución favorable y una denegación."
      requirements={[
        'Residencia legal y continuada en España durante el período exigido',
        'Superar las pruebas del CCSE (cultura y sociedad española) y DELE A2 o superior',
        'Pasaporte y NIE/TIE en vigor',
        'Certificado de nacimiento apostillado y traducido',
        'Certificado de antecedentes penales del país de origen apostillado',
        'Carencia de antecedentes penales en España',
        'Registro civil actualizado (certificado de empadronamiento)',
        'Acreditar integración en la sociedad española',
      ]}
      steps={[
        {
          number: 1,
          title: 'Evaluación de la vía y plazo aplicable',
          description: 'Revisamos tu historial de residencia y tu situación personal para determinar el plazo que te corresponde (10, 5, 2 o 1 año) y la documentación necesaria.',
        },
        {
          number: 2,
          title: 'Preparación del expediente completo',
          description: 'Recopilamos, apostillamos y traducimos cada documento. Nos encargamos de verificar que todo cumple los requisitos del Ministerio de Justicia.',
        },
        {
          number: 3,
          title: 'Presentación de la solicitud',
          description: 'Presentamos la solicitud de forma telemática a través del MJC, con toda la documentación correctamente adjuntada.',
        },
        {
          number: 4,
          title: 'Seguimiento y atención de requerimientos',
          description: 'Monitorizamos el expediente, respondemos cualquier requerimiento adicional y te preparamos para la jura de la Constitución.',
        },
      ]}
      faqs={[
        {
          question: '¿Cuánto tiempo tarda en resolverse la nacionalidad por residencia?',
          answer: 'El plazo puede oscilar entre 1 y 3 años según la carga de trabajo del Ministerio de Justicia. Es fundamental presentar un expediente completo para evitar retrasos.',
        },
        {
          question: '¿Tengo que renunciar a mi nacionalidad de origen?',
          answer: 'Depende de tu país de origen y del convenio de doble nacionalidad que España haya suscrito con él. Iberoamericanos, filipinos, andorranos y otros nacionales pueden mantener la doble nacionalidad.',
        },
        {
          question: '¿Qué pasa si suspendo el CCSE o el DELE?',
          answer: 'Puedes volver a examinarte. No afecta al plazo de residencia ya acumulado. Te ayudo a prepararte para las pruebas.',
        },
        {
          question: '¿Puedo solicitar la nacionalidad desde fuera de España?',
          answer: 'La solicitud puede presentarse de forma telemática, pero generalmente se requiere la residencia efectiva en España durante el período exigido.',
        },
      ]}
    />
  )
}
