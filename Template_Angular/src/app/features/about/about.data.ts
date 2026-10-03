// ============================================================
// Contenido de la sección "Nosotros". Edita aquí textos,
// integrantes y enlaces sin tocar la plantilla.
// ============================================================

export interface Pillar {
  label: string;
  text: string;
}

export interface Member {
  name: string;
  role: string;
  photo: string;     // ruta dentro de /public
  linkedin: string;
  skills: string[];
}

export const PILLARS: Pillar[] = [
  {
    label: 'Propósito',
    text: 'Cultivamos soluciones al servicio de las personas a través de la innovación y la tecnología responsable.',
  },
  {
    label: 'Misión',
    text: 'Co-creamos el camino digital que impulsa negocios y conecta personas.',
  },
  {
    label: 'Visión',
    text: 'Aceleramos la digitalización de empresas que necesitan crecer y competir en el mercado actual.',
  },
];

/**
 * Los seis fundadores. Todos tienen el mismo peso: en la sección
 * se colocan en un círculo, a la misma distancia del centro.
 */
export const FOUNDERS: Member[] = [
  {
    name: 'Juan Barraza',
    role: 'Business Developer',
    photo: '/team/juan-barraza.webp',
    linkedin: 'https://www.linkedin.com/in/juanibarraza/',
    skills: ['Análisis de procesos', 'Visión de negocio', 'Identificación de oportunidades'],
  },
  {
    name: 'Diego García',
    role: 'Product Owner',
    photo: '/team/diego-garcia.webp',
    linkedin: 'https://www.linkedin.com/in/diego-garcia-r/',
    skills: ['Gestión ágil', 'Control de calidad y tiempos', 'Traductor de ideas'],
  },
  {
    name: 'Saúl Salas',
    role: 'Marketing',
    photo: '/team/saul-salas.webp',
    linkedin: 'https://www.linkedin.com/in/saul-salas-fabricacion-digital/',
    skills: ['IA para uso corporativo', 'Diagnóstico empresarial', 'SEO'],
  },
  {
    name: 'Daniel Roa',
    role: 'Development Leader',
    photo: '/team/daniel-roa.webp',
    linkedin: 'https://www.linkedin.com/in/daniel-fernando-roa-avila/',
    skills: ['Desarrollo a medida', 'Automatización inteligente', 'Código limpio y eficiente'],
  },
  {
    name: 'Diego Amieva',
    role: 'Infrastructure Architect',
    photo: '/team/diego-amieva.webp',
    linkedin: 'https://www.linkedin.com/in/diego-amieva-alvarado/',
    skills: ['Entornos cloud (nube)', 'Ciberseguridad', 'Escalabilidad'],
  },
  {
    name: 'Jesús Ruano',
    role: 'Full Stack Developer',
    photo: '/team/jesus-ruano.webp',
    linkedin: 'https://www.linkedin.com/in/jesus-omar-ruano-5443b6227/',
    skills: ['Diseño UX/UI', 'Integraciones', 'Migración de tecnologías'],
  },
];
