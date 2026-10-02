// ============================================================
// Contenido de la página "IA a medida".
// Los ejemplos de conversación y demos son ilustrativos.
// ============================================================

import type { AnunaIcon } from '../../shared/icon';

/** 1 · Conversación de ejemplo del Hero (tienda ficticia) */
export interface ChatMessage {
  from: 'user' | 'bot';
  text: string;
  source?: string; // dato que la IA "consultó" para responder
  chips?: string[];
}

export const HERO_CHAT: ChatMessage[] = [
  { from: 'user', text: 'Hola, ¿hacen envíos a Monterrey?' },
  { from: 'bot', text: '¡Hola! Sí, enviamos a todo México. A Monterrey llega en 2 a 3 días hábiles.', source: 'Políticas de envío' },
  { from: 'user', text: '¿Tienen café en grano de Chiapas?' },
  { from: 'bot', text: 'Sí, nos quedan 14 bolsas de 500 g. ¿Te aparto una?', source: 'Inventario', chips: ['Sí, apártala', 'Ver precio'] },
];

/** 2 · Demos de la consola */
export interface Demo {
  id: string;
  icon: AnunaIcon;
  label: string;
  prompt: string;
  answer: string[];  // líneas de la respuesta
  chart?: { label: string; value: number }[];
}

export const DEMOS: Demo[] = [
  {
    id: 'atencion', icon: 'chat', label: 'Atención a clientes',
    prompt: '¿Cuál es el horario de la sucursal centro?',
    answer: ['Abrimos de lunes a sábado, de 9:00 a 19:00.', '¿Quieres que te comparta la ubicación en el mapa?'],
  },
  {
    id: 'documentos', icon: 'file', label: 'Documentos',
    prompt: 'Resume este contrato de 12 páginas en 3 puntos.',
    answer: ['• Vigencia: 12 meses, con renovación automática.', '• Pago: mensual, los días 5 de cada mes.', '• Cancelación anticipada: penalización de un mes.'],
  },
  {
    id: 'ventas', icon: 'send', label: 'Ventas',
    prompt: 'Redacta un seguimiento para Laura, que pidió cotización.',
    answer: ['Hola, Laura: gracias por tu interés.', 'Te comparto la cotización que platicamos y quedo atento a cualquier duda.', '¿Te parece si agendamos una llamada esta semana?'],
  },
  {
    id: 'datos', icon: 'chart', label: 'Análisis de datos',
    prompt: '¿Qué producto vendió más este mes?',
    answer: ['El café de Chiapas lideró las ventas, un 31% por encima del segundo lugar.'],
    chart: [
      { label: 'Chiapas', value: 92 },
      { label: 'Veracruz', value: 70 },
      { label: 'Oaxaca', value: 54 },
      { label: 'Puebla', value: 38 },
    ],
  },
];

/** 3 · Flujo: tus datos → tu IA → tus canales */
export const FLOW_SOURCES: { icon: AnunaIcon; label: string }[] = [
  { icon: 'file', label: 'Documentos' },
  { icon: 'users', label: 'Clientes (CRM)' },
  { icon: 'box', label: 'Inventario' },
  { icon: 'mail', label: 'Correo' },
];
export const FLOW_OUTPUTS: { icon: AnunaIcon; label: string }[] = [
  { icon: 'chat', label: 'WhatsApp' },
  { icon: 'globe', label: 'Tu sitio web' },
  { icon: 'briefcase', label: 'Tu equipo' },
];

/** 4 · Qué construimos */
export interface AiSolution {
  icon: AnunaIcon;
  title: string;
  text: string;
  idealFor: string;
  featured?: boolean;
}

export const AI_SOLUTIONS: AiSolution[] = [
  {
    icon: 'bot', title: 'Asistentes virtuales',
    text: 'Chatbots para tu sitio web y WhatsApp que responden con la información real de tu negocio.',
    idealFor: 'atender clientes a cualquier hora sin saturar a tu equipo.', featured: true,
  },
  {
    icon: 'refresh', title: 'Automatización con IA',
    text: 'La IA lee correos, facturas y formularios, y los procesa por ti.',
    idealFor: 'eliminar captura de datos y tareas repetitivas.',
  },
  {
    icon: 'search', title: 'Asistente interno',
    text: 'Tu equipo pregunta y la IA encuentra la respuesta en tus manuales, políticas y documentos.',
    idealFor: 'que nadie pierda tiempo buscando información.',
  },
  {
    icon: 'chart', title: 'Análisis y predicción',
    text: 'Pregúntale a tus datos en lenguaje normal y anticipa ventas, inventario o demanda.',
    idealFor: 'decidir con información, no con corazonadas.',
  },
  {
    icon: 'plug', title: 'IA en tus sistemas',
    text: 'Integramos funciones de IA en el software, la web o la app que ya usas.',
    idealFor: 'sumar inteligencia sin cambiar de herramientas.',
  },
  {
    icon: 'school', title: 'Capacitación en IA',
    text: 'Talleres prácticos para que tu equipo use herramientas de IA de forma segura y productiva.',
    idealFor: 'empezar hoy, con lo que ya está disponible.',
  },
];

/** 5 · IA responsable */
export const PRINCIPLES: { icon: AnunaIcon; title: string; text: string }[] = [
  { icon: 'lock', title: 'Tus datos, bajo tu control', text: 'Configuramos cada solución para que tu información se mantenga privada y solo la usen las personas y procesos autorizados.' },
  { icon: 'hand', title: 'Siempre con supervisión humana', text: 'La IA propone y agiliza; las decisiones importantes las toma tu equipo. Definimos juntos dónde debe intervenir una persona.' },
  { icon: 'eye', title: 'Transparente y medible', text: 'Sabes qué hace tu IA, con qué información responde y cuánto tiempo o dinero te está ahorrando.' },
];

/** 6 · Generador de ideas por área */
export interface IdeaArea {
  id: string;
  label: string;
  icon: AnunaIcon;
  ideas: { icon: AnunaIcon; title: string; text: string }[];
}

export const IDEA_AREAS: IdeaArea[] = [
  {
    id: 'ventas', label: 'Ventas', icon: 'trend',
    ideas: [
      { icon: 'send', title: 'Seguimientos automáticos', text: 'La IA redacta y programa el seguimiento de cada cotización.' },
      { icon: 'users', title: 'Clientes con más probabilidad de compra', text: 'Detecta a quién conviene llamar primero.' },
      { icon: 'wand', title: 'Propuestas en minutos', text: 'Genera propuestas personalizadas a partir de tus plantillas.' },
    ],
  },
  {
    id: 'atencion', label: 'Atención a clientes', icon: 'chat',
    ideas: [
      { icon: 'bot', title: 'Asistente 24/7 en WhatsApp', text: 'Responde dudas frecuentes y escala a una persona cuando hace falta.' },
      { icon: 'search', title: 'Estado de pedidos al instante', text: 'El cliente pregunta y la IA consulta tu sistema.' },
      { icon: 'chart', title: 'Detección de quejas', text: 'Identifica mensajes molestos y los prioriza para tu equipo.' },
    ],
  },
  {
    id: 'operaciones', label: 'Operaciones', icon: 'box',
    ideas: [
      { icon: 'box', title: 'Pronóstico de inventario', text: 'Anticipa qué productos se van a agotar.' },
      { icon: 'file', title: 'Lectura de facturas', text: 'Extrae datos de facturas y los captura en tu sistema.' },
      { icon: 'route', title: 'Rutas y entregas', text: 'Sugiere el mejor orden de entregas del día.' },
    ],
  },
  {
    id: 'administracion', label: 'Administración', icon: 'briefcase',
    ideas: [
      { icon: 'mail', title: 'Clasificación de correos', text: 'Ordena y responde los correos repetitivos.' },
      { icon: 'file', title: 'Resumen de contratos', text: 'Los puntos clave de cualquier documento, en segundos.' },
      { icon: 'calendar', title: 'Minutas de reuniones', text: 'Resume reuniones y reparte las tareas acordadas.' },
    ],
  },
  {
    id: 'marketing', label: 'Marketing', icon: 'sparkles',
    ideas: [
      { icon: 'wand', title: 'Contenido para redes', text: 'Ideas y borradores de publicaciones con la voz de tu marca.' },
      { icon: 'search', title: 'SEO y descripciones', text: 'Descripciones de productos optimizadas para buscadores.' },
      { icon: 'chart', title: 'Análisis de campañas', text: 'Qué funcionó, qué no y por qué, en lenguaje simple.' },
    ],
  },
];
