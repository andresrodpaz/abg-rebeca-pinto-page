'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, CheckCircle, Phone, ChevronDown, UserCheck } from 'lucide-react'
import { site } from '@/lib/site'

interface Modalidad {
  id: string
  title: string
  badge: string
  description: string
  requirements: string[]
  faqs: { question: string; answer: string }[]
}

const MODALIDADES: Modalidad[] = [
  {
    id: 'social',
    title: 'Arraigo Social',
    badge: 'Más habitual',
    description:
      'Para quienes acreditan vínculos familiares en España o integración social mediante informe de la comunidad autónoma. Requiere permanencia continuada acreditada de al menos 3 años.',
    requirements: [
      '3 años de permanencia continuada en España (acreditada mediante empadronamiento, contratos, etc.)',
      'Informe de arraigo social emitido por el Ayuntamiento o la comunidad autónoma',
      'Pasaporte o documento de identidad en vigor',
      'Carencia de antecedentes penales en España y en el país de origen',
      'Medios económicos suficientes o contrato de trabajo',
      'Vínculos familiares en España o acreditación de integración social',
    ],
    faqs: [
      {
        question: '¿Qué acredita el informe de arraigo social?',
        answer:
          'El informe, emitido por el ayuntamiento o la comunidad autónoma donde resides, valora tu integración: tiempo de empadronamiento, conocimiento del idioma, vínculos con el entorno, situación laboral o formativa, etc. Es el documento clave del expediente.',
      },
      {
        question: '¿Los 3 años de permanencia tienen que ser sin salir de España?',
        answer:
          'Deben ser continuados, pero pequeñas ausencias esporádicas y justificadas no interrumpen la permanencia. Ausencias prolongadas o reiteradas sí pueden ser problemáticas. Lo valoramos caso a caso.',
      },
      {
        question: '¿Puedo trabajar mientras espero la resolución?',
        answer:
          'Sí. Una vez presentada la solicitud puedes solicitar la tarjeta de "solicitud en trámite", que te habilita para trabajar por cuenta ajena o propia mientras se resuelve el expediente.',
      },
      {
        question: '¿Cuánto tiempo tarda la resolución?',
        answer:
          'El plazo legal es de 3 meses, aunque en la práctica puede alargarse entre 3 y 6 meses según la carga de trabajo de la Oficina de Extranjería correspondiente.',
      },
      {
        question: '¿Qué vigencia tiene la autorización?',
        answer:
          'La autorización inicial de arraigo social tiene una vigencia de 2 años, renovable por períodos de 2 años hasta acceder a la residencia de larga duración (5 años de residencia legal continuada).',
      },
    ],
  },
  {
    id: 'sociolaboral',
    title: 'Arraigo Sociolaboral',
    badge: 'Para trabajadores',
    description:
      'Para quienes demuestran actividad laboral previa en España de al menos 6 meses (mínimo 20 horas/semana), habiendo permanecido en el país al menos 2 años.',
    requirements: [
      '2 años de permanencia en España (acreditada)',
      'Actividad laboral de al menos 6 meses con jornada mínima de 20 h/semana (por cuenta ajena o propia)',
      'Acreditación de la relación laboral: contratos, nóminas, vida laboral, resoluciones de la Inspección de Trabajo, etc.',
      'Pasaporte o documento de identidad en vigor',
      'Carencia de antecedentes penales en España y en el país de origen',
      'Empadronamiento en el municipio de residencia',
    ],
    faqs: [
      {
        question: '¿Cómo acredito los 6 meses de trabajo si trabajé sin contrato?',
        answer:
          'Existen vías alternativas: actas de la Inspección de Trabajo, testigos, facturas si eras autónomo, etc. Es fundamental asesorarse bien para reunir la documentación adecuada según cada situación.',
      },
      {
        question: '¿Las 20 horas semanales tienen que ser en el mismo empleo?',
        answer:
          'No necesariamente. Pueden sumarse horas de distintos empleos simultaneos, siempre que en conjunto se alcancen las 20 h/semana y se acrediten con documentación suficiente.',
      },
      {
        question: '¿Puedo trabajar desde el primer día con este arraigo?',
        answer:
          'Sí. Todas las modalidades de arraigo permiten trabajar por cuenta ajena o propia desde el primer día de autorización, sin necesidad de buscar un empleador previo.',
      },
      {
        question: '¿Qué pasa si pierdo el trabajo después de obtener el arraigo?',
        answer:
          'La autorización ya está concedida y no se revoca por perder el empleo. Podrás trabajar con cualquier empleador en cualquier sector durante la vigencia (2 años).',
      },
      {
        question: '¿El arraigo sociolaboral requiere informe de arraigo?',
        answer:
          'No. A diferencia del arraigo social, el sociolaboral no requiere informe de la comunidad autónoma; se sustituye por la acreditación de la actividad laboral previa.',
      },
    ],
  },
  {
    id: 'familiar',
    title: 'Arraigo Familiar',
    badge: 'Con vínculo familiar',
    description:
      'Para personas con hijos de nacionalidad española, o para ascendientes de un ciudadano de la Unión Europea o de España.',
    requirements: [
      'Ser padre/madre de un hijo/a de nacionalidad española, o ser ascendiente directo de ciudadano/a de la UE o español/a',
      'El hijo/a o descendiente debe encontrarse en España o ser residente legal',
      'Pasaporte o documento de identidad en vigor',
      'Certificado de nacimiento del hijo/a o del descendiente (apostillado y traducido si procede)',
      'Documentación que acredite la nacionalidad española del hijo/a o la ciudadanía UE del descendiente',
      'Carencia de antecedentes penales en España y en el país de origen',
    ],
    faqs: [
      {
        question: '¿Es necesario acreditar años de permanencia en España?',
        answer:
          'No. El arraigo familiar no exige un período mínimo de permanencia continuada en España, a diferencia del social o el sociolaboral. El vínculo familiar es el requisito principal.',
      },
      {
        question: '¿Qué pasa si el hijo tiene doble nacionalidad?',
        answer:
          'Si el hijo posee la nacionalidad española (aunque también tenga otra), puede acreditar el arraigo familiar. Lo relevante es que la nacionalidad española esté en vigor y sea efectiva.',
      },
      {
        question: '¿Puedo solicitar arraigo familiar si mi hijo nació fuera de España?',
        answer:
          'Sí, siempre que el hijo sea de nacionalidad española. La nacionalidad puede haberse adquirido por nacimiento, adopción, o cualquier otra vía legalmente reconocida.',
      },
      {
        question: '¿Se requiere convivencia con el hijo?',
        answer:
          'No es un requisito formal, pero sí es importante acreditar el vínculo real y la responsabilidad parental. La relación con el menor se valora en el expediente.',
      },
      {
        question: '¿Cuánto tarda la resolución?',
        answer:
          'El plazo legal es de 3 meses. En la práctica, los tiempos varían según la Oficina de Extranjería. Con el expediente bien preparado, se minimizan los retrasos por requerimientos adicionales.',
      },
    ],
  },
  {
    id: 'socioformativo',
    title: 'Arraigo Socioformativo',
    badge: 'Para estudiantes',
    description:
      'Residencia de 12 meses (prorrogables) a cambio de cursar estudios oficiales o reglados en España, tras acreditar 2 años de permanencia. Permite trabajar hasta 30 h/semana si es compatible con el horario lectivo.',
    requirements: [
      '2 años de permanencia en España (acreditada)',
      'Inscripción o admisión en formación oficial o reglada: FP, bachillerato, universidad, EEOOII, formación profesional para el empleo, etc.',
      'Pasaporte o documento de identidad en vigor',
      'Carencia de antecedentes penales en España y en el país de origen',
      'Empadronamiento en el municipio de residencia',
      'Medios económicos suficientes o compromiso de matrícula activa',
    ],
    faqs: [
      {
        question: '¿Qué tipo de estudios son válidos para el arraigo socioformativo?',
        answer:
          'Deben ser estudios oficiales o reglados: FP (básica, media, superior), bachillerato, estudios universitarios, Escuelas Oficiales de Idiomas, formación para el empleo (SEPE), entre otros. Los cursos no reglados o privados sin certificación oficial no son válidos.',
      },
      {
        question: '¿Puedo trabajar con este tipo de arraigo?',
        answer:
          'Sí, hasta 30 horas semanales, siempre que el trabajo sea compatible con tu horario lectivo. Es una de las modalidades más ventajosas para quien quiere combinar trabajo y formación.',
      },
      {
        question: '¿Cuánto dura la autorización?',
        answer:
          'La autorización inicial es de 12 meses. Si continúas los estudios, puede prorrogarse anualmente hasta que los concluyas. Al finalizar los estudios, puedes solicitar una autorización de residencia y trabajo de 2 años.',
      },
      {
        question: '¿Necesito estar ya matriculado al presentar la solicitud?',
        answer:
          'Depende del momento del curso académico. En algunos casos basta con la admisión o preinscripción; en otros se requiere matrícula formalizada. Te asesoramos sobre los documentos necesarios según tu situación concreta.',
      },
      {
        question: '¿El arraigo socioformativo requiere informe de la comunidad autónoma?',
        answer:
          'No. Este tipo de arraigo no requiere informe de arraigo social; se sustituye por la documentación acreditativa de la inscripción o admisión en los estudios.',
      },
    ],
  },
  {
    id: 'segunda-oportunidad',
    title: 'Arraigo de Segunda Oportunidad',
    badge: 'Renovación frustrada',
    description:
      'Para quienes tuvieron una autorización de residencia en España anteriormente y no pudieron renovarla por causas ajenas a su voluntad (enfermedad, expediente administrativo, situación económica grave, etc.).',
    requirements: [
      'Haber tenido previamente una autorización de residencia en España (cualquier tipo)',
      'No haber podido renovarla por causas ajenas a la propia voluntad (documentadas)',
      'Permanencia acreditada en España durante el período sin autorización',
      'Pasaporte o documento de identidad en vigor',
      'Carencia de antecedentes penales en España y en el país de origen',
      'Documentación que acredite las causas que impidieron la renovación',
    ],
    faqs: [
      {
        question: '¿Qué causas se consideran "ajenas a la voluntad" del solicitante?',
        answer:
          'Enfermedad grave propia o de un familiar a cargo, situación de desempleo involuntario prolongado, errores administrativos, dificultades económicas sobrevenidas graves, situaciones de violencia de género, entre otras. Cada caso se valora individualmente.',
      },
      {
        question: '¿Necesito acreditar cuánto tiempo llevo en España?',
        answer:
          'Sí. Debes acreditar permanencia continuada en España, tanto el período con autorización previa como el período posterior sin ella. El empadronamiento, contratos de trabajo, recibos, etc., son documentos válidos.',
      },
      {
        question: '¿Puedo trabajar con la autorización de segunda oportunidad?',
        answer:
          'Sí. Como todas las modalidades de arraigo, esta también habilita para trabajar por cuenta ajena o propia desde el primer día de la autorización, sin restricción de sector ni provincia.',
      },
      {
        question: '¿Qué vigencia tiene esta autorización?',
        answer:
          'La autorización tiene una vigencia de 2 años, renovable por 2 años adicionales, y así sucesivamente hasta alcanzar la residencia de larga duración (5 años de residencia legal continuada).',
      },
      {
        question: '¿Es diferente solicitar esta modalidad si ya tuve una expulsión o devolución?',
        answer:
          'Sí, puede ser más complejo. Si hay antecedentes de expulsión o devolución, es fundamental analizar el caso con detenimiento antes de presentar ninguna solicitud.',
      },
    ],
  },
]

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
            style={{
              background: open === i ? 'oklch(0.46 0.066 6 / 0.06)' : 'white',
            }}
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
            <div
              className="px-5 pb-4 pt-1"
              style={{ background: 'oklch(0.46 0.066 6 / 0.03)' }}
            >
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

export default function ArraigoDedicatedPage() {
  const [activeTab, setActiveTab] = useState('social')
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
              <h1 className="display-lg text-2xl md:text-4xl mt-1 mb-4 text-balance" style={{ color: 'oklch(0.936 0.022 71)' }}>Arraigo</h1>
              <span className="gold-divider mb-5" aria-hidden="true" />
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'oklch(0.936 0.022 71 / 0.70)' }}>
                El arraigo es la vía más utilizada para regularizar la situación irregular en España. Existen <strong style={{ color: 'oklch(0.936 0.022 71)' }}>5 modalidades</strong>,
                cada una adaptada a una situación diferente. Todas permiten trabajar desde el primer día, por cuenta ajena o propia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px" style={{ background: 'oklch(0.638 0.112 68)' }} aria-hidden="true" />

      {/* TAB NAV */}
      <div style={{ background: 'oklch(0.900 0.024 71)', borderColor: 'oklch(0.638 0.112 68 / 0.20)' }} className="sticky top-[64px] z-30 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide -mb-px">
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
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="display text-xl text-charcoal">{active.title}</h2>
                  <span
                    className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{
                      background: 'oklch(0.638 0.112 68 / 0.14)',
                      color: 'oklch(0.46 0.005 68)',
                    }}
                  >
                    {active.badge}
                  </span>
                </div>
                <span className="gold-divider mb-5 block" />
                <p className="text-warm-gray leading-relaxed">{active.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="display text-base text-charcoal mb-4">Requisitos principales</h3>
                <span className="gold-divider mb-5 block" />
                <ul className="space-y-3">
                  {active.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'oklch(0.46 0.066 6)' }} />
                      <span className="text-warm-gray text-sm leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nota permiso de trabajo */}
              <div
                className="rounded-xl px-5 py-4 flex gap-3"
                style={{
                  background: 'oklch(0.46 0.066 6 / 0.06)',
                  border: '1px solid oklch(0.46 0.066 6 / 0.18)',
                }}
              >
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'oklch(0.46 0.066 6)' }} />
                <p className="text-sm font-sans leading-relaxed" style={{ color: 'oklch(0.30 0.005 0)' }}>
                  <strong>Permiso de trabajo incluido:</strong> esta modalidad habilita para trabajar desde el primer día de la autorización, tanto por cuenta ajena como por cuenta propia, sin restricción de sector ni provincia.
                </p>
              </div>

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

              {/* FAQ acordeón */}
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
                    question: '¿Todas las modalidades de arraigo permiten trabajar?',
                    answer: 'Sí. Todas las modalidades de arraigo (social, sociolaboral, familiar, socioformativo y de segunda oportunidad) incluyen autorización para trabajar por cuenta ajena o propia desde el primer día, sin restricción de sector ni provincia.',
                  },
                  {
                    question: '¿Cuánto tiempo tarda el arraigo en resolverse?',
                    answer: 'El plazo legal es de 3 meses. En la práctica, entre 3 y 6 meses según la Oficina de Extranjería y la carga de trabajo. Presentar un expediente completo y sólido es clave para evitar requerimientos que alargan el proceso.',
                  },
                  {
                    question: '¿Cuánto dura la autorización de arraigo?',
                    answer: 'La autorización inicial tiene vigencia de 2 años. Puede renovarse por períodos de 2 años. Tras 5 años de residencia legal continuada, se accede a la residencia de larga duración (sin límite temporal).',
                  },
                  {
                    question: '¿El arraigo me permite llevar a mi familia a España?',
                    answer: 'Con la primera autorización de arraigo no puedes reagrupar familiares. Una vez tengas al menos un año de residencia legal y reúnas los requisitos económicos y de vivienda, podrás iniciar el proceso de reagrupación familiar.',
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
                <span className="text-base shrink-0 mt-0.5" aria-hidden="true">📋</span>
                <div>
                  <p className="text-xs font-sans font-semibold uppercase tracking-wider mb-1" style={{ color: 'oklch(0.46 0.005 68)', letterSpacing: '0.10em' }}>
                    Nota sobre normativa
                  </p>
                  <p className="text-xs font-sans leading-relaxed" style={{ color: 'oklch(0.50 0.010 50)' }}>
                    La información de esta página refleja la normativa vigente en 2026 conforme al{' '}
                    <strong style={{ color: 'oklch(0.30 0.005 0)' }}>Real Decreto 1155/2024</strong> (Reglamento de Extranjería). Las cifras de{' '}
                    <strong style={{ color: 'oklch(0.30 0.005 0)' }}>IPREM y SMI</strong> se actualizan cada año mediante Ley de Presupuestos o norma equivalente —
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

              {/* Modalidades rápidas */}
              <div className="bg-cream-dark border border-border rounded-lg p-6">
                <h3 className="display text-sm text-charcoal mb-4">Modalidades de arraigo</h3>
                <ul className="space-y-2">
                  {MODALIDADES.map(m => (
                    <li key={m.id}>
                      <button
                        onClick={() => setActiveTab(m.id)}
                        className="flex items-center gap-1.5 text-sm w-full text-left transition-colors"
                        style={{ color: activeTab === m.id ? 'oklch(0.46 0.066 6)' : 'oklch(0.55 0.008 50)' }}
                      >
                        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                        {m.title}
                      </button>
                    </li>
                  ))}
                </ul>
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
