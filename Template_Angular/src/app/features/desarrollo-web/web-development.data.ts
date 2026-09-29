// ============================================================
// Contenido de la página "Desarrollo web y aplicaciones web".
// Edita aquí los textos: las secciones los leen de este archivo.
// ============================================================

import type { AnunaIcon } from '../../shared/icon';

export type Path = 'nuevo' | 'existente';
export type IconName = AnunaIcon;

/** 1 · Alcance: qué desarrollamos */
export const SCOPE: { icon: IconName; title: string; text: string }[] = [
  { icon: 'globe', title: 'Páginas web', text: 'Informativas, corporativas y tiendas online (e-commerce).' },
  { icon: 'app', title: 'Aplicaciones web a la medida', text: 'De cualquier tipo o complejidad, hechas para tus procesos.' },
  { icon: 'layers', title: 'WordPress, CMS o código propio', text: 'Elegimos la tecnología que conviene a tu proyecto, no al revés.' },
  { icon: 'route', title: 'Desde cero o desde donde quedó', text: 'Proyectos nuevos o la continuación y reestructuración de sistemas ya iniciados.' },
];

/** 2 · Servicios clave */
export interface KeyService {
  icon: IconName;
  title: string;
  lead: string;
  points: string[];
  paths: Path[];      // para el selector "Desde cero / Ya tengo algo"
  highlight?: boolean; // tarjeta oscura destacada
}

export const KEY_SERVICES: KeyService[] = [
  {
    icon: 'code',
    title: 'Desarrollo a la medida',
    lead: 'Código desde cero o sobre tu arquitectura existente, sin plantillas ni limitaciones.',
    points: ['Arquitectura pensada para crecer', 'Integración con tus sistemas y pasarelas de pago', 'Funcionalidades exactas para tu operación'],
    paths: ['nuevo', 'existente'],
  },
  {
    icon: 'layout',
    title: 'Soluciones CMS / WordPress',
    lead: 'Sitios autoadministrables y ágiles: tu equipo edita el contenido sin depender de técnicos.',
    points: ['Panel de administración fácil de usar', 'Lanzamiento rápido', 'Temas y funciones a la medida'],
    paths: ['nuevo'],
  },
  {
    icon: 'grid',
    title: 'Aplicaciones web complejas',
    lead: 'SaaS, paneles de control y portales empresariales para clientes, equipos o proveedores.',
    points: ['Usuarios, roles y permisos', 'Paneles, reportes e indicadores', 'Automatización de procesos'],
    paths: ['nuevo', 'existente'],
  },
  {
    icon: 'refresh',
    title: 'Rescate y evolución de software',
    lead: '¿Tu proyecto quedó pausado o inconcluso? Lo retomamos, lo estabilizamos y lo hacemos crecer.',
    points: ['Auditoría del código existente', 'Plan de rescate por prioridades', 'Modernización sin empezar de cero'],
    paths: ['existente'],
    highlight: true,
  },
];

export const PATH_MESSAGES: Record<Path, string> = {
  nuevo: 'Diseñamos la arquitectura desde la primera línea de código, pensada para lo que tu negocio necesita hoy y mañana.',
  existente: 'Retomamos tu sistema donde quedó: lo revisamos, corregimos lo urgente y seguimos construyendo sobre lo que ya funciona.',
};

/** 3 · ¿Por qué elegirnos? */
export const ADVANTAGES = [
  {
    title: 'Código limpio',
    text: 'Ordenado, documentado y fácil de mantener. Si mañana cambias de equipo, tu proyecto sigue siendo tuyo.',
  },
  {
    title: 'Escalabilidad',
    text: 'Arquitectura preparada para más usuarios, más productos y nuevas funciones sin reescribirlo todo.',
  },
  {
    title: 'Enfoque de negocio',
    text: 'Cada decisión técnica responde a un objetivo: vender más, ahorrar tiempo o atender mejor a tus clientes.',
  },
];

export const PROOF = ['Respuesta en menos de 12 h', 'Un solo equipo, de la idea al soporte', 'Equipo en España y América Latina'];

/** 4 · Proceso de trabajo */
export const PROCESS = [
  {
    title: 'Diagnóstico',
    text: 'Entendemos tu negocio, tus objetivos y lo que ya existe.',
    deliverable: 'Alcance y propuesta clara',
  },
  {
    title: 'Diseño',
    text: 'Prototipamos las pantallas clave para validarlas antes de programar.',
    deliverable: 'Prototipo navegable',
  },
  {
    title: 'Desarrollo',
    text: 'Construimos por etapas, con entregas funcionales que puedes probar.',
    deliverable: 'Avances en cada sprint',
  },
  {
    title: 'Entrega',
    text: 'Publicamos, capacitamos a tu equipo y acompañamos el arranque.',
    deliverable: 'Sitio en producción y soporte',
  },
];

/** 5 · Cotizador ágil */
export interface QuoteOption {
  value: string;
  label: string;
  hint: string;
  icon: IconName;
}

export const QUOTE_TYPES: QuoteOption[] = [
  { value: 'web', label: 'Página web', hint: 'Informativa o corporativa', icon: 'globe' },
  { value: 'ecommerce', label: 'Tienda online', hint: 'Vende tus productos 24/7', icon: 'layout' },
  { value: 'app', label: 'Aplicación web', hint: 'SaaS, panel o portal', icon: 'grid' },
  { value: 'rescate', label: 'Rescatar un proyecto', hint: 'Pausado o inconcluso', icon: 'refresh' },
];

export const QUOTE_PLATFORMS: QuoteOption[] = [
  { value: 'cms', label: 'WordPress / CMS', hint: 'Autoadministrable', icon: 'layers' },
  { value: 'codigo', label: 'Código a la medida', hint: 'Sin límites de plataforma', icon: 'code' },
  { value: 'recomendacion', label: 'Recomiéndenme', hint: 'Lo decidimos juntos', icon: 'route' },
];

export const QUOTE_STARTS: QuoteOption[] = [
  { value: 'nuevo', label: 'Desde cero', hint: 'Aún no hay nada construido', icon: 'app' },
  { value: 'existente', label: 'Ya tengo algo', hint: 'Continuar o reestructurar', icon: 'refresh' },
];
