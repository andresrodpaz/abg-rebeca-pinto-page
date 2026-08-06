import type { Metadata } from 'next'
import ArraigoDedicatedPage from '@/components/arraigo-page'

export const metadata: Metadata = {
  title: 'Arraigo Social, Sociolaboral, Familiar, Socioformativo y Segunda Oportunidad | Rebeca Pinto Camacho',
  description:
    'Regulariza tu situación en España a través del arraigo. 5 modalidades: social, sociolaboral, familiar, socioformativo y de segunda oportunidad. Todas permiten trabajar desde el primer día. Asesoramiento en Alcalá de Henares y online.',
}

export default function ArraigoPracticePage() {
  return <ArraigoDedicatedPage />
}
