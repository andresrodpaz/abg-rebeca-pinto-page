import { BookOpen, CalendarDays, Clock, CheckCircle, MessageSquare, CreditCard, HelpCircle, ChevronRight, Smartphone, Mail, Eye, Trash2, RefreshCw, Search, Bell } from 'lucide-react'

export const metadata = {
  title: 'Guía de Uso — Panel Admin · Rebeca Pinto Camacho',
}

function Section({ id, icon: Icon, title, children }: { id: string; icon: any; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="bg-white border border-border/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-3 px-6 py-5 bg-gradient-to-r from-garnet-dark via-garnet to-garnet-dark text-cream border-b border-garnet-light/20 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
        
        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/10 shadow-inner">
          <Icon className="w-4 h-4 text-gold" />
        </div>
        <h2 className="font-serif text-xl font-bold tracking-wide relative z-10">{title}</h2>
      </div>
      <div className="px-6 py-6 font-sans text-sm text-charcoal/90 space-y-5 bg-gradient-to-b from-white to-cream/20">{children}</div>
    </section>
  )
}

function Step({ n, text }: { n: number; text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-6 h-6 rounded-full bg-garnet/15 text-garnet text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
        {n}
      </span>
      <span className="leading-relaxed">{text}</span>
    </li>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 bg-gold/10 border border-gold/30 rounded-xl px-4 py-3 text-xs text-charcoal/80">
      <span className="text-gold shrink-0 mt-0.5">💡</span>
      <span>{children}</span>
    </div>
  )
}

function Badge({ color, label }: { color: 'amber' | 'emerald' | 'rose'; label: string }) {
  const cls = {
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rose: 'bg-rose-50 text-rose-600 border-rose-200',
  }[color]
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
      {label}
    </span>
  )
}

function BtnExample({ style, children }: { style?: React.CSSProperties; className?: string; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
      style={style}
    >
      {children}
    </span>
  )
}

export default function GuiaPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* ── Header ── */}
      <div className="text-center sm:text-left">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-garnet text-cream flex items-center justify-center shadow-sm shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">Guía de Uso</h1>
            <p className="text-sm text-warm-gray font-sans">Panel de Administración · Rebeca Pinto Camacho</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-charcoal/80 font-sans leading-relaxed bg-cream-dark/50 border border-border/50 rounded-xl px-4 py-3">
          ¡Hola Rebeca! 👋 Esta guía te explica cómo usar tu panel de administración paso a paso. 
          Puedes volver aquí cuando tengas dudas.
        </p>
      </div>

      {/* ── Tabla de contenido ── */}
      <div className="bg-white border border-border/60 rounded-3xl p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <p className="text-xs text-garnet uppercase font-black tracking-widest mb-4 font-sans flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold"></span> Índice de Contenidos
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-sans relative z-10">
          {[
            { href: '#citas', label: '1. Gestión de citas' },
            { href: '#estados', label: '2. Estados de cita' },
            { href: '#contacto', label: '3. Contactar al cliente' },
            { href: '#pago', label: '4. Datos de pago' },
            { href: '#horarios', label: '5. Horarios y disponibilidad' },
            { href: '#faq', label: '6. Preguntas frecuentes' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-charcoal bg-cream/40 hover:bg-garnet/5 border border-transparent hover:border-garnet/10 hover:text-garnet transition-all duration-300 group shadow-2xs hover:shadow-sm"
            >
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-xs border border-border/50 group-hover:border-garnet/20">
                <ChevronRight className="w-3 h-3 text-warm-gray group-hover:text-garnet transition-colors" />
              </div>
              <span className="font-medium">{label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── 1. Gestión de citas ── */}
      <Section id="citas" icon={CalendarDays} title="1. Gestión de Citas">
        <p>
          En la pantalla principal del panel verás todas las solicitudes de cita que han llegado desde tu web.
          Cada tarjeta muestra el nombre del cliente, la fecha y hora solicitada, y el trámite.
        </p>

        <div>
          <p className="font-semibold text-charcoal mb-2">¿Cómo navegar la lista?</p>
          <ul className="space-y-2">
            <Step n={1} text="Usa la barra de búsqueda para encontrar un cliente por nombre, email, teléfono o tipo de trámite." />
            <Step n={2} text='Filtra por estado (Todas, Pendiente, Confirmada, Cancelada) usando los botones de arriba de la lista.' />
            <Step n={3} text='Haz clic en "Ver contacto y acciones" en cualquier tarjeta para expandirla y ver todos los botones de acción.' />
            <Step n={4} text='Haz clic en "Detalle" para abrir la ficha completa del cliente en una ventana emergente.' />
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 items-center text-xs font-sans">
          <span className="text-warm-gray font-medium">Botones disponibles:</span>
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border bg-white text-charcoal text-[11px] font-semibold">
            <Eye className="w-3.5 h-3.5 text-garnet" /> Detalle
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white shadow-sm text-[11px] font-bold">
            <CheckCircle className="w-3 h-3" /> Confirmar
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600 text-white shadow-sm text-[11px] font-bold">
            <Trash2 className="w-3 h-3" /> Eliminar
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-border text-charcoal shadow-sm text-sm font-medium rounded-xl">
            <RefreshCw className="w-4 h-4 text-garnet" /> Actualizar
          </span>
        </div>

        <Tip>
          Pulsa el botón <strong>Actualizar</strong> en la esquina superior derecha para recargar la lista
          si llevas un rato sin abrir el panel y quieres ver las nuevas reservas.
        </Tip>
      </Section>

      {/* ── 2. Estados ── */}
      <Section id="estados" icon={CheckCircle} title="2. Estados de Cita">
        <p>Cada cita puede estar en uno de estos tres estados:</p>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
            <Badge color="amber" label="Pendiente" />
            <p className="text-xs leading-relaxed">
              La cita acaba de llegar. El cliente ha enviado la solicitud pero tú aún no la has revisado ni
              confirmado. <strong>Es el estado inicial de todas las nuevas citas.</strong>
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <Badge color="emerald" label="Confirmada" />
            <p className="text-xs leading-relaxed">
              Has revisado la cita y la has confirmado. Normalmente esto se hace después de que el cliente
              haya enviado el comprobante de pago de los 50&nbsp;€.
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50 border border-rose-200">
            <Badge color="rose" label="Cancelada" />
            <p className="text-xs leading-relaxed">
              La cita ha sido cancelada, ya sea porque el cliente no pagó, necesita otro día, o por cualquier
              otro motivo.
            </p>
          </div>
        </div>

        <div>
          <p className="font-semibold text-charcoal mb-2">¿Cómo cambiar el estado?</p>
          <ul className="space-y-2">
            <Step n={1} text='Expande la tarjeta de la cita haciendo clic en "Ver contacto y acciones".' />
            <Step n={2} text='Usa los botones de color: verde (Confirmar), rojo (Cancelar), gris (Pendiente).' />
            <Step n={3} text='También puedes cambiar el estado desde la ventana de Detalle.' />
          </ul>
        </div>

        <Tip>
          Cambia la cita a <strong>Confirmada</strong> solo cuando hayas recibido el pago del cliente.
          Así tienes un registro claro de quién ha pagado y quién no.
        </Tip>
      </Section>

      {/* ── 3. Contactar ── */}
      <Section id="contacto" icon={MessageSquare} title="3. Contactar al Cliente">
        <p>
          Desde cada cita tienes acceso rápido a múltiples formas de contactar al cliente. Solo tienes que
          expandir la tarjeta y verás estos botones:
        </p>

        <div className="space-y-3">
          <div className="p-3 rounded-xl border border-border/60 bg-cream-dark/30 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-white shadow-sm" style={{ background: '#25D366' }}>
                Saludar
              </span>
              <span className="text-xs text-warm-gray font-medium">— WhatsApp</span>
            </div>
            <p className="text-xs text-charcoal/80 leading-relaxed">
              Abre WhatsApp con un mensaje amigable de saludo al cliente, recordándole su cita y preguntando
              si tiene alguna duda. Úsalo cuando quieras hacer un primer contacto o recordatorio.
            </p>
          </div>

          <div className="p-3 rounded-xl border border-border/60 bg-cream-dark/30 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-white shadow-sm" style={{ background: '#128C7E' }}>
                Confirmar + datos pago
              </span>
              <span className="text-xs text-warm-gray font-medium">— WhatsApp</span>
            </div>
            <p className="text-xs text-charcoal/80 leading-relaxed">
              Envía un mensaje completo al cliente confirmando la fecha y hora de su cita, e incluye los
              datos bancarios para el pago (IBAN, Titular, Bizum). Úsalo cuando quieras pedir el pago.
            </p>
          </div>

          <div className="p-3 rounded-xl border border-border/60 bg-cream-dark/30 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-indigo-600 text-white shadow-sm">
                <CreditCard className="w-3 h-3" /> Enviar datos de pago
              </span>
              <span className="text-xs text-warm-gray font-medium">— WhatsApp</span>
            </div>
            <p className="text-xs text-charcoal/80 leading-relaxed">
              Solo envía los datos bancarios (IBAN, Titular, Bizum) sin más texto. Úsalo cuando el cliente
              ya sabe de la cita pero necesita los datos para pagar.
            </p>
          </div>

          <div className="p-3 rounded-xl border border-border/60 bg-cream-dark/30 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-garnet text-cream shadow-sm">
                <Mail className="w-3 h-3" /> Email
              </span>
              <span className="text-xs text-warm-gray font-medium">— Correo electrónico</span>
            </div>
            <p className="text-xs text-charcoal/80 leading-relaxed">
              Abre tu aplicación de correo con un email ya redactado para el cliente, incluyendo la
              confirmación de cita y los datos de pago. Útil cuando el cliente prefiere el email.
            </p>
          </div>

          <div className="p-3 rounded-xl border border-border/60 bg-cream-dark/30 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-amber-500 text-white shadow-sm">
                <Bell className="w-3 h-3" /> Notificarme
              </span>
              <span className="text-xs text-warm-gray font-medium">— WhatsApp a ti misma</span>
            </div>
            <p className="text-xs text-charcoal/80 leading-relaxed">
              Te envía un WhatsApp a <strong>tu propio número</strong> con un resumen de la cita (nombre del
              cliente, fecha, hora, trámite). Útil para guardarte un recordatorio o para reenviar a un
              asistente.
            </p>
          </div>
        </div>

        <Tip>
          Cuando llega una nueva reserva, el sistema intentará abrirte WhatsApp automáticamente con
          la información del cliente. Asegúrate de tener WhatsApp Web abierto en tu ordenador para
          que funcione sin problemas.
        </Tip>
      </Section>

      {/* ── 4. Datos de pago ── */}
      <Section id="pago" icon={CreditCard} title="4. Datos de Pago">
        <p>Estos son los datos bancarios que se incluyen en todos los mensajes de pago:</p>

        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="w-4 h-4 text-indigo-600" />
            <span className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Datos Bancarios</span>
          </div>
          <div className="space-y-1.5 font-sans text-sm">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <span className="text-indigo-400 text-xs font-semibold uppercase">Banco:</span>
              <span className="text-indigo-900 font-medium">Caixabank</span>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <span className="text-indigo-400 text-xs font-semibold uppercase">Titular:</span>
              <span className="text-indigo-900 font-medium">Rebeca Andreina Pinto Camacho</span>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <span className="text-indigo-400 text-xs font-semibold uppercase">IBAN:</span>
              <span className="text-indigo-900 font-mono font-bold">ES46 2100 2202 6002 0055 8272</span>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <span className="text-indigo-400 text-xs font-semibold uppercase">Bizum:</span>
              <span className="text-indigo-900 font-bold">687 20 24 99</span>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <span className="text-indigo-400 text-xs font-semibold uppercase">Importe:</span>
              <span className="text-indigo-900 font-bold">50 €</span>
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold text-charcoal mb-2">Flujo recomendado para cobrar una cita:</p>
          <ol className="space-y-2">
            <Step n={1} text='Cuando llegue una nueva solicitud, expande la tarjeta y pulsa "Confirmar + datos pago" para enviarle al cliente la fecha confirmada junto con los datos bancarios.' />
            <Step n={2} text='Espera a que el cliente te envíe el comprobante de pago por WhatsApp.' />
            <Step n={3} text='Una vez recibido el pago, vuelve al panel y marca la cita como "Confirmada" usando el botón verde.' />
          </ol>
        </div>

        <Tip>
          Recuerda pedir siempre el <strong>concepto de pago</strong>: "Consulta + nombre completo". Así podrás
          identificar fácilmente los pagos en tu cuenta bancaria.
        </Tip>
      </Section>

      {/* ── 5. Horarios ── */}
      <Section id="horarios" icon={Clock} title="5. Horarios y Disponibilidad">
        <p>
          En la sección <strong>Horarios y Bloques</strong> (accesible desde el menú lateral) puedes configurar
          los días y las horas que estarán disponibles en el selector de la web pública.
        </p>

        <div>
          <p className="font-semibold text-charcoal mb-2">Configuración General</p>
          <ul className="space-y-2">
            <Step n={1} text='Elige tu hora de inicio, tu hora de fin, y la duración de cada consulta (30 o 60 minutos).' />
            <Step n={2} text='Selecciona los días de la semana en los que atiendes consultas marcándolos en color.' />
            <Step n={3} text='Al guardar, se generarán automáticamente los bloques para cada día del mes actual y futuro.' />
          </ul>
        </div>

        <div>
          <p className="font-semibold text-charcoal mb-2">Bloquear Días o Horas Específicas</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
              <span className="leading-relaxed">
                <strong>Días inhabilitados (Vacaciones/Festivos):</strong> Usa el selector de fecha para añadir un día específico en el que no vas a trabajar. Ningún bloque estará disponible ese día.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
              <span className="leading-relaxed">
                <strong>Eliminar horas sueltas (Media jornada, descanso):</strong> En la <em>Vista Previa de Horarios</em> (columna derecha), puedes hacer clic en la <strong>"X"</strong> que aparece al pasar el ratón por encima de un bloque (ej. 14:00 h). Esto borrará ese horario de la disponibilidad de todos los días. Puedes restaurarlos haciendo clic en el botón de "Restaurar bloques".
              </span>
            </li>
          </ul>
        </div>

        <Tip>
          Cualquier cambio que realices y guardes, se sincronizará <strong>inmediatamente</strong> en la web para los clientes. Al reservar una cita, el bloque correspondiente desaparecerá solo en ese día.
        </Tip>
      </Section>

      {/* ── 6. FAQ ── */}
      <Section id="faq" icon={HelpCircle} title="6. Preguntas Frecuentes">
        <div className="space-y-4">
          {[
            {
              q: '¿Cómo sé cuando llega una nueva solicitud de cita?',
              a: 'Al confirmarse la reserva en la web, el sistema abre automáticamente WhatsApp con un mensaje listo para enviarte a ti misma. También puedes actualizar la lista manualmente pulsando el botón "Actualizar" en el panel.',
            },
            {
              q: '¿Puedo usar el panel desde el móvil?',
              a: 'Sí, el panel está diseñado para funcionar en móvil, tablet y ordenador. Usa el botón de menú (≡) en la esquina superior izquierda para navegar.',
            },
            {
              q: '¿Qué pasa si borro una cita por error?',
              a: 'Lamentablemente no hay forma de recuperar una cita eliminada. Te recomendamos usar "Cancelar" en vez de "Eliminar" para mantener el historial.',
            },
            {
              q: '¿Los mensajes de WhatsApp se envían automáticamente?',
              a: 'No exactamente. Los botones abren WhatsApp con el mensaje ya escrito, pero tú debes pulsar "Enviar" para mandarlo. Así tienes control total sobre cada mensaje.',
            },
            {
              q: '¿Puedo ver las citas del pasado?',
              a: 'Sí, todas las citas permanecen en el panel hasta que las elimines manualmente. Puedes filtrar por estado o buscar por nombre para encontrar registros antiguos.',
            },
            {
              q: '¿Cómo accedo al panel si estoy fuera de casa?',
              a: 'El panel está en tu web en /admin/login. Accede desde cualquier dispositivo con tu email y contraseña. La sesión dura varios días, así que no tendrás que iniciar sesión constantemente.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-border/40 pb-4 last:border-0 last:pb-0">
              <p className="font-semibold text-charcoal mb-1.5 flex items-start gap-2">
                <span className="text-garnet shrink-0 mt-0.5">?</span>
                {q}
              </p>
              <p className="text-xs text-charcoal/80 leading-relaxed ml-5">{a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Footer ── */}
      <div className="text-center py-4 text-xs text-warm-gray font-sans">
        <Smartphone className="w-4 h-4 inline-block mr-1.5 mb-0.5" />
        ¿Tienes algún problema técnico? Contacta con tu desarrollador web.
      </div>
    </div>
  )
}
