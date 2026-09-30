// ============================================================
// Contenido de la página "Ciberseguridad".
// Todo en lenguaje simple: pensado para quien no sabe de tecnología.
// ============================================================

import type { AnunaIcon } from '../../shared/icon';

/** WhatsApp para emergencias (se usa en el Hero) */
export const EMERGENCY_WHATSAPP = 'https://wa.me/525539022537';

/** 1 · "Tu empresa es como una casa" */
export interface HouseSpot {
  id: 'puerta' | 'buzon' | 'ventanas' | 'caja' | 'camara';
  icon: AnunaIcon;
  place: string;   // la parte de la casa
  topic: string;   // su equivalente digital
  text: string;
  x: number;       // posición del punto (%)
  y: number;
}

export const HOUSE_SPOTS: HouseSpot[] = [
  {
    id: 'puerta', icon: 'key', place: 'La puerta', topic: 'Contraseñas y accesos',
    text: 'Como la llave de tu casa: si es fácil de copiar, cualquiera puede entrar. Configuramos contraseñas seguras y verificación en dos pasos.',
    x: 50, y: 71,
  },
  {
    id: 'buzon', icon: 'mail', place: 'El buzón', topic: 'Correo electrónico',
    text: 'Por aquí llegan la mayoría de los engaños. Filtramos los correos peligrosos y enseñamos a tu equipo a reconocerlos.',
    x: 12, y: 66,
  },
  {
    id: 'ventanas', icon: 'wifi', place: 'Las ventanas', topic: 'Equipos y red Wi-Fi',
    text: 'Una ventana abierta es una invitación. Protegemos tus computadoras, celulares y la red de tu oficina.',
    x: 30, y: 50,
  },
  {
    id: 'caja', icon: 'database', place: 'La caja fuerte', topic: 'Respaldos',
    text: 'Si algo sale mal, tus archivos siguen a salvo en una copia segura que podemos recuperar rápidamente.',
    x: 66, y: 57,
  },
  {
    id: 'camara', icon: 'eye', place: 'La cámara', topic: 'Monitoreo',
    text: 'Vigilamos lo que pasa en tus sistemas para detectar algo raro antes de que se convierta en un problema.',
    x: 77, y: 31,
  },
];

/** 2 · ¿Detectas el engaño? (correo falso) */
export interface PhishFlag {
  id: 'remitente' | 'urgencia' | 'enlace' | 'adjunto';
  title: string;
  text: string;
}

export const PHISH_FLAGS: PhishFlag[] = [
  { id: 'remitente', title: 'Remitente extraño', text: 'El nombre dice "TuBanco", pero la dirección no es la oficial. Revisa siempre lo que va después de la @.' },
  { id: 'urgencia', title: 'Urgencia y amenazas', text: 'Te presionan con plazos cortos para que actúes sin pensar. Los bancos no bloquean tu cuenta por correo.' },
  { id: 'enlace', title: 'Enlace sospechoso', text: 'El botón lleva a una página que imita a la real. Pasa el cursor antes de hacer clic y revisa la dirección.' },
  { id: 'adjunto', title: 'Archivo inesperado', text: 'Un comprobante comprimido que no pediste puede esconder un virus. Si no lo esperabas, no lo abras.' },
];

/** 3 · Capas de protección (de fuera hacia dentro) */
export interface Layer {
  icon: AnunaIcon;
  title: string;
  text: string;
}

export const LAYERS: Layer[] = [
  { icon: 'school', title: 'Capacitación del equipo', text: 'Tu gente es la primera línea de defensa: aprende a detectar engaños y a trabajar de forma segura.' },
  { icon: 'wifi', title: 'Red y correo protegidos', text: 'Firewall, filtros de correo y Wi-Fi seguro para cerrarle la puerta a los intrusos.' },
  { icon: 'shield', title: 'Equipos blindados', text: 'Antivirus, actualizaciones y control de accesos en computadoras y celulares.' },
  { icon: 'eye', title: 'Monitoreo continuo', text: 'Vigilancia de tus sistemas para detectar y frenar cualquier actividad extraña a tiempo.' },
  { icon: 'database', title: 'Respaldos y recuperación', text: 'Copias automáticas de tu información, guardadas en un lugar seguro y listas para recuperarse.' },
];

/** 4 · Ciclo de trabajo */
export const CYCLE = [
  { icon: 'search' as AnunaIcon, title: 'Evaluamos', text: 'Revisamos cómo estás hoy y encontramos los puntos débiles, sin tecnicismos.' },
  { icon: 'shield' as AnunaIcon, title: 'Protegemos', text: 'Cerramos las brechas con las herramientas adecuadas para tu tamaño y presupuesto.' },
  { icon: 'eye' as AnunaIcon, title: 'Vigilamos', text: 'Monitoreamos tus sistemas para detectar a tiempo cualquier cosa fuera de lo normal.' },
  { icon: 'alert' as AnunaIcon, title: 'Respondemos', text: 'Si algo pasa, actuamos rápido con un plan claro y te mantenemos informado en todo momento.' },
];

/** 5 · Chequeo rápido */
export interface Practice {
  text: string;
  help: string; // cómo te ayudamos si todavía no lo haces
}

export const PRACTICES: Practice[] = [
  { text: 'Usamos contraseñas distintas y seguras en cada servicio.', help: 'Gestor de contraseñas para todo el equipo.' },
  { text: 'Tenemos verificación en dos pasos en correo y banca.', help: 'Activar la verificación en dos pasos en tus cuentas clave.' },
  { text: 'Hacemos respaldos automáticos y ya probamos recuperarlos.', help: 'Respaldos automáticos con pruebas de recuperación.' },
  { text: 'Nuestros equipos se actualizan con regularidad.', help: 'Actualizaciones y antivirus gestionados en todos los equipos.' },
  { text: 'Nuestro equipo sabe reconocer correos sospechosos.', help: 'Capacitación práctica contra engaños por correo.' },
  { text: 'Sabemos qué hacer si sufrimos un ataque.', help: 'Un plan de respuesta sencillo para actuar sin pánico.' },
];

export const PROTECTION_LEVELS = [
  { max: 2, title: 'Hay que reforzar', text: 'Tu negocio tiene puertas abiertas que se pueden cerrar fácilmente. Con unos pocos cambios, vas a estar mucho más tranquilo.' },
  { max: 4, title: 'Vas bien', text: 'Ya tienes buenas bases. Cerrando los pendientes, tu protección da un gran salto.' },
  { max: 6, title: '¡Muy bien protegido!', text: 'Tienes buenos hábitos de seguridad. Una evaluación te ayuda a confirmar que no quede ningún punto ciego.' },
];
