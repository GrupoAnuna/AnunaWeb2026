// ============================================================
// Contenido de la página "Desarrollo de apps".
// Edita aquí los textos: las secciones los leen de este archivo.
// ============================================================

import type { AnunaIcon } from '../../shared/icon';

/** 1 · Tipos de app (pestañas) */
export interface AppType {
  id: string;
  tab: string;
  icon: AnunaIcon;
  title: string;
  text: string;
  idealFor: string;
  perks: string[];
  badge?: string;
}

export const APP_TYPES: AppType[] = [
  {
    id: 'multiplataforma',
    tab: 'Multiplataforma',
    icon: 'layers',
    title: 'Una sola app para iOS y Android',
    text: 'Una única base de código que se publica en ambas tiendas. Llegas a todos tus clientes con menor inversión y un mantenimiento más simple.',
    idealFor: 'Pymes y proyectos nuevos que quieren estar en todos los teléfonos desde el primer día.',
    perks: ['iOS y Android', 'Menor costo de mantenimiento', 'Lanzamiento más rápido'],
    badge: 'Recomendada para empezar',
  },
  {
    id: 'nativa',
    tab: 'Nativa',
    icon: 'phone',
    title: 'Máximo rendimiento en cada sistema',
    text: 'Desarrollo específico para iOS o Android, con acceso completo al hardware del dispositivo y la experiencia más fluida posible.',
    idealFor: 'Apps que usan cámara, sensores, Bluetooth o gráficos exigentes.',
    perks: ['Rendimiento máximo', 'Acceso total al hardware', 'Experiencia nativa'],
  },
  {
    id: 'pwa',
    tab: 'App web (PWA)',
    icon: 'bolt',
    title: 'Se instala desde el navegador',
    text: 'Una app web progresiva que se agrega a la pantalla de inicio, funciona sin conexión y no necesita pasar por las tiendas.',
    idealFor: 'Validar una idea rápido o llegar a usuarios que no quieren descargar nada.',
    perks: ['Sin tiendas de apps', 'Funciona sin conexión', 'Actualizaciones al instante'],
  },
  {
    id: 'empresa',
    tab: 'App empresarial',
    icon: 'briefcase',
    title: 'Herramientas para tu equipo',
    text: 'Apps internas para ventas en campo, inventario, logística o gestión de pedidos, conectadas a los sistemas que ya usas.',
    idealFor: 'Empresas que quieren digitalizar procesos operativos y dejar atrás el papel y las hojas de cálculo.',
    perks: ['Integración con tu ERP o CRM', 'Roles y permisos', 'Reportes en tiempo real'],
  },
];

/** 2 · Casos de uso (cinta en movimiento) */
export const USE_CASES = [
  'Reservas y citas', 'Delivery', 'Programas de lealtad', 'Tiendas online', 'Inventario',
  'Ventas en campo', 'Portal de clientes', 'Seguimiento de pedidos', 'Educación en línea',
  'Gestión de flotillas', 'Pagos móviles', 'Comunidades',
];

/** 3 · Qué incluye */
export interface Feature {
  icon: AnunaIcon;
  title: string;
  text: string;
  anim: 'bars' | 'ring' | 'pulse' | 'swipe' | 'lift' | 'spin';
  wide?: boolean;
}

export const FEATURES: Feature[] = [
  { icon: 'sparkles', title: 'Diseño UX/UI', text: 'Pantallas claras e intuitivas, pensadas para que tus usuarios lleguen a lo que buscan en pocos toques.', anim: 'bars', wide: true },
  { icon: 'server', title: 'Backend y APIs', text: 'El motor detrás de la app: datos, usuarios e integraciones con tus sistemas.', anim: 'pulse' },
  { icon: 'bell', title: 'Notificaciones push', text: 'Avisos en el momento justo para recuperar ventas y fidelizar.', anim: 'ring' },
  { icon: 'card', title: 'Pagos integrados', text: 'Cobros seguros dentro de la app, sin salir de la experiencia.', anim: 'swipe' },
  { icon: 'upload', title: 'Publicación en tiendas', text: 'Nos encargamos del proceso en App Store y Google Play.', anim: 'lift' },
  { icon: 'refresh', title: 'Soporte y nuevas versiones', text: 'Tu app no se queda quieta: mantenimiento, mejoras y nuevas funciones cuando las necesites.', anim: 'spin', wide: true },
];

/** 4 · Proceso */
export const APP_PROCESS = [
  { title: 'Descubrimiento', text: 'Definimos objetivos, usuarios y las funciones que de verdad importan para la primera versión.' },
  { title: 'Prototipo', text: 'Diseñamos una versión navegable para probar la experiencia antes de escribir código.' },
  { title: 'Desarrollo', text: 'Construimos por etapas y te compartimos versiones de prueba para usar en tu propio teléfono.' },
  { title: 'Pruebas y publicación', text: 'Probamos en dispositivos reales y publicamos en App Store, Google Play o la web.' },
  { title: 'Evolución', text: 'Medimos cómo se usa la app y lanzamos mejoras con base en datos reales.' },
];

/** 5 · Arma tu app */
export interface BuilderOption {
  value: string;
  label: string;
  icon: AnunaIcon;
}

export const PLATFORMS = [
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
  { value: 'web', label: 'Web' },
];

export const BUILDER_FEATURES: BuilderOption[] = [
  { value: 'login', label: 'Registro y acceso', icon: 'lock' },
  { value: 'pagos', label: 'Pagos', icon: 'card' },
  { value: 'push', label: 'Notificaciones', icon: 'bell' },
  { value: 'mapa', label: 'Mapa y ubicación', icon: 'pin' },
  { value: 'chat', label: 'Chat', icon: 'chat' },
  { value: 'reservas', label: 'Reservas y citas', icon: 'calendar' },
  { value: 'catalogo', label: 'Catálogo de productos', icon: 'bag' },
  { value: 'panel', label: 'Panel de administración', icon: 'chart' },
];
