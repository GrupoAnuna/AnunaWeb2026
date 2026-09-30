// ============================================================
// Contenido de la página "Cloud".
// Objetivo: que quede claro qué es la nube y qué ofrecemos.
// ============================================================

import type { AnunaIcon } from '../../shared/icon';

/** 1 · Comparación: sin nube vs. con nube (misma cantidad de filas) */
export const COMPARE: { icon: AnunaIcon; without: string; with: string }[] = [
  { icon: 'server', without: 'Un servidor en tu oficina que puede fallar en cualquier momento', with: 'Tus sistemas disponibles cuando los necesitas' },
  { icon: 'globe', without: 'Tus archivos solo están en las computadoras de la oficina', with: 'Trabajas desde cualquier lugar y dispositivo' },
  { icon: 'trend', without: 'Si tu negocio crece, tienes que comprar más equipo', with: 'Aumentas capacidad en minutos, sin comprar equipo' },
  { icon: 'database', without: 'Respaldos manuales… cuando alguien se acuerda', with: 'Respaldos automáticos y programados' },
  { icon: 'coins', without: 'Pagas por equipo aunque no lo uses todo', with: 'Pagas solo por lo que realmente usas' },
];

/** 2 · Qué ofrecemos */
export interface CloudService {
  icon: AnunaIcon;
  title: string;
  text: string;
  includes: string[];
  featured?: boolean;
}

export const CLOUD_SERVICES: CloudService[] = [
  {
    icon: 'upload',
    title: 'Migración a la nube',
    text: 'Llevamos tus sistemas, archivos y bases de datos a la nube sin detener tu operación.',
    includes: ['Plan de migración por etapas', 'Traslado seguro de tu información', 'Pruebas antes del cambio final'],
    featured: true,
  },
  {
    icon: 'server',
    title: 'Infraestructura administrada',
    text: 'Configuramos y cuidamos tus servidores para que tú te enfoques en tu negocio.',
    includes: ['Servidores y redes', 'Actualizaciones y parches', 'Monitoreo de rendimiento'],
  },
  {
    icon: 'database',
    title: 'Respaldos y recuperación',
    text: 'Copias automáticas y un plan para volver a operar rápido si algo falla.',
    includes: ['Respaldos programados', 'Pruebas de recuperación', 'Plan ante desastres'],
  },
  {
    icon: 'mail',
    title: 'Correo y colaboración',
    text: 'Correo con el nombre de tu empresa y herramientas para trabajar en equipo desde donde sea.',
    includes: ['Correo con tu dominio', 'Archivos compartidos', 'Alta y configuración de cuentas'],
  },
  {
    icon: 'globe',
    title: 'Hosting de sitios y apps',
    text: 'Publicamos y mantenemos tus sitios y aplicaciones en servidores rápidos y seguros.',
    includes: ['Dominio y certificado de seguridad (SSL)', 'Publicaciones sin interrupciones', 'Capacidad que crece con la demanda'],
  },
  {
    icon: 'coins',
    title: 'Optimización de costos',
    text: 'Revisamos lo que pagas en la nube y eliminamos lo que no necesitas.',
    includes: ['Análisis de consumo', 'Recomendaciones de ahorro', 'Reportes periódicos'],
  },
];

/** 3 · Proceso de migración */
export const MIGRATION = [
  { icon: 'search' as AnunaIcon, title: 'Analizamos', text: 'Revisamos qué sistemas tienes, cómo los usas y qué conviene llevar a la nube.' },
  { icon: 'route' as AnunaIcon, title: 'Planeamos', text: 'Definimos el orden, los tiempos y un plan para volver atrás si algo no sale como esperamos.' },
  { icon: 'upload' as AnunaIcon, title: 'Migramos', text: 'Trasladamos todo por etapas, normalmente fuera de tu horario de trabajo.' },
  { icon: 'users' as AnunaIcon, title: 'Acompañamos', text: 'Te capacitamos y seguimos cuidando tu nube después del cambio.' },
];

/** 4 · Preguntas frecuentes */
export const FAQ = [
  {
    q: '¿Mi información está segura en la nube?',
    a: 'Sí, si se configura bien. Las grandes plataformas de nube invierten en seguridad mucho más de lo que puede hacer una oficina. Nosotros nos encargamos de configurar accesos, cifrado y respaldos para que tu información esté protegida.',
  },
  {
    q: '¿Tengo que dejar de trabajar durante la migración?',
    a: 'No. Planeamos la migración por etapas y hacemos los cambios importantes fuera de tu horario de trabajo, para que tu equipo siga operando con normalidad.',
  },
  {
    q: '¿Cuánto tiempo toma migrar?',
    a: 'Depende de cuántos sistemas y datos tengas. Después del análisis inicial te damos un calendario claro, con fechas para cada etapa.',
  },
  {
    q: '¿La nube es más cara que tener servidores propios?',
    a: 'No necesariamente. Dejas de comprar equipo, pagar su mantenimiento y reemplazarlo cada pocos años. Pagas por lo que usas, y te ayudamos a no pagar de más.',
  },
  {
    q: '¿Qué pasa si después quiero cambiar de proveedor?',
    a: 'Tu información siempre es tuya. Documentamos la configuración y usamos prácticas que facilitan moverte si algún día lo necesitas.',
  },
];

/** 5 · Contacto: situación del cliente */
export const SITUATIONS: { value: string; icon: AnunaIcon; label: string; hint: string }[] = [
  { value: 'empezar', icon: 'building', label: 'Todavía no estoy en la nube', hint: 'Quiero saber si me conviene' },
  { value: 'mejorar', icon: 'cloud', label: 'Ya estoy en la nube', hint: 'Quiero mejorarla o pagar menos' },
  { value: 'respaldos', icon: 'database', label: 'Necesito respaldos', hint: 'Quiero proteger mi información' },
];
