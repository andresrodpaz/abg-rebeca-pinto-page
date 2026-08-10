import type { Metadata } from 'next'
import ArraigoDedicatedPage from '@/components/arraigo-page'

export const metadata: Metadata = {
  title: 'Arraigo en España | Rebeca Pinto Camacho',
  description:
    'Regulariza tu situación en España a través del arraigo. 5 modalidades: sociolaboral, social, socioformativo, familiar y de segunda oportunidad. Conforme al nuevo Reglamento de Extranjería (R.D. 1155/2024). Asesoramiento en Alcalá de Henares y online.',
}


export default function ArraigoPracticePage() {
  return <ArraigoDedicatedPage />
}
