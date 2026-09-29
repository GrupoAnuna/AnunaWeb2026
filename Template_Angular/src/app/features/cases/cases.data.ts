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
    name: 'New Car Las Heras',
    category: 'Plataforma a medida',
    description:
      'Desarrollo de catálogo digital de vehículos con panel de administración propio. El cliente gestiona stock, fotos y precios en tiempo real sin depender de técnicos.',
    tags: ['Panel Admin', 'Catálogo Digital', 'Angular'],
    url: 'https://www.newcarlasheras.com/',
    image: '/cases/new-car-las-heras.webp',
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
