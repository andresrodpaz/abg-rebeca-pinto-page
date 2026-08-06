import type { Metadata } from 'next'
import VisadosDedicatedPage from '@/components/visados-page'

export const metadata: Metadata = {
  title: 'Visados de estudios, trabajo, reagrupación, nómada digital y más | Rebeca Pinto Camacho',
  description:
    'Asesoramiento en visados para España: estudios, trabajo por cuenta ajena o propia, reagrupación familiar, residencia no lucrativa, nómada digital, investigador y emprendedor. Especializada en derecho de extranjería en Alcalá de Henares y online.',
}

export default function VisadosPracticePage() {
  return <VisadosDedicatedPage />
}
