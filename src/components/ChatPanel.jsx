import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useChat } from '../context/ChatContext.jsx';

// Backend aún por definir: si VITE_CHAT_WEBHOOK_URL existe, el lead se
// envía ahí; si no, queda solo en consola para no romper el flujo en dev.
const WEBHOOK_URL = import.meta.env.VITE_CHAT_WEBHOOK_URL || '';

const STEPS = [
  { key: 'intro', bot: '¡Hola! 👋 Soy el asistente de Clapi. Voy a hacerte unas preguntas rápidas para que nuestro equipo pueda ayudarte mejor.' },
  { key: 'nombre', bot: '¿Cómo te llamas?', input: 'text', placeholder: 'Tu nombre' },
  {
    key: 'perfil',
    bot: '¿Tienes empresa o eres profesional independiente?',
    input: 'choice',
    options: ['Tengo empresa', 'Soy independiente'],
  },
  {
    key: 'area',
    bot: '¿En qué área sientes que pierdes más tiempo?',
    input: 'choice',
    options: ['Atención al cliente', 'Gestión de pedidos', 'Reportes y datos', 'Tareas administrativas', 'Otro'],
  },
  {
    key: 'areaDetalle',
    bot: 'Cuéntanos brevemente.',
    input: 'text',
    placeholder: 'En qué pierdes más tiempo',
    // Solo aplica si el paso anterior se respondió "Otro" — en cualquier
    // otro caso el paso se salta sin mostrar el mensaje.
    skipIf: (answers) => answers.area !== 'Otro',
  },
  {
    key: 'claridad',
    bot: '¿Ya sabes qué quieres automatizar o necesitas ayuda para identificarlo?',
    input: 'choice',
    options: ['Ya sé qué necesito', 'Necesito ayuda para identificarlo'],
  },
  {
    key: 'contacto',
    bot: 'Déjanos tu WhatsApp o correo y te contactamos en menos de 24 horas.',
    input: 'text',
    placeholder: 'WhatsApp o correo',
  },
  { key: 'final', bot: '¡Listo! 🎉 Nuestro equipo te contactará pronto. Gracias por confiar en Clapi.' },
];

function initialState() {
  return { log: [], stepIndex: 0, answers: {} };
}

/**
 * Payload con nombres estables e independientes de las claves internas de
 * los pasos: quien consuma el webhook no debería romperse si mañana se
 * renombra o reordena una pregunta.
 */
function buildPayload(answers, origen) {
  return {
    nombre: answers.nombre ?? null,
    tipo: answers.perfil ?? null,
    area: answers.area ?? null,
    areaDetalle: answers.areaDetalle ?? null,
    claridad: answers.claridad ?? null,
    contacto: answers.contacto ?? null,
    timestamp: new Date().toISOString(),
    pagina: origen,
  };
}

async function submitLead(payload) {
  if (!WEBHOOK_URL) {
    console.info('[Clapi] Lead capturado (sin webhook configurado):', payload);
    return;
  }
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    console.error('[Clapi] No se pudo enviar el lead al webhook.');
  }
}

export default function ChatPanel() {
  const { isOpen, closeChat } = useChat();
  const [state, setState] = useState(initialState);
  const [textValue, setTextValue] = useState('');
  const scrollRef = useRef(null);
  // Índice del último paso cuyo mensaje de bot ya se agregó al log — evita
  // reprogramar el mismo mensaje cuando el efecto se re-ejecuta por otros
  // cambios de estado (p. ej. React StrictMode montando el efecto dos veces).
  const shownRef = useRef(-1);
  // Página desde la que se abrió el chat. Se captura al abrir y no al
  // enviar: para cuando el usuario termina la conversación puede haber
  // navegado a otra ruta, y lo que interesa al equipo es dónde estaba
  // cuando decidió escribir.
  const originRef = useRef('');

  // Reinicia la conversación cada vez que se abre el panel.
  useEffect(() => {
    if (isOpen) {
      setState(initialState());
      setTextValue('');
      shownRef.current = -1;
      originRef.current = window.location.pathname + window.location.search;
    }
  }, [isOpen]);

  // Pasos condicionales (hoy solo "Cuéntanos brevemente" tras elegir "Otro"):
  // si no aplican, se saltan antes de que su mensaje llegue a mostrarse.
  useEffect(() => {
    if (!isOpen) return;
    const step = STEPS[state.stepIndex];
    if (step?.skipIf?.(state.answers)) {
      setState((s) => ({ ...s, stepIndex: s.stepIndex + 1 }));
    }
  }, [isOpen, state.stepIndex, state.answers]);

  // Muestra el mensaje de bot del paso actual, con un delay de 1s (300ms
  // para el primero). Un solo mensaje por `stepIndex`, nunca se salta pasos.
  useEffect(() => {
    if (!isOpen || shownRef.current === state.stepIndex) return undefined;
    const step = STEPS[state.stepIndex];
    if (!step || step.skipIf?.(state.answers)) return undefined;

    const delay = state.stepIndex === 0 ? 300 : 1000;
    const timeout = setTimeout(() => {
      shownRef.current = state.stepIndex;
      setState((s) => ({ ...s, log: [...s.log, { from: 'bot', text: step.bot }] }));
    }, delay);

    return () => clearTimeout(timeout);
  }, [isOpen, state.stepIndex]);

  // Los pasos SIN input (intro y mensaje final) avanzan solos una vez que su
  // mensaje ya se mostró. Los pasos con input esperan a `answerCurrentStep`.
  useEffect(() => {
    const step = STEPS[state.stepIndex];
    if (!isOpen || !step || step.input || shownRef.current !== state.stepIndex) return undefined;
    if (state.stepIndex >= STEPS.length - 1) return undefined;

    const timeout = setTimeout(() => {
      setState((s) => ({ ...s, stepIndex: s.stepIndex + 1 }));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isOpen, state.stepIndex, state.log]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [state.log]);

  const currentStep = STEPS[state.stepIndex];
  const waitingForInput = Boolean(currentStep?.input) && shownRef.current === state.stepIndex;

  function answerCurrentStep(value) {
    if (!currentStep) return;
    const key = currentStep.key;
    setState((s) => ({
      ...s,
      answers: { ...s.answers, [key]: value },
      log: [...s.log, { from: 'user', text: value }],
      stepIndex: s.stepIndex + 1,
    }));
    setTextValue('');

    if (key === 'contacto') {
      submitLead(buildPayload({ ...state.answers, contacto: value }, originRef.current));
    }
  }

  function handleTextSubmit(e) {
    e.preventDefault();
    const value = textValue.trim();
    if (!value) return;
    answerCurrentStep(value);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
            onClick={closeChat}
            aria-hidden="true"
          />
          <motion.aside
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-white shadow-[-24px_0_60px_rgba(13,11,20,0.18)]"
            role="dialog"
            aria-modal="true"
            aria-label="Chat con el asistente de Clapi"
          >
            <div className="flex items-center justify-between border-b border-lilac px-6 py-5">
              <p className="text-lg font-semibold text-ink">Asistente Clapi</p>
              <button
                type="button"
                onClick={closeChat}
                aria-label="Cerrar chat"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-mist hover:text-ink"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M3 3L15 15M15 3L3 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
              {state.log.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <p
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.from === 'user' ? 'bg-brand text-white' : 'bg-lilac text-ink'
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}
            </div>

            {waitingForInput && currentStep.input === 'choice' && (
              <div className="flex flex-wrap gap-2 border-t border-lilac px-6 py-5">
                {currentStep.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => answerCurrentStep(opt)}
                    className="rounded-pill border border-brand px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {waitingForInput && currentStep.input === 'text' && (
              <form onSubmit={handleTextSubmit} className="flex gap-2 border-t border-lilac px-6 py-5">
                <input
                  type="text"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder={currentStep.placeholder}
                  autoFocus
                  className="flex-1 rounded-pill border border-lilac px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand"
                />
                <button
                  type="submit"
                  aria-label="Enviar"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 8H14M14 8L9 3M14 8L9 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
