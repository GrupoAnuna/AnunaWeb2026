// ============================================================
// Proyectos de la sección "Casos de éxito". Para agregar uno,
// copia un bloque y guarda su imagen en /public/cases/.
// ============================================================

export interface CaseStudy {
  name: string;
  category: string;
  description: string;
  tags: string[];
  url: string;
  image: string; // ruta dentro de /public
}

export const CASES: CaseStudy[] = [
  {
    name: 'MC Manus',
    category: 'Plataforma a medida',
    description:
      'Plataforma personal y profesional centrada en la asesoría financiera y patrimonial, operada por la Wealth Engineer Erica McManu',
    tags: ['Informativa', 'Finanzas', 'Estilo de vida'],
    url: 'https://www.mcmanus.mx/',
    image: '/cases/mcmanus.webp',
  },
  {
    name: 'El Mundo Exterior',
    category: 'E-commerce Retail',
    description:
      'Tienda online especializada en coleccionismo y entretenimiento. Integración completa de inventario masivo y pasarelas de pago seguras.',
    tags: ['Shopify Expert', 'Ventas 24/7', 'UX/UI'],
    url: 'https://elmundoexterior.com/',
    image: '/cases/el-mundo-exterior.webp',
  },
  {
    name: 'Las Corzuelas horse',
    category: 'Plataforma a medida',
    description:
      'Sitio web para empresa especializada en el transporte aéreo internacional de caballos de alto rendimiento (para polo, salto, adiestramiento y carreras).',
    tags: ['Informativa', 'Finanzas', 'Estilo de vida'],
    url: 'https://lascorzuelashorsetransport.com/',
    image: '/cases/corzuelas.webp',
  },
  {
    name: 'Resha',
    category: 'E-commerce Retail',
    description:
      'Experiencia de compra fluida para productos gourmet. Diseño enfocado en transmitir frescura, confianza y aumentar la tasa de conversión.',
    tags: ['Shopify', 'Branding', 'Conversión'],
    url: 'https://resha.com.mx/',
    image: '/cases/resha.webp',
  },
  {
    name: 'Tuna Tunaria',
    category: 'E-commerce',
    description:
      'Tienda online especializada en instrumentos y accesorios musicales. Diseño inmersivo con navegación fluida y CTA optimizado para maximizar la tasa de conversión.',
    tags: ['E-commerce', 'Conversión', 'UX/UI'],
    url: 'https://tunatunaria.com/',
    image: '/cases/tuna-tunaria.webp',
  },
  {
    name: 'Fab Jardin',
    category: 'Landing page',
    description:
      'Plataforma digital para laboratorio de fabricación (FabLab). Arquitectura visual moderna diseñada para destacar su ecosistema de maquinaria, servicios de prototipado y atraer nuevos creadores.',
    tags: ['Innovación', 'Landing Page', 'Diseño Moderno'],
    url: 'https://fabjardin.com/',
    image: '/cases/fab-jardin.webp',
  },
];

// ============================================================
// Apps móviles. Para agregar una, copia un bloque y guarda su
// captura vertical en /public/cases/app/ (ej. 1080 × 2340 px).
// Si una app no tiene captura todavía, deja "image" vacío y se
// mostrará una pantalla ilustrada con el color de la app.
// Si la lista queda vacía, la pestaña "Apps móviles" se oculta.
// ============================================================

export interface AppCase {
  name: string;
  category: string;
  description: string;
  tags: string[];
  platforms: ('iOS' | 'Android')[];
  color: string;        // color principal de la app (para la pantalla ilustrada)
  image?: string;       // captura vertical dentro de /public (opcional)
  appStore?: string;    // enlace a la App Store (opcional)
  googlePlay?: string;  // enlace a Google Play (opcional)
}

export const APP_CASES: AppCase[] = [
  {
    name: 'Flat Flow',
    category: 'App móvil',
    description: 'App para organizar eventos, tareas, gastos y chat con tus roommies/padres, hijos etc',
    tags: ['Estilo de vida', 'Organización', 'Productividad'],
    platforms: ['iOS', 'Android'],
    color: '#4A6670',
    image: '/cases/app/Flat-Flowapp.webp',
  },
  {
    name: 'Otra app de ejemplo',
    category: 'App empresarial',
    description: 'Reemplaza este texto. Puedes añadir los enlaces de App Store y Google Play para que aparezcan los botones de descarga.',
    tags: ['Plantilla', 'Reemplazar'],
    platforms: ['Android'],
    color: '#FF6B35',
  },
];

// ============================================================
// Versión en inglés. Solo cambian categoría, descripción y
// etiquetas; nombre, enlace e imagen se toman de la versión en español.
// ============================================================

const CASES_EN_TEXT: Pick<CaseStudy, 'category' | 'description' | 'tags'>[] = [
  {
    category: 'Custom platform',
    description:
      'Personal and professional platform focused on financial and wealth advisory, operated by Wealth Engineer Erica McManu.',
    tags: ['Informational', 'Finance', 'Lifestyle'],
  },
  {
    category: 'Retail e-commerce',
    description:
      'An online store specialized in collectibles and entertainment, with full integration of a large inventory and secure payment gateways.',
    tags: ['Shopify Expert', '24/7 Sales', 'UX/UI'],
  },
  {
    category: 'Custom platform',
    description:
      'Website for a company specialized in international air transport for high-performance horses (polo, jumping, dressage, and racing).',
    tags: ['Informational', 'Finance', 'Lifestyle'],
  },
  {
    category: 'Retail e-commerce',
    description:
      'A smooth shopping experience for gourmet products, designed to convey freshness and trust and to increase the conversion rate.',
    tags: ['Shopify', 'Branding', 'Conversion'],
  },
  {
    category: 'E-commerce',
    description:
      'An online store specialized in musical instruments and accessories. Immersive design with smooth navigation and calls to action optimized for conversion.',
    tags: ['E-commerce', 'Conversion', 'UX/UI'],
  },
  {
    category: 'Landing page',
    description:
      'A digital platform for a fabrication laboratory (FabLab). A modern visual architecture designed to showcase its machinery ecosystem, prototyping services, and attract new makers.',
    tags: ['Innovation', 'Landing Page', 'Modern Design'],
  },
];

/** Proyectos web en inglés (mismo orden que CASES) */
export const CASES_EN: CaseStudy[] = CASES.map((c, i) => ({ ...c, ...(CASES_EN_TEXT[i] ?? {}) }));

/**
 * Apps en inglés. Traduce categoría, descripción y etiquetas
 * (mismo orden que APP_CASES).
 */
const APP_CASES_EN_TEXT: Pick<AppCase, 'category' | 'description' | 'tags'>[] = [
  {
    category: 'Mobile app',
    description: 'An app to organize events, tasks, expenses, and chat with roommates, parents, kids, etc.',
    tags: ['Lifestyle', 'Organization', 'Productivity'],
  },
  {
    category: 'Business app',
    description: 'Replace this text. You can add App Store and Google Play links so the download buttons appear.',
    tags: ['Template', 'Replace'],
  },
];

/** Apps móviles en inglés (mismo orden que APP_CASES) */
export const APP_CASES_EN: AppCase[] = APP_CASES.map((a, i) => ({ ...a, ...(APP_CASES_EN_TEXT[i] ?? {}) }));