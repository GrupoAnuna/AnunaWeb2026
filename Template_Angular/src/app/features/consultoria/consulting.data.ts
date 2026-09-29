// ============================================================
// Contenido de la página "Consultoría".
// Edita aquí los textos: las secciones los leen de este archivo.
// ============================================================

import type { AnunaIcon } from '../../shared/icon';

/** 1 · ¿Te suena familiar? (tarjetas que se voltean) */
export const PAINS: { icon: AnunaIcon; problem: string; solution: string }[] = [
  {
    icon: 'sheet',
    problem: 'Todo vive en hojas de cálculo',
    solution: 'Centralizamos tu información en un sistema que se actualiza solo y que todo tu equipo puede consultar.',
  },
  {
    icon: 'clock',
    problem: 'Tu equipo repite tareas a mano',
    solution: 'Detectamos qué se puede automatizar para que tu gente dedique su tiempo a lo que sí aporta.',
  },
  {
    icon: 'plug',
    problem: 'Tus sistemas no se hablan',
    solution: 'Diseñamos cómo conectar tus herramientas para que la información fluya sin copiar y pegar.',
  },
  {
    icon: 'help',
    problem: 'No sabes qué herramienta elegir',
    solution: 'Comparamos opciones con criterios claros y te recomendamos la que conviene a tu tamaño y presupuesto.',
  },
  {
    icon: 'coins',
    problem: 'Invertiste en tecnología que no rinde',
    solution: 'Revisamos lo que ya tienes para aprovecharlo mejor antes de gastar en algo nuevo.',
  },
  {
    icon: 'chart',
    problem: 'Decides sin datos confiables',
    solution: 'Definimos qué medir y cómo verlo en tableros simples, para decidir con información real.',
  },
];

/** 2 · Áreas de consultoría (acordeón + entregable) */
export interface Area {
  icon: AnunaIcon;
  title: string;
  text: string;
  points: string[];
  deliverable: string;
  preview: 'bars' | 'roadmap' | 'flow' | 'ideas' | 'compare';
}

export const AREAS: Area[] = [
  {
    icon: 'search',
    title: 'Diagnóstico digital',
    text: 'Una radiografía de cómo opera tu negocio hoy: procesos, herramientas, equipo y datos.',
    points: ['Entrevistas con tu equipo', 'Revisión de herramientas actuales', 'Detección de cuellos de botella'],
    deliverable: 'Informe de diagnóstico',
    preview: 'bars',
  },
  {
    icon: 'route',
    title: 'Hoja de ruta de transformación',
    text: 'Priorizamos qué hacer primero, qué después y cuánto costará cada etapa.',
    points: ['Prioridades por impacto y esfuerzo', 'Etapas con costos estimados', 'Metas medibles por etapa'],
    deliverable: 'Hoja de ruta por etapas',
    preview: 'roadmap',
  },
  {
    icon: 'refresh',
    title: 'Automatización de procesos',
    text: 'Identificamos las tareas repetitivas y diseñamos cómo automatizarlas paso a paso.',
    points: ['Mapa de tus procesos actuales', 'Tareas que se pueden automatizar', 'Estimación del tiempo que recuperas'],
    deliverable: 'Mapa de procesos',
    preview: 'flow',
  },
  {
    icon: 'sparkles',
    title: 'IA aplicada a tu negocio',
    text: 'Te mostramos dónde la inteligencia artificial genera valor real en tu operación, sin promesas vacías.',
    points: ['Casos de uso reales para tu sector', 'Herramientas listas para usar', 'Capacitación para tu equipo'],
    deliverable: 'Casos de uso de IA priorizados',
    preview: 'ideas',
  },
  {
    icon: 'target',
    title: 'Selección de tecnología',
    text: 'Te ayudamos a elegir software, plataformas o proveedores con criterios objetivos.',
    points: ['Comparativa de opciones', 'Costos a corto y largo plazo', 'Recomendación final argumentada'],
    deliverable: 'Comparativa y recomendación',
    preview: 'compare',
  },
];

/** 3 · Formas de trabajar */
export interface Format {
  step: string;
  icon: AnunaIcon;
  title: string;
  text: string;
  idealFor: string; // se muestra como "Ideal si …"
  includes: string[];
  tag?: string;
  highlight?: boolean;
}

export const FORMATS: Format[] = [
  {
    step: 'Empieza aquí',
    icon: 'chat',
    title: 'Sesión de diagnóstico',
    text: 'Una reunión para entender tu situación y darte las primeras recomendaciones.',
    idealFor: 'quieres saber por dónde empezar.',
    includes: ['Reunión con un especialista', 'Primeras recomendaciones', 'Siguientes pasos claros'],
    tag: 'Sin costo',
  },
  {
    step: 'Profundiza',
    icon: 'file',
    title: 'Proyecto de consultoría',
    text: 'Diagnóstico completo, hoja de ruta y plan de acción listos para ejecutar.',
    idealFor: 'vas a invertir en tecnología y quieres hacerlo bien desde el principio.',
    includes: ['Diagnóstico completo', 'Hoja de ruta por etapas', 'Presentación con tu equipo'],
    highlight: true,
  },
  {
    step: 'Crece acompañado',
    icon: 'users',
    title: 'Acompañamiento continuo',
    text: 'Te acompañamos mes a mes en la ejecución, como tu área de tecnología externa.',
    idealFor: 'no tienes un equipo técnico propio.',
    includes: ['Reuniones periódicas', 'Seguimiento de proveedores', 'Ajustes al plan en el camino'],
  },
];

/** 4 · Autodiagnóstico */
export interface QuizQuestion {
  question: string;
  options: string[];      // de menor (0 pts) a mayor madurez (2 pts)
  recommendation: string; // se sugiere si esta respuesta obtiene puntaje bajo
}

export const QUIZ: QuizQuestion[] = [
  {
    question: '¿Dónde vive la información de tu negocio?',
    options: ['En papel o en la computadora de cada quien', 'En hojas de cálculo compartidas', 'En un sistema central'],
    recommendation: 'Centralizar tu información en un solo lugar.',
  },
  {
    question: '¿Cuánto trabajo manual repite tu equipo?',
    options: ['Mucho, casi todo es a mano', 'Algo, hay tareas que se repiten', 'Poco, lo principal está automatizado'],
    recommendation: 'Automatizar las tareas que más tiempo consumen.',
  },
  {
    question: '¿Tus herramientas están conectadas entre sí?',
    options: ['No, copiamos datos a mano', 'Algunas sí, otras no', 'Sí, la información fluye sola'],
    recommendation: 'Conectar tus herramientas para dejar de copiar y pegar.',
  },
  {
    question: '¿Cómo tomas las decisiones importantes?',
    options: ['Por intuición y experiencia', 'Con reportes que armamos a mano', 'Con tableros siempre actualizados'],
    recommendation: 'Tener tableros con los números clave de tu negocio.',
  },
  {
    question: '¿Cómo te encuentran tus clientes en línea?',
    options: ['Casi no tengo presencia digital', 'Por redes sociales o un sitio básico', 'Con un sitio o app que vende y atiende'],
    recommendation: 'Fortalecer tu presencia digital para vender y atender en línea.',
  },
];

export const LEVELS = [
  {
    max: 3,
    title: 'Punto de partida',
    text: 'Tu negocio tiene mucho potencial por aprovechar. La buena noticia: con pocos cambios bien elegidos, vas a notar la diferencia rápido.',
  },
  {
    max: 7,
    title: 'En camino',
    text: 'Ya diste pasos importantes. Ahora toca conectar las piezas y ordenar prioridades para que la tecnología trabaje a tu favor.',
  },
  {
    max: 10,
    title: 'Avanzado',
    text: '¡Vas muy bien! Tu siguiente paso es optimizar y usar tus datos (y la IA) para tomar ventaja frente a tu competencia.',
  },
];
