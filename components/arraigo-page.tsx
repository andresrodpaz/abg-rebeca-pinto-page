'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, CheckCircle, Phone, ChevronDown, UserCheck, AlertTriangle, Info } from 'lucide-react'
import { site } from '@/lib/site'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface Modalidad {
  id: string
  title: string
  badge: string
  description: string
  /** General requirements shared across all arraigos */
  requirements: string[]
  /** Extra requirements specific to this arraigo */
  specificRequirements: string[]
  notes?: string[]
  workPermit: string
  vigencia: string
  permanencia: string
  faqs: { question: string; answer: string }[]
}

// ─────────────────────────────────────────────────────────────────────────────
// Data — actualizado conforme al Real Decreto 1155/2024
// ─────────────────────────────────────────────────────────────────────────────

const REQUISITOS_GENERALES = [
  'Encontrarse en España y NO tener la condición de solicitante de protección internacional en el momento de la presentación de la solicitud ni durante su tramitación.',
  'Haber permanecido en territorio nacional de forma continuada durante, al menos, los 2 años anteriores a la presentación de la solicitud. (Las ausencias no pueden superar los 90 días en ese período de 2 años.)',
  'No representar una amenaza para el orden público, la seguridad o la salud pública.',
  'Carecer de antecedentes penales en España y en los países donde se haya residido durante los 5 últimos años, por delitos previstos en el ordenamiento jurídico español.',
  'No figurar como rechazable en países con los que España tenga firmado convenio en ese sentido.',
  'No encontrarse dentro del plazo de compromiso de no retorno a España.',
  'Haber abonado la tasa por la tramitación del procedimiento.',
  'No ser titular de una autorización de estancia o residencia vigente ni tener en trámite ningún procedimiento de concesión, prórroga, renovación o modificación de autorizaciones de estancia o residencia.',
]

const MODALIDADES: Modalidad[] = [
  {
    id: 'sociolaboral',
    title: 'Arraigo Sociolaboral',
    badge: 'Para trabajadores',
    description:
      'Permite obtener residencia mediante la aportación de uno o varios contratos de trabajo que garanticen al menos 20 horas semanales. No hace falta informe de inserción ni contrato indefinido.',
    requirements: REQUISITOS_GENERALES,
    specificRequirements: [
      'Aportación de uno o varios contratos de trabajo (cualquier modalidad prevista en la normativa laboral).',
      'El contrato o la suma de contratos debe representar una jornada semanal no inferior a 20 horas en cómputo global.',
      'El salario debe ser proporcional a la jornada trabajada (no es necesario llegar al SMI completo).',
      'Si es de duración determinada, el contrato o la suma de contratos debe superar los 90 días.',
      'Se admiten varios contratos con distintos empleadores (trabajos estacionales o simultáneos).',
      'El empleador debe estar al corriente de obligaciones tributarias y con la Seguridad Social.',
    ],
    notes: [
      'No se requiere ningún informe de inserción social.',
      'No es necesario que el contrato sea indefinido.',
    ],
    workPermit: 'Sí. Desde el primer día de la autorización, por cuenta ajena o propia, sin restricción de sector ni provincia.',
    vigencia: '1 año (prorrogable 1 año adicional).',
    permanencia: '2 años continuados en España.',
    faqs: [
      {
        question: '¿Puedo aportar varios contratos de distintos empleadores?',
        answer:
          'Sí. Se admiten varios contratos con distintos empleadores si los trabajos son de naturaleza estacional o actividades simultáneas en la misma o distinta ocupación. Lo importante es que la suma de horas alcance las 20 h/semana.',
      },
      {
        question: '¿El contrato tiene que ser indefinido?',
        answer:
          'No. Se admite cualquier modalidad de contrato prevista en la normativa laboral, incluidos temporales y fijos discontinuos. Si el contrato es de duración determinada, debe superar los 90 días.',
      },
      {
        question: '¿Necesito llegar al Salario Mínimo Interprofesional?',
        answer:
          'No exactamente. El salario debe ser proporcional a la jornada trabajada, conforme al convenio colectivo aplicable. Si trabajas a jornada parcial, el salario se calcula en proporción.',
      },
      {
        question: '¿Se requiere informe de la comunidad autónoma?',
        answer:
          'No. El arraigo sociolaboral no requiere ningún informe de inserción social. La acreditación se sustituye por la oferta de empleo.',
      },
      {
        question: '¿Puedo prorrogar la autorización?',
        answer:
          'Sí. La prórroga tiene vigencia de 1 año y requiere acreditar que se está en búsqueda activa de empleo e inscrito en el servicio público de empleo. Puede solicitarse en los 2 meses previos a la expiración o en los 3 meses posteriores (con posible expediente sancionador en este último caso).',
      },
    ],
  },
  {
    id: 'social',
    title: 'Arraigo Social',
    badge: 'Vínculos o integración',
    description:
      'Para quienes tienen familiares directos titulares de residencia en España, o que acreditan esfuerzo de integración mediante informe de la comunidad autónoma y medios económicos propios.',
    requirements: REQUISITOS_GENERALES,
    specificRequirements: [
      'Tener vínculos familiares con personas extranjeras titulares de autorización de residencia (cónyuge, pareja de hecho registrada, o familiares en primer grado en línea directa); O',
      'En su defecto, acreditar el esfuerzo de integración mediante informe de la comunidad autónoma.',
      'Si no hay vínculos familiares: acreditar medios económicos propios suficientes (100% del IPREM mensual para la persona solicitante).',
      'Los medios económicos deben estar disponibles en España y pueden provenir de familiares convivientes (cónyuge, pareja o familiares de primer grado).',
    ],
    notes: [
      'Medios económicos: 100% del IPREM por persona (IPREM mensual 2025: 600 €). Si hay un familiar con vínculo + la persona solicitante → 100% + 100% IPREM.',
      'Los menores hijos de extranjeros residentes tienen autorización específica en el Título IX del Reglamento — no solicitan arraigo social.',
    ],
    workPermit: 'No de forma automática. La autorización de arraigo social no incluye permiso de trabajo en todos los supuestos; consultar el caso concreto.',
    vigencia: '1 año (prorrogable 1 año adicional).',
    permanencia: '2 años continuados en España.',
    faqs: [
      {
        question: '¿Qué familiares directos cuentan para el arraigo social?',
        answer:
          'Exclusivamente el cónyuge, la pareja de hecho registrada y los familiares en primer grado en línea directa (padres e hijos), siempre que sean titulares de una autorización de residencia en vigor.',
      },
      {
        question: '¿Qué es el informe de inserción social?',
        answer:
          'Es un informe emitido por la comunidad autónoma donde resides que valora tu integración: tiempo de empadronamiento, conocimiento del idioma, vínculos con el entorno, situación laboral o formativa, etc. Solo es necesario si no tienes vínculos familiares con residentes.',
      },
      {
        question: '¿Cómo acredito los medios económicos?',
        answer:
          'Debes demostrar que cuentas con al menos el 100% del IPREM mensual (600 € aprox.) para tu mantenimiento. Pueden provenir de tus propios ingresos o de familiares convivientes (cónyuge, pareja o familiares de primer grado). Los medios deben estar disponibles en España.',
      },
      {
        question: '¿Puedo solicitar arraigo social y autorización para mi hijo menor al mismo tiempo?',
        answer:
          'Sí. El artículo 130 del Reglamento permite la solicitud simultánea del arraigo y de la autorización de menores (regulada en el Título IX), que es la figura específica para menores hijos de extranjeros residentes.',
      },
      {
        question: '¿Cuánto tiempo tarda la resolución?',
        answer:
          'El plazo legal es de 3 meses. En la práctica, según la carga de trabajo de la Oficina de Extranjería, puede alargarse. Un expediente bien preparado minimiza los requerimientos adicionales.',
      },
    ],
  },
  {
    id: 'socioformativo',
    title: 'Arraigo Socioformativo',
    badge: 'Para estudiantes',
    description:
      'Residencia de 1 año para quienes están matriculados en formaciones oficiales regladas: ESO para adultos, FP básica, media o certificados de profesionalidad. Permite trabajar hasta 30 h/semana.',
    requirements: REQUISITOS_GENERALES,
    specificRequirements: [
      'Estar matriculado o cursando alguna de las formaciones recogidas en el art. 52.1.b) y 52.1.e) 5º del RLOEX (ver lista más abajo).',
      'La formación puede ser presencial o semipresencial; si es semipresencial, al menos el 50% debe ser presencial.',
      'Si la matrícula tiene plazo oficial: presentar solicitud en los 2 meses anteriores al inicio del plazo, aportando la solicitud de admisión.',
      'La prueba de matrícula debe entregarse en la Oficina de Extranjería en un plazo de 3 meses desde la resolución de concesión.',
      'También es válida la formación promovida por los Servicios Públicos de Empleo orientada a ocupaciones del catálogo de difícil cobertura (art. 75.1), aportando compromiso de realización.',
    ],
    notes: [
      'Formaciones válidas (art. 52.1.b): Bachillerato, Ciclo Formativo de Grado Medio de FP, Enseñanzas Artísticas de Grado Medio, Enseñanzas Deportivas de Grado Medio, Enseñanzas Artísticas profesionales de música y danza, Curso de especialización de FP.',
      'Formaciones válidas (art. 52.1.e) 5º: Certificado profesional Nivel 1, 2 y 3.',
      'Formaciones exclusivas de arraigo socioformativo: Enseñanzas Iniciales (2 cursos), ESO para adultos (ESPA, 2 cursos), Ciclos Formativos de Grado Básico de FP.',
      'Las prácticas obligatorias de educación secundaria postobligatoria cuentan como formación válida.',
      'Se puede trabajar por cuenta ajena hasta 30 horas semanales durante la vigencia del arraigo.',
      'Informe de integración requerido (a diferencia del anterior "arraigo para la formación").',
    ],
    workPermit: 'Sí, por cuenta ajena, con un máximo de 30 horas semanales en cómputo global.',
    vigencia: '1 año.',
    permanencia: '2 años continuados en España.',
    faqs: [
      {
        question: '¿Qué estudios son válidos para el arraigo socioformativo?',
        answer:
          'Los recogidos en el art. 52.1.b) (bachillerato, FP media, enseñanzas artísticas y deportivas de grado medio, especialización FP) y art. 52.1.e) 5º (certificados de profesionalidad nivel 1, 2 y 3). También son exclusivos de este arraigo: Enseñanzas Iniciales, ESO para adultos (ESPA) y Ciclos Formativos de Grado Básico de FP.',
      },
      {
        question: '¿Qué pasa si me matriculo en una formación distinta a la prevista?',
        answer:
          'No es causa automática de denegación, siempre que esté debidamente justificado y la nueva formación cumpla los requisitos válidos para este arraigo.',
      },
      {
        question: '¿Puedo trabajar con el arraigo socioformativo?',
        answer:
          'Sí. Puedes trabajar por cuenta ajena hasta un máximo de 30 horas semanales. Es una de las modalidades más ventajosas para quienes quieren combinar trabajo y formación.',
      },
      {
        question: '¿Cuándo puedo presentar la solicitud?',
        answer:
          'Si ya estás matriculado, en cualquier momento. Si el plazo de matrícula no ha abierto, puedes presentar la solicitud en los 2 meses anteriores al inicio del plazo, aportando la solicitud de admisión. Si el plazo expiró pero hay plazas y eres admitido, puedes solicitarlo con la prueba de matrícula.',
      },
      {
        question: '¿Cómo se prorroga este arraigo?',
        answer:
          'La prórroga está condicionada a un informe del centro que certifique la promoción al segundo curso (ciclos de grado básico o medio). Si terminaste la formación antes de finalizar el año, debes aportar el título o certificado y acreditar búsqueda activa de empleo inscrito en el servicio público de empleo.',
      },
    ],
  },
  {
    id: 'familiar',
    title: 'Arraigo Familiar',
    badge: 'Familiares de ciudadanos UE',
    description:
      'Para padres, madres o tutores de menores nacionales de otro Estado miembro de la UE, del EEE o de Suiza, y para quienes presten apoyo a una persona con discapacidad de esos países. Vigencia de 5 años. No exige permanencia mínima.',
    requirements: REQUISITOS_GENERALES.filter((_, i) => i !== 1), // Sin permanencia mínima
    specificRequirements: [
      'Supuesto 1 — Menor UE/EEE/Suiza: Ser padre, madre o tutor de un menor nacional de otro Estado miembro de la UE, del EEE o de Suiza, conviviendo con él o estando al corriente de las obligaciones paternofiliales.',
      'Supuesto 2 — Persona con discapacidad UE/EEE/Suiza: Ser familiar y prestar apoyo a una persona con discapacidad nacional de otro Estado miembro de la UE, del EEE o de Suiza, teniéndola a cargo y conviviendo con ella.',
      'Acreditar residencia en territorio nacional en el momento de la solicitud.',
    ],
    notes: [
      '⚠️ IMPORTANTE: Si el solicitante es padre, madre o tutor de un MENOR ESPAÑOL, NO puede solicitar arraigo familiar. Desde el R.D. 1155/2024 existe una figura específica: "Residencia temporal de familiares de personas con nacionalidad española". El arraigo familiar queda reservado exclusivamente para familiares de nacionales de otro Estado UE/EEE/Suiza.',
      'Este arraigo NO exige permanencia mínima en España, a diferencia del resto de modalidades.',
      'Vigencia de 5 años (frente al 1 año general del resto de arraigos).',
    ],
    workPermit: 'Según la autorización resultante. Consultar el caso concreto.',
    vigencia: '5 años.',
    permanencia: 'No exige permanencia mínima.',
    faqs: [
      {
        question: '¿El arraigo familiar es para padres de hijos españoles?',
        answer:
          'No. Desde el Real Decreto 1155/2024, el arraigo familiar está reservado exclusivamente para familiares de nacionales de otro Estado miembro de la UE, del EEE o de Suiza. Si tu hijo es español, debes solicitar la "Residencia temporal de familiares de personas con nacionalidad española", que es una figura diferente.',
      },
      {
        question: '¿Es necesario acreditar años de permanencia?',
        answer:
          'No. El arraigo familiar es la única modalidad de arraigo que no exige permanencia mínima continuada en España. El vínculo familiar con el nacional comunitario es el requisito principal.',
      },
      {
        question: '¿Qué vigencia tiene este arraigo?',
        answer:
          'La autorización de arraigo familiar tiene una vigencia de 5 años, a diferencia del resto de modalidades que tienen 1 año. No requiere prórroga anual.',
      },
      {
        question: '¿Se requiere convivencia con el menor o persona con discapacidad?',
        answer:
          'Sí. Para el supuesto del menor, debes convivir con él o estar al corriente de las obligaciones paternofiliales. Para el supuesto de la persona con discapacidad, debes convivir con ella y tenerla a cargo.',
      },
      {
        question: '¿Qué documentación necesito?',
        answer:
          'Certificado de nacimiento del menor o de la situación de discapacidad de la persona, documentación que acredite la nacionalidad comunitaria, documentación que acredite la convivencia o la relación de tutela/cuidado, y empadronamiento en España.',
      },
    ],
  },
  {
    id: 'segunda-oportunidad',
    title: 'Arraigo de Segunda Oportunidad',
    badge: 'Renovación frustrada',
    description:
      'Para quienes tuvieron una autorización de residencia (no de estancia) en España y no pudieron renovarla —por expiración del plazo o denegación por incumplimiento de requisitos— por motivos distintos al orden público, seguridad o salud pública.',
    requirements: REQUISITOS_GENERALES,
    specificRequirements: [
      'Haber sido titular de una autorización de RESIDENCIA (no de estancia) en los 2 años inmediatamente anteriores a la fecha de solicitud.',
      'Que la no renovación se haya producido por: (a) expiración del plazo previsto para su solicitud, o (b) denegación por incumplimiento de requisitos.',
      'La autorización anterior NO debe haber sido otorgada por circunstancias excepcionales.',
      'La no renovación NO debe haberse producido por motivos de orden público, seguridad o salud pública (salvo sobreseimiento o absolución de la pena).',
    ],
    notes: [
      'No da acceso a este arraigo: Autorizaciones de estancia de larga duración por estudios (se requiere residencia, no estancia).',
      'No da acceso: Autorizaciones concedidas bajo R.D. 240/2007 (régimen ciudadanos UE/EEE) — en ese caso corresponde solicitar residencia permanente.',
      'No da acceso: Extinción de la autorización de residencia de larga duración (art. 201) — para esos casos existe el procedimiento de recuperación de residencia de larga duración (arts. 186 a 189).',
    ],
    workPermit: 'Según la autorización resultante. Consultar el caso concreto.',
    vigencia: '1 año (prorrogable 1 año adicional).',
    permanencia: '2 años continuados en España.',
    faqs: [
      {
        question: '¿Qué razones permiten acceder al arraigo de segunda oportunidad?',
        answer:
          'Que la autorización de residencia no se renovara por expiración del plazo para solicitarla, o por denegación ante el incumplimiento de algún requisito. Lo fundamental es que la causa no sea un motivo de orden público, seguridad o salud pública.',
      },
      {
        question: '¿Vale cualquier tipo de autorización previa?',
        answer:
          'No. Debe ser una autorización de residencia, no de estancia. Las autorizaciones de estancia de larga duración por estudios no son válidas. Tampoco dan acceso las autorizaciones bajo el R.D. 240/2007 (ciudadanos comunitarios), que tiene su propio procedimiento.',
      },
      {
        question: '¿Cuánto tiempo debo llevar en España?',
        answer:
          'Los requisitos generales de arraigo exigen 2 años de permanencia continuada. Debes acreditar tanto el período con autorización previa como el período posterior sin ella mediante empadronamiento, contratos, recibos u otros documentos.',
      },
      {
        question: '¿Puedo prorrogar la autorización?',
        answer:
          'Sí. La prórroga tiene vigencia de 1 año y requiere acreditar que se está en búsqueda activa de empleo e inscrito en el servicio público de empleo. Puede solicitarse en los 2 meses previos a la expiración o dentro de los 3 meses posteriores (con posible expediente sancionador).',
      },
      {
        question: '¿Qué pasa si tuve una expulsión?',
        answer:
          'Si hay antecedentes de expulsión o devolución, el análisis del caso es más complejo. Es fundamental consultar con un profesional antes de presentar ninguna solicitud, ya que puede haber restricciones o plazos de compromiso de no retorno que impidan la solicitud.',
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────
function FAQ({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-2 mt-6">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="border rounded-lg overflow-hidden transition-all duration-200"
          style={{ borderColor: 'oklch(0.638 0.112 68 / 0.25)' }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors duration-200"
            style={{ background: open === i ? 'oklch(0.46 0.066 6 / 0.06)' : 'white' }}
            aria-expanded={open === i}
          >
            <span className="font-sans font-semibold text-sm" style={{ color: 'oklch(0.22 0.005 0)' }}>
              {faq.question}
            </span>
            <ChevronDown
              className="w-4 h-4 shrink-0 transition-transform duration-200"
              style={{
                color: 'oklch(0.46 0.066 6)',
                transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-4 pt-1" style={{ background: 'oklch(0.46 0.066 6 / 0.03)' }}>
              <p className="text-sm font-sans leading-relaxed" style={{ color: 'oklch(0.50 0.010 50)' }}>
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function InfoBox({ children, variant = 'info' }: { children: React.ReactNode; variant?: 'info' | 'warning' }) {
  const isWarning = variant === 'warning'
  return (
    <div
      className="rounded-xl px-5 py-4 flex gap-3"
      style={{
        background: isWarning ? 'oklch(0.90 0.06 60 / 0.12)' : 'oklch(0.46 0.066 6 / 0.06)',
        border: `1px solid ${isWarning ? 'oklch(0.75 0.12 60 / 0.35)' : 'oklch(0.46 0.066 6 / 0.18)'}`,
      }}
    >
      {isWarning
        ? <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'oklch(0.60 0.14 55)' }} />
        : <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'oklch(0.46 0.066 6)' }} />
      }
      <div className="text-sm font-sans leading-relaxed" style={{ color: 'oklch(0.30 0.005 0)' }}>
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function ArraigoDedicatedPage() {
  const [activeTab, setActiveTab] = useState('sociolaboral')
  const active = MODALIDADES.find(m => m.id === activeTab) ?? MODALIDADES[0]

  return (
    <>
      {/* HERO */}
      <section style={{ background: 'oklch(0.46 0.066 6)' }} className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-xs mb-8" style={{ color: 'oklch(0.936 0.022 71 / 0.5)' }}>
            <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: 'oklch(0.638 0.112 68)' }}>Áreas de práctica</span>
          </nav>

          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: 'oklch(0.638 0.112 68 / 0.18)' }}>
              <UserCheck className="w-7 h-7" style={{ color: 'oklch(0.638 0.112 68)' }} />
            </div>
            <div>
              <p className="eyebrow mb-2" style={{ color: 'oklch(0.638 0.112 68 / 0.75)' }}>Áreas de práctica</p>
              <h1 className="display-lg text-2xl md:text-4xl mt-1 mb-4 text-balance" style={{ color: 'oklch(0.936 0.022 71)' }}>
                Arraigo en España
              </h1>
              <span className="gold-divider mb-5" aria-hidden="true" />
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'oklch(0.936 0.022 71 / 0.70)' }}>
                El arraigo es la principal vía para regularizar la situación irregular en España. Existen{' '}
                <strong style={{ color: 'oklch(0.936 0.022 71)' }}>5 modalidades</strong>, reguladas por el{' '}
                <strong style={{ color: 'oklch(0.638 0.112 68)' }}>Real Decreto 1155/2024</strong>.
                Cada una se adapta a una situación diferente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px" style={{ background: 'oklch(0.638 0.112 68)' }} aria-hidden="true" />

      {/* TAB NAV */}
      <div style={{ background: 'oklch(0.900 0.024 71)', borderColor: 'oklch(0.638 0.112 68 / 0.20)' }} className="sticky top-[64px] z-30 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto -mb-px">
            {MODALIDADES.map(m => (
              <button
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className="relative flex-shrink-0 px-4 py-4 text-xs font-sans font-semibold transition-colors duration-200 whitespace-nowrap border-b-2"
                style={{
                  color: activeTab === m.id ? 'oklch(0.46 0.066 6)' : 'oklch(0.50 0.010 50)',
                  borderBottomColor: activeTab === m.id ? 'oklch(0.46 0.066 6)' : 'transparent',
                  letterSpacing: '0.01em',
                }}
              >
                {m.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <section className="py-14 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">

              {/* Modalidad header */}
              <div>
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h2 className="display text-xl text-charcoal">{active.title}</h2>
                  <span
                    className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ background: 'oklch(0.638 0.112 68 / 0.14)', color: 'oklch(0.46 0.005 68)' }}
                  >
                    {active.badge}
                  </span>
                </div>
                <span className="gold-divider mb-5 block" />
                <p className="text-warm-gray leading-relaxed">{active.description}</p>

                {/* Vigencia + permanencia pills */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <div className="flex items-center gap-2 bg-cream-dark border border-border rounded-lg px-3 py-2 text-xs font-sans">
                    <span className="font-semibold text-charcoal">Vigencia:</span>
                    <span className="text-warm-gray">{active.vigencia}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-cream-dark border border-border rounded-lg px-3 py-2 text-xs font-sans">
                    <span className="font-semibold text-charcoal">Permanencia mínima:</span>
                    <span className="text-warm-gray">{active.permanencia}</span>
                  </div>
                </div>
              </div>

              {/* Special notes / warnings */}
              {active.notes && active.notes.length > 0 && (
                <div className="space-y-3">
                  {active.notes.map((note, i) => (
                    <InfoBox key={i} variant={note.startsWith('⚠️') ? 'warning' : 'info'}>
                      <span dangerouslySetInnerHTML={{ __html: note.replace('⚠️ ', '') }} />
                    </InfoBox>
                  ))}
                </div>
              )}

              {/* Specific requirements */}
              <div>
                <h3 className="display text-base text-charcoal mb-4">Requisitos específicos</h3>
                <span className="gold-divider mb-5 block" />
                <ul className="space-y-3">
                  {active.specificRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'oklch(0.46 0.066 6)' }} />
                      <span className="text-warm-gray text-sm leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* General requirements accordion */}
              <div>
                <h3 className="display text-base text-charcoal mb-4">Requisitos generales (todos los arraigos)</h3>
                <span className="gold-divider mb-5 block" />
                <ul className="space-y-3">
                  {active.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'oklch(0.638 0.112 68)' }} />
                      <span className="text-warm-gray text-sm leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
                {active.id === 'familiar' && (
                  <div className="mt-3">
                    <InfoBox variant="info">
                      <strong>El arraigo familiar no requiere permanencia mínima en España.</strong>{' '}
                      El resto de requisitos generales sí aplican.
                    </InfoBox>
                  </div>
                )}
              </div>

              {/* Work permit note */}
              <InfoBox>
                <strong>Permiso de trabajo:</strong> {active.workPermit}
              </InfoBox>

              {/* Proceso */}
              <div>
                <h3 className="display text-base text-charcoal mb-4">Cómo trabajamos juntas</h3>
                <span className="gold-divider mb-6 block" />
                <ol className="space-y-5">
                  {[
                    { n: 1, title: 'Consulta inicial y análisis del caso', desc: 'Estudiamos tu situación, los años de permanencia acreditables y confirmamos que cumples los requisitos de esta modalidad.' },
                    { n: 2, title: 'Recopilación de documentación', desc: 'Te indicamos exactamente qué documentos necesitas, cómo obtenerlos y cuáles requieren apostilla o traducción jurada.' },
                    { n: 3, title: 'Preparación y presentación del expediente', desc: 'Preparamos y presentamos la solicitud ante la Oficina de Extranjería, revisando que todo esté correcto antes de entrar.' },
                    { n: 4, title: 'Seguimiento hasta la resolución', desc: 'Te informamos de cualquier novedad, respondemos requerimientos adicionales y te avisamos cuando la autorización esté lista.' },
                  ].map(step => (
                    <li key={step.n} className="flex gap-5">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-cream font-serif font-semibold text-sm shrink-0"
                        style={{ background: 'oklch(0.46 0.066 6)' }}
                      >
                        {step.n}
                      </div>
                      <div>
                        <h4 className="font-sans font-semibold text-charcoal mb-1">{step.title}</h4>
                        <p className="text-warm-gray text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* FAQ específico de la modalidad */}
              <div>
                <h3 className="display text-base text-charcoal mb-4">Preguntas frecuentes — {active.title}</h3>
                <span className="gold-divider mb-2 block" />
                <FAQ faqs={active.faqs} />
              </div>

              {/* FAQ general */}
              <div className="pt-4 border-t" style={{ borderColor: 'oklch(0.638 0.112 68 / 0.25)' }}>
                <h3 className="display text-base text-charcoal mb-4">Preguntas generales sobre el arraigo</h3>
                <span className="gold-divider mb-2 block" />
                <FAQ faqs={[
                  {
                    question: '¿Qué pasa si me deniegan el arraigo?',
                    answer: 'Cabe interponer un recurso de alzada o un recurso contencioso-administrativo. Analizamos las causas de la denegación y te recomendamos la estrategia más adecuada.',
                  },
                  {
                    question: '¿Cuánto tiempo tarda el arraigo en resolverse?',
                    answer: 'El plazo legal es de 3 meses. En la práctica, entre 3 y 6 meses según la Oficina de Extranjería y la carga de trabajo. Presentar un expediente completo y sólido es clave para evitar requerimientos que alargan el proceso.',
                  },
                  {
                    question: '¿Cuánto dura la autorización de arraigo?',
                    answer: 'La regla general es 1 año (prorrogable por 1 año más). El arraigo familiar es la excepción: tiene vigencia de 5 años. Tras el año, puedes modificar la autorización a residencia y trabajo: si llevas menos de 1 año, requiere cumplir los requisitos del art. 74; si llevas más de 1 año, los del art. 80 u 86, con vigencia de 4 años.',
                  },
                  {
                    question: '¿Las ausencias de España interrumpen el cómputo de permanencia?',
                    answer: 'Las ausencias no pueden superar los 90 días en el período de 2 años requerido. Si superas ese límite, el cómputo de permanencia puede verse afectado.',
                  },
                  {
                    question: '¿Puedo solicitar arraigo si soy solicitante de asilo?',
                    answer: 'No. Mientras tengas la condición de solicitante de protección internacional —y hasta que haya resolución firme en sede administrativa y, en su caso, judicial—, no puedes solicitar un arraigo. Tampoco se computa el tiempo de tramitación del asilo para el cómputo de los 2 años de permanencia.',
                  },
                  {
                    question: '¿El arraigo me permite llevar a mi familia a España?',
                    answer: 'Con la primera autorización de arraigo no puedes reagrupar familiares. Una vez tengas al menos un año de residencia legal y reúnas los requisitos económicos y de vivienda, podrás iniciar el proceso de reagrupación familiar.',
                  },
                  {
                    question: '¿Dónde se presenta la solicitud de arraigo?',
                    answer: 'En la Oficina de Extranjería de la provincia donde residas habitualmente.',
                  },
                ]} />
              </div>

              {/* Nota normativa */}
              <div
                className="rounded-xl px-5 py-4 flex gap-3 mt-2"
                style={{
                  background: 'oklch(0.638 0.112 68 / 0.07)',
                  border: '1px solid oklch(0.638 0.112 68 / 0.22)',
                }}
              >

                <div>
                  <p className="text-xs font-sans font-semibold uppercase tracking-wider mb-1" style={{ color: 'oklch(0.46 0.005 68)', letterSpacing: '0.10em' }}>
                    Fuente normativa
                  </p>
                  <p className="text-xs font-sans leading-relaxed" style={{ color: 'oklch(0.50 0.010 50)' }}>
                    La información de esta página refleja la normativa vigente conforme al{' '}
                    <strong style={{ color: 'oklch(0.30 0.005 0)' }}>Real Decreto 1155/2024, de 19 de noviembre</strong>{' '}
                    (nuevo Reglamento de Extranjería). Las cifras de{' '}
                    <strong style={{ color: 'oklch(0.30 0.005 0)' }}>IPREM y SMI</strong>{' '}
                    se actualizan anualmente —
                    Rebeca Pinto Camacho revisa y actualiza este contenido periódicamente.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="rounded-lg p-6 text-cream sticky top-24" style={{ background: 'oklch(0.46 0.066 6)' }}>
                <h3 className="display text-base mb-2" style={{ color: 'oklch(0.638 0.112 68)' }}>¿Necesitas ayuda?</h3>
                <span className="gold-divider mb-4" aria-hidden="true" />
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'oklch(0.936 0.022 71 / 0.70)' }}>
                  Cada caso es único. Agenda una consulta y analizamos juntas tu situación sin compromiso, en el despacho de {site.address.city} o por videollamada.
                </p>
                <Link
                  href="/citas"
                  className="block text-center px-4 py-2.5 text-sm font-semibold rounded transition-colors mb-3"
                  style={{ background: 'oklch(0.638 0.112 68)', color: 'oklch(0.22 0.005 0)' }}
                >
                  Agendar cita · 50 €
                </Link>
                <a
                  href={`tel:${site.phone.tel}`}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border text-sm rounded transition-colors mb-3"
                  style={{ borderColor: 'oklch(0.936 0.022 71 / 0.30)', color: 'oklch(0.936 0.022 71)' }}
                >
                  <Phone className="w-3.5 h-3.5" />
                  {site.phone.display}
                </a>
                <a
                  href={site.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-4 py-2.5 border text-sm rounded transition-colors"
                  style={{ borderColor: 'oklch(0.936 0.022 71 / 0.30)', color: 'oklch(0.936 0.022 71)' }}
                >
                  WhatsApp
                </a>
              </div>

              {/* Tabla resumen comparativa */}
              <div className="bg-cream-dark border border-border rounded-lg p-5">
                <h3 className="display text-sm text-charcoal mb-4">Resumen comparativo</h3>
                <div className="space-y-3 text-xs font-sans">
                  {MODALIDADES.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setActiveTab(m.id)}
                      className="w-full text-left rounded-lg px-3 py-2.5 border transition-colors"
                      style={{
                        background: activeTab === m.id ? 'oklch(0.46 0.066 6 / 0.08)' : 'white',
                        borderColor: activeTab === m.id ? 'oklch(0.46 0.066 6 / 0.35)' : 'oklch(0.88 0.015 80)',
                      }}
                    >
                      <span className="flex items-center gap-1.5 font-semibold" style={{ color: activeTab === m.id ? 'oklch(0.46 0.066 6)' : 'oklch(0.22 0.005 0)' }}>
                        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                        {m.title}
                      </span>
                      <span className="block mt-1 ml-5 text-warm-gray">{m.vigencia} · {m.permanencia}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Otras áreas */}
              <div className="bg-cream-dark border border-border rounded-lg p-6">
                <h3 className="display text-sm text-charcoal mb-4">Otras áreas</h3>
                <ul className="space-y-2">
                  {[
                    ['Visados', '/areas/visados'],
                    ['Tipos de Residencia', '/areas/residencia'],
                    ['Nacionalidad española', '/areas/nacionalidad'],
                    ['Reagrupación familiar', '/areas/reagrupacion-familiar'],
                    ['Renovaciones', '/areas/renovaciones'],
                    ['TIE / NIE', '/areas/tie-nie'],
                  ].map(([label, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="flex items-center gap-1.5 text-sm text-warm-gray hover:text-garnet transition-colors"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
