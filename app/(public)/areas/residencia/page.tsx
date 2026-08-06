import type { Metadata } from 'next'
import ResidenciaClientPage from './_client'

export const metadata: Metadata = {
  title: 'Tipos de Residencia en España: Temporal y Larga Duración | Rebeca Pinto Camacho',
  description:
    'Guía completa sobre los tipos de autorización de residencia en España: residencia temporal (no lucrativa, trabajo, arraigo, reagrupación, estudiante) y residencia de larga duración (indefinida, tras 5 años). Asesoramiento en Alcalá de Henares y online.',
}

export default function ResidenciaPage() {
  return <ResidenciaClientPage />
}
