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
// captura vertical en /public/apps/ (ej. 1080 × 2340 px).
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
  image?: '/cases/app/Flat-Flowapp.webp';       // captura vertical dentro de /public (opcional)
  appStore?: string;    // enlace a la App Store (opcional)
  googlePlay?: string;  // enlace a Google Play (opcional)
}

export const APP_CASES: AppCase[] = [
  // ⚠️ PLANTILLA: reemplaza con una app real antes de publicar
  {
    name: 'Flat Flow',
    category: 'App móvil',
    description: 'App para organizar eventos, tareas, gastos y chat con tus roommies/padres, hijos etc',
    tags: ['Estilo de vida', 'Organización', 'Productividad'],
    platforms: ['iOS', 'Android'],
    color: '#4A6670',
    image: '/cases/app/Flat-Flowapp.webp'
  },
  // ⚠️ PLANTILLA: reemplaza con una app real antes de publicar
  {
    name: 'Otra app de ejemplo',
    category: 'App empresarial',
    description: 'Reemplaza este texto. Puedes añadir los enlaces de App Store y Google Play para que aparezcan los botones de descarga.',
    tags: ['Plantilla', 'Reemplazar'],
    platforms: ['Android'],
    color: '#FF6B35',
    // image: '/cases/app/Flat-login.webp'
  },
];
