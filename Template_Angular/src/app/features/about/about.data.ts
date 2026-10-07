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
  {
    name: 'Juan Barraza',
    role: 'Business Developer',
    photo: '/team/juan-barraza.webp',
    linkedin: 'https://www.linkedin.com/in/juanibarraza/',
    skills: ['Análisis de procesos', 'Visión de negocio', 'Identificación de oportunidades'],
  },
];


// ============================================================
// Versión en inglés. Los fundadores conservan nombre, foto,
// rol y LinkedIn; solo se traducen sus habilidades.
// ============================================================

export const PILLARS_EN: Pillar[] = [
  { label: 'Purpose', text: 'We grow solutions that serve people through innovation and responsible technology.' },
  { label: 'Mission', text: 'We co-create the digital path that drives businesses forward and connects people.' },
  { label: 'Vision', text: 'We accelerate the digital transformation of companies that need to grow and compete in today’s market.' },
];

const SKILLS_EN: string[][] = [
  ['Process analysis', 'Business vision', 'Spotting opportunities'],
  ['Agile management', 'Quality and timeline control', 'Turning ideas into plans'],
  ['AI for business use', 'Business assessment', 'SEO'],
  ['Custom development', 'Smart automation', 'Clean, efficient code'],
  ['Cloud environments', 'Cybersecurity', 'Scalability'],
  ['UX/UI design', 'Integrations', 'Technology migration'],
];

/** Fundadores en inglés (mismo orden que FOUNDERS) */
export const FOUNDERS_EN: Member[] = FOUNDERS.map((f, i) => ({ ...f, skills: SKILLS_EN[i] ?? f.skills }));
