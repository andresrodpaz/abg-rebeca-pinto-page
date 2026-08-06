'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, CheckCircle, Phone, ChevronDown, Globe } from 'lucide-react'
import { site } from '@/lib/site'

interface VisaType {
  id: string
  title: string
  shortTitle: string
  badge: string
  description: string
  requirements: string[]
  faqs: { question: string; answer: string }[]
}

const VISADOS: VisaType[] = [
  {
    id: 'estudios',
    title: 'Visado de Estudios',
    shortTitle: 'Estudios',
    badge: 'Formación',
    description:
      'Permite residir en España para cursar estudios oficiales, formación profesional, idiomas u otros programas educativos reconocidos. Habilita para trabajar hasta 30 horas semanales.',
    requirements: [
      'Carta de admisión o matrícula en centro educativo reconocido en España',
      'Pasaporte en vigor con al menos 1 año de validez',
      'Seguro médico privado con cobertura completa en España (sin franquicias ni copagos)',
      'Certificado de antecedentes penales del país de origen o de residencia (apostillado y traducido)',
      'Medios económicos suficientes: mínimo el 100% del IPREM mensual (~600 €/mes, ~7.200 €/año para el titular)',
      'Fotografía reciente en formato carné',
      'Tasa consular abonada',
    ],
    faqs: [
      {
        question: '¿Puedo trabajar con un visado de estudios?',
        answer:
          'Sí, hasta 30 horas semanales, siempre que el trabajo sea compatible con tu horario lectivo. Esta limitación se mantiene durante toda la vigencia del visado de estudios.',
      },
      {
        question: '¿El tiempo de estudios cuenta para la nacionalidad?',
        answer:
          'No directamente. Los años con visado de estudiante no computan por defecto para el período de residencia necesario para la nacionalidad. Sin embargo, si cambias a una autorización de residencia por trabajo, ese tiempo sí empieza a contar. Es fundamental planificar la estrategia migratoria a largo plazo.',
      },
      {
        question: '¿Puedo reagrupar a mi cónyuge e hijos?',
        answer:
          'Sí. Puedes reagrupar a tu cónyuge o pareja de hecho e hijos menores, siempre que demuestres medios económicos suficientes y vivienda adecuada para la familia.',
      },
      {
        question: '¿Cuánto tiempo tarda la resolución en el consulado?',
        answer:
          'El plazo habitual oscila entre 1 y 3 meses desde la presentación del expediente completo en el consulado español de tu país de residencia. Es fundamental reservar cita con antelación.',
      },
      {
        question: '¿Puedo cambiar a residencia por trabajo una vez en España?',
        answer:
          'Sí. Tras concluir tus estudios, puedes solicitar una autorización de residencia para búsqueda de empleo o acceso a prácticas profesionales (12 meses) o directamente una autorización de trabajo si tienes oferta laboral.',
      },
    ],
  },
  {
    id: 'trabajo-ajena',
    title: 'Visado de Trabajo por Cuenta Ajena',
    shortTitle: 'Trabajo (ajena)',
    badge: 'Empleo',
    description:
      'Para trabajar en España como empleado con contrato firmado por un empleador español. Requiere que el puesto no pueda cubrirse con trabajadores ya disponibles en el mercado nacional.',
    requirements: [
      'Oferta de trabajo u contrato firmado por la empresa empleadora en España',
      'Verificación de la Situación Nacional de Empleo (certificado de que el puesto no puede cubrirse internamente) o que el puesto figure en el catálogo de ocupaciones de difícil cobertura',
      'La empresa empleadora debe estar al corriente de sus obligaciones tributarias y con la Seguridad Social',
      'Pasaporte en vigor',
      'Certificado de antecedentes penales del país de origen (apostillado y traducido)',
      'Titulación o experiencia acorde al puesto (si se requiere cualificación)',
    ],
    faqs: [
      {
        question: '¿Cuánto tarda la resolución?',
        answer:
          'El proceso completo (autorización + visado + entrada + TIE) suele tomar entre 2 y 5 meses. La autorización de trabajo se tramita en España; el visado, en el consulado del país de origen.',
      },
      {
        question: '¿Puedo cambiar de trabajo o sector con esta autorización?',
        answer:
          'El primer año, la autorización está vinculada al empleador, sector y provincia indicados en la solicitud. A partir del segundo año, se libera esta restricción y puedes trabajar con cualquier empleador en cualquier sector.',
      },
      {
        question: '¿Qué es el catálogo de ocupaciones de difícil cobertura?',
        answer:
          'Es una lista oficial de profesiones con escasez de candidatos en el mercado nacional, actualizada trimestralmente por el SEPE. Si el puesto figura en este catálogo, no es necesario tramitar la verificación de la Situación Nacional de Empleo.',
      },
      {
        question: '¿Puede mi familia acompañarme?',
        answer:
          'Sí, una vez tengas al menos un año de residencia legal en España. La reagrupación familiar requiere medios económicos mínimos (150% del IPREM para 2 personas, ~900 €/mes) y vivienda adecuada.',
      },
      {
        question: '¿Cuánto tiempo de residencia necesito para la residencia permanente?',
        answer:
          'Tras 5 años de residencia legal continuada en España, puedes solicitar la residencia de larga duración, que es indefinida y te otorga las mismas condiciones que un residente español.',
      },
    ],
  },
  {
    id: 'trabajo-propia',
    title: 'Visado de Trabajo por Cuenta Propia (Autónomo)',
    shortTitle: 'Autónomo',
    badge: 'Negocio propio',
    description:
      'Para quienes desean establecerse en España como trabajadores autónomos o emprendedores, desarrollando una actividad económica lícita por cuenta propia.',
    requirements: [
      'Plan de negocio viable y detallado: actividad, mercado objetivo, proyección económica',
      'Medios económicos suficientes para el primer año de actividad (acreditados mediante extractos bancarios u otros)',
      'Experiencia o titulación relacionada con la actividad que se pretende desarrollar',
      'Licencias o autorizaciones previas necesarias para la actividad (si procede)',
      'Pasaporte en vigor',
      'Certificado de antecedentes penales del país de origen (apostillado y traducido)',
    ],
    faqs: [
      {
        question: '¿Cuánto tiempo dura la autorización inicial?',
        answer:
          'La autorización inicial es de 1 año. La primera renovación se concede por 4 años si la actividad está en marcha. Tras 5 años de residencia legal, se accede a la residencia de larga duración.',
      },
      {
        question: '¿Estoy limitado a una comunidad autónoma o sector?',
        answer:
          'El primer año sí: la autorización está limitada al territorio (comunidad autónoma) y al sector de actividad indicados en la solicitud. A partir de la primera renovación, estas restricciones desaparecen.',
      },
      {
        question: '¿Qué se evalúa del plan de negocio?',
        answer:
          'Se valora la viabilidad económica, la inversión, los medios disponibles, la experiencia del solicitante, el impacto potencial en el mercado español y el cumplimiento de la normativa sectorial aplicable.',
      },
      {
        question: '¿Puedo contratar empleados en España?',
        answer:
          'Sí. Una vez establecida la empresa y dados de alta en la Seguridad Social, puedes contratar trabajadores en España siguiendo la normativa laboral vigente.',
      },
      {
        question: '¿Es necesario crear una empresa o basta con ser autónomo?',
        answer:
          'Depende de la actividad. En muchos casos basta con darse de alta como autónomo (persona física). Para otras actividades puede ser más conveniente o necesario constituir una sociedad mercantil.',
      },
    ],
  },
  {
    id: 'reagrupacion',
    title: 'Visado de Reagrupación Familiar',
    shortTitle: 'Reagrupación',
    badge: 'Familia',
    description:
      'Permite a residentes legales en España traer a sus familiares más cercanos para que convivan con ellos, una vez cumplidos los requisitos de tiempo de residencia, medios económicos y vivienda.',
    requirements: [
      'Al menos 1 año de residencia legal en España con autorización renovada o en proceso de renovación',
      'Medios económicos: 150% del IPREM para 2 personas (~900 €/mes), más el 50% del IPREM por cada familiar adicional',
      'Vivienda adecuada: informe de habitabilidad y condiciones emitido por el ayuntamiento',
      'Vínculo familiar acreditado: certificado de matrimonio, libro de familia, etc. (apostillado y traducido)',
      'Que el familiar a reagrupar no se encuentre ya en España en situación irregular',
    ],
    faqs: [
      {
        question: '¿A quiénes puedo reagrupar?',
        answer:
          'Puedes reagrupar al cónyuge o pareja de hecho debidamente inscrita, a los hijos menores de edad (o mayores dependientes), y a los ascendientes (padres/abuelos) mayores de 65 años a cargo. Los ascendientes solo pueden reagruparse si tienes residencia de larga duración o es tu segunda renovación o superior.',
      },
      {
        question: '¿Cuánto tarda el proceso?',
        answer:
          'La resolución de la reagrupación puede tardar hasta 2 meses. Tras la resolución favorable, el familiar tiene 2 meses para solicitar el visado en el consulado y 3 meses para entrar en España desde la concesión del visado. En total, el proceso suele tomar entre 4 y 7 meses.',
      },
      {
        question: '¿Pueden trabajar mis familiares una vez en España?',
        answer:
          'Los cónyuges o parejas reagrupadas pueden solicitar autorización de trabajo desde el primer momento. Los hijos mayores de 16 años también pueden solicitarla. Los ascendientes reagrupados no tienen autorización de trabajo automática.',
      },
      {
        question: '¿Qué es el informe de habitabilidad de vivienda?',
        answer:
          'Es un certificado emitido por el ayuntamiento o la comunidad autónoma que acredita que la vivienda reúne las condiciones de superficie, higiene y equipamiento para alojar dignamente a todos los miembros de la familia.',
      },
      {
        question: '¿Pueden reagrupar a mis hijos si son mayores de edad?',
        answer:
          'Solo si son mayores dependientes, es decir, que por razones médicas objetivas no puedan proveer a sus propias necesidades. Para hijos adultos independientes no existe esta vía.',
      },
    ],
  },
  {
    id: 'no-lucrativa',
    title: 'Visado de Residencia No Lucrativa',
    shortTitle: 'No lucrativa',
    badge: 'Sin trabajo',
    description:
      'Para quienes desean residir en España sin ejercer ninguna actividad laboral o profesional, acreditando ingresos propios suficientes (rentas, pensiones, inversiones, etc.).',
    requirements: [
      'Medios económicos suficientes: mínimo 400% del IPREM anual (~31.200 €/año para el titular)',
      'Más el 100% del IPREM adicional por cada familiar incluido (~7.800 €/año por familiar)',
      'Seguro médico privado sin franquicias ni copagos con cobertura completa en España',
      'Pasaporte en vigor con al menos 1 año de validez',
      'Certificado de antecedentes penales del país de origen (apostillado y traducido)',
      'No ejercer actividad laboral ni profesional remunerada en España durante la vigencia',
    ],
    faqs: [
      {
        question: '¿Puedo trabajar de forma remota para una empresa extranjera?',
        answer:
          'No. La visado de residencia no lucrativa prohíbe el ejercicio de cualquier actividad lucrativa, incluido el trabajo remoto para empresas del extranjero. Trabajar (aunque sea remotamente) puede causar la denegación de la renovación. Si quieres trabajar en remoto desde España, el visado de nómada digital es la opción adecuada.',
      },
      {
        question: '¿Cuánto tiempo dura esta autorización?',
        answer:
          'Se concede por 1 año. Luego hay 2 renovaciones de 2 años cada una. Tras 5 años de residencia legal continuada, se puede optar a la residencia de larga duración.',
      },
      {
        question: '¿Puedo incluir a mi familia en la solicitud?',
        answer:
          'Sí, siempre que acredites medios económicos suficientes para todos (ver requisitos). Los familiares tampoco podrán trabajar bajo este tipo de autorización.',
      },
      {
        question: '¿Los ingresos pueden venir de inversiones o alquileres?',
        answer:
          'Sí. Los medios económicos pueden acreditarse mediante rentas de capital, dividendos, alquileres, pensiones u otras fuentes de ingresos pasivos. No es necesario que procedan de un salario.',
      },
      {
        question: '¿Qué pasa si pierdo los ingresos durante la vigencia?',
        answer:
          'Si en el momento de la renovación no puedes acreditar los medios económicos exigidos, la autorización no se renovará. Es recomendable mantener siempre los saldos y documentación actualizados.',
      },
    ],
  },
  {
    id: 'nomada-digital',
    title: 'Visado de Nómada Digital',
    shortTitle: 'Nómada digital',
    badge: 'Trabajo remoto',
    description:
      'Permite residir en España trabajando de forma remota para empresas o clientes ubicados fuera de España. Diseñado para profesionales cualificados que prestan servicios digitales a distancia.',
    requirements: [
      'Perfil cualificado: formación universitaria superior o experiencia profesional demostrable de al menos 3 años en el sector',
      'Contrato o relación comercial acreditada con empresa(s) o cliente(s) fuera de España',
      'Ingresos mínimos de referencia: entre 2.400 € y 2.850 €/mes (según IPREM y SMI vigentes; se actualiza anualmente)',
      'Seguro médico privado con cobertura completa en España',
      'Pasaporte en vigor',
      'Certificado de antecedentes penales del país de origen (apostillado y traducido)',
    ],
    faqs: [
      {
        question: '¿Puedo tener clientes en España?',
        answer:
          'Sí, pero con limitaciones: hasta el 20% de tus ingresos totales puede proceder de clientes españoles. Si superas ese porcentaje, necesitarías una autorización de trabajo diferente.',
      },
      {
        question: '¿Cuánto tiempo dura el visado?',
        answer:
          'El visado inicial permite residir hasta 1 año. Desde España, puede ampliarse a una autorización de hasta 3 años a través de la Unidad de Grandes Empresas (UGE).',
      },
      {
        question: '¿Cuenta el tiempo de nómada digital para la nacionalidad?',
        answer:
          'Sí, al 100%. Este es uno de los grandes atractivos del visado de nómada digital frente al de estudiante: el tiempo de residencia cuenta íntegramente para el cómputo de años necesarios para la residencia de larga duración y la nacionalidad.',
      },
      {
        question: '¿Puedo incluir a mi familia?',
        answer:
          'Sí. El cónyuge o pareja de hecho y los hijos dependientes pueden obtener una autorización derivada de la del nómada digital, siempre que acredites medios económicos suficientes para todos.',
      },
      {
        question: '¿Puedo trabajar también para empresas españolas si tengo este visado?',
        answer:
          'De forma marginal (hasta el 20% de tus ingresos). Si pretendes desarrollar una actividad principal con clientes o empleadores españoles, necesitarías una autorización de trabajo por cuenta ajena o propia.',
      },
    ],
  },
  {
    id: 'investigador',
    title: 'Visado de Investigador',
    shortTitle: 'Investigador',
    badge: 'I+D+i',
    description:
      'Para investigadores vinculados a proyectos de I+D+i en entidades públicas o privadas, universidades o centros de investigación en España.',
    requirements: [
      'Convenio de acogida firmado con una entidad de investigación reconocida en España (universidad, centro público o privado de I+D+i)',
      'Pasaporte en vigor',
      'Medios económicos para mantenerse durante la estancia',
      'Seguro médico con cobertura en España',
      'Certificado de antecedentes penales del país de origen (apostillado y traducido)',
      'Titulación académica que acredite la cualificación investigadora',
    ],
    faqs: [
      {
        question: '¿Necesito obtener el TIE una vez en España?',
        answer:
          'No es obligatorio. El visado de investigador ya acredita la situación de residencia legal sin necesidad de obtener la Tarjeta de Identidad de Extranjero (TIE), aunque puede solicitarse de forma voluntaria si se desea tener un documento físico de residencia.',
      },
      {
        question: '¿Puedo reagrupar a mi familia?',
        answer:
          'Sí. Puedes reagrupar a tu cónyuge o pareja de hecho y a los ascendientes que dependan económicamente de ti. Los familiares reagrupados pueden solicitar autorización de trabajo desde su llegada a España.',
      },
      {
        question: '¿Qué es el convenio de acogida?',
        answer:
          'Es el documento principal: un acuerdo entre el investigador y la entidad española de acogida en el que se definen el proyecto de investigación, las condiciones de la estancia, la retribución y los medios disponibles.',
      },
      {
        question: '¿Puedo trabajar en otras actividades además de la investigación?',
        answer:
          'Sí, de forma secundaria. Los investigadores pueden ejercer actividades docentes o de consultoría compatibles con su actividad investigadora principal, siempre que no interfieran con el convenio de acogida.',
      },
      {
        question: '¿Cuánto dura la autorización?',
        answer:
          'La duración depende del convenio de acogida y del proyecto de investigación. Puede solicitarse por hasta 1 año (visado) o más tiempo mediante autorización de residencia. Es renovable mientras dure el proyecto.',
      },
    ],
  },
  {
    id: 'emprendedor',
    title: 'Visado de Emprendedor',
    shortTitle: 'Emprendedor',
    badge: 'Startups',
    description:
      'Para emprendedores con un proyecto empresarial innovador, viable y de interés económico para España, al amparo de la Ley de Startups.',
    requirements: [
      'Proyecto empresarial con carácter innovador y de especial interés económico para España',
      'Informe favorable de ENISA u otro organismo acreditado (o acreditación mediante otros medios)',
      'Medios económicos suficientes para el primer año (o acreditación de financiación del proyecto)',
      'Pasaporte en vigor',
      'Certificado de antecedentes penales del país de origen (apostillado y traducido)',
      'Plan de negocio detallado con proyección financiera y modelo de negocio',
    ],
    faqs: [
      {
        question: '¿Qué se considera un proyecto "innovador"?',
        answer:
          'No existe una definición única, pero se valoran: el uso de tecnología propia, la escalabilidad, el impacto potencial en el mercado, la creación de empleo y la aportación de valor diferencial. ENISA (u organismo equivalente) emite un informe que avala el carácter innovador del proyecto.',
      },
      {
        question: '¿Qué evidencias pide la renovación?',
        answer:
          'La renovación exige evidencia real de actividad: facturación, contratos con clientes, cartera de inversores, número de empleados, tracción del negocio o evolución del producto. Un proyecto sin actividad real difícilmente obtiene renovación.',
      },
      {
        question: '¿Puedo traer cofundadores extranjeros?',
        answer:
          'Sí, cada cofundador puede solicitar su propio visado de emprendedor, siempre que todos estén vinculados al mismo proyecto y cumplan los requisitos individualmente.',
      },
      {
        question: '¿Cuánto tiempo dura la autorización inicial?',
        answer:
          'El visado es de 1 año. Desde España puede convertirse en una autorización de residencia por hasta 2 años, renovable. Tras 5 años de residencia legal, se accede a la residencia de larga duración.',
      },
      {
        question: '¿Puedo también tener clientes en España?',
        answer:
          'Sí. A diferencia del visado de nómada digital, el visado de emprendedor no limita el origen de los ingresos. Puedes tener clientes en España y en el extranjero sin restricción porcentual.',
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
            style={{ background: open === i ? 'oklch(0.46 0.066 6 / 0.05)' : 'white' }}
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

export default function VisadosDedicatedPage() {
  const [activeId, setActiveId] = useState('estudios')
  const active = VISADOS.find(v => v.id === activeId) ?? VISADOS[0]
  const contentRef = useRef<HTMLDivElement>(null)

  const handleSelect = (id: string) => {
    setActiveId(id)
    // Scroll to content on mobile
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

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
              <Globe className="w-7 h-7" style={{ color: 'oklch(0.638 0.112 68)' }} />
            </div>
            <div>
              <p className="eyebrow mb-2" style={{ color: 'oklch(0.638 0.112 68 / 0.75)' }}>Áreas de práctica</p>
              <h1 className="display-lg text-2xl md:text-4xl mt-1 mb-4 text-balance" style={{ color: 'oklch(0.936 0.022 71)' }}>Visados</h1>
              <span className="gold-divider mb-5" aria-hidden="true" />
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'oklch(0.936 0.022 71 / 0.70)' }}>
                El visado es la puerta de entrada legal a España. Existen <strong style={{ color: 'oklch(0.936 0.022 71)' }}>8 tipos de visado</strong> para situaciones muy distintas:
                estudios, trabajo, emprendimiento, investigación o residencia sin actividad laboral. Selecciona el tuyo para ver los requisitos y las preguntas más frecuentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px" style={{ background: 'oklch(0.638 0.112 68)' }} aria-hidden="true" />

      {/* SUBMENU — horizontal scroll on mobile */}
      <nav
        aria-label="Tipos de visado"
        className="sticky top-[64px] z-30 border-b"
        style={{ background: 'oklch(0.900 0.024 71)', borderColor: 'oklch(0.638 0.112 68 / 0.20)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto -mb-px" style={{ scrollbarWidth: 'none' }}>
            {VISADOS.map(v => (
              <button
                key={v.id}
                onClick={() => handleSelect(v.id)}
                className="relative flex-shrink-0 px-3.5 py-4 text-[11px] font-sans font-semibold transition-colors duration-200 whitespace-nowrap border-b-2"
                style={{
                  color: activeId === v.id ? 'oklch(0.46 0.066 6)' : 'oklch(0.50 0.010 50)',
                  borderBottomColor: activeId === v.id ? 'oklch(0.46 0.066 6)' : 'transparent',
                  letterSpacing: '0.01em',
                }}
              >
                {v.shortTitle}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <section className="py-14 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Main */}
            <div className="lg:col-span-2 space-y-10" ref={contentRef}>

              {/* Visado header */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
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
              </div>

              {/* Requisitos */}
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

              {/* Proceso */}
              <div>
                <h3 className="display text-base text-charcoal mb-4">Cómo trabajamos juntas</h3>
                <span className="gold-divider mb-6 block" />
                <ol className="space-y-5">
                  {[
                    { n: 1, title: 'Análisis del perfil y tipo de visado', desc: 'Estudiamos tu situación para confirmar que este visado es el más adecuado y qué documentación específica necesitas.' },
                    { n: 2, title: 'Preparación completa del expediente', desc: 'Recopilamos, apostillamos y traducimos todos los documentos, y revisamos que el expediente sea sólido antes de acudir al consulado.' },
                    { n: 3, title: 'Asesoramiento para la cita consular', desc: 'Te preparamos para la entrevista consular si es necesaria, y resolvemos cualquier duda sobre el proceso.' },
                    { n: 4, title: 'Seguimiento y acompañamiento post-entrada', desc: 'Una vez en España, te asesoramos sobre el alta en la Seguridad Social, obtención del TIE, empadronamiento y próximas renovaciones.' },
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

              {/* FAQ del visado */}
              <div>
                <h3 className="display text-base text-charcoal mb-4">Preguntas frecuentes — {active.title}</h3>
                <span className="gold-divider mb-2 block" />
                <FAQ faqs={active.faqs} />
              </div>

              {/* FAQ general */}
              <div className="pt-4 border-t" style={{ borderColor: 'oklch(0.638 0.112 68 / 0.25)' }}>
                <h3 className="display text-base text-charcoal mb-4">Preguntas generales sobre visados</h3>
                <span className="gold-divider mb-2 block" />
                <FAQ faqs={[
                  {
                    question: '¿Dónde se solicita el visado?',
                    answer: 'El visado se solicita en el consulado español del país donde resides legalmente. El expediente debe estar completo antes de acudir a la cita; un expediente incompleto suele implicar la denegación.',
                  },
                  {
                    question: '¿Puedo solicitar el visado desde España?',
                    answer: 'En general, el visado se solicita desde el extranjero. Sin embargo, en algunos casos (cambio de estatus, situaciones especiales) puede tramitarse una autorización directamente en España sin necesidad de salir. Lo analizamos caso a caso.',
                  },
                  {
                    question: '¿Qué pasa si me deniegan el visado?',
                    answer: 'Puedes interponer un recurso de reposición ante el consulado o un recurso contencioso-administrativo. Es fundamental conocer los motivos de denegación para diseñar la mejor estrategia.',
                  },
                  {
                    question: '¿Cuánto tiempo después de llegar a España debo solicitar el TIE?',
                    answer: 'Tienes 1 mes desde tu entrada en España para solicitar la Tarjeta de Identidad de Extranjero (TIE) en la Oficina de Extranjería o en la Comisaría de Policía correspondiente.',
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
                    <strong style={{ color: 'oklch(0.30 0.005 0)' }}>IPREM y SMI</strong> se actualizan anualmente — los umbrales indicados (IPREM mensual ~600 €, anual ~7.200 €; nómada digital 2.400–2.850 €/mes; no lucrativa ~31.200 €/año; reagrupación ~900 €/mes para 2 personas) deben revisarse cada año.
                    La <strong style={{ color: 'oklch(0.30 0.005 0)' }}>Golden Visa</strong> fue eliminada en abril de 2025 y ya no se tramita.
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

              {/* Tipos de visado rápidos */}
              <div className="bg-cream-dark border border-border rounded-lg p-6">
                <h3 className="display text-sm text-charcoal mb-4">Tipos de visado</h3>
                <ul className="space-y-2">
                  {VISADOS.map(v => (
                    <li key={v.id}>
                      <button
                        onClick={() => handleSelect(v.id)}
                        className="flex items-center gap-1.5 text-sm w-full text-left transition-colors"
                        style={{ color: activeId === v.id ? 'oklch(0.46 0.066 6)' : 'oklch(0.55 0.008 50)' }}
                      >
                        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                        {v.shortTitle}
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
                    ['Arraigo', '/areas/arraigo'],
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
