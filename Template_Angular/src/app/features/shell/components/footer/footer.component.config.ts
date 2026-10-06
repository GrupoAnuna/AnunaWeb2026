// ============================================================
// Datos del footer. Edita aquí textos, enlaces y teléfonos:
// el componente se actualiza en todas las páginas a la vez.
// ============================================================

import type { Lang } from  "@core/language.service";

export interface FooterLink {
  label: string;
  route: string;      // ruta de Angular, ej. '/' o '/servicios'
  fragment?: string;  // ancla dentro de la ruta, ej. 'contacto'
}

export interface FooterPhone {
  country: string;
  display: string; // cómo se muestra
  tel: string;     // formato para el enlace tel:
}

export interface FooterSocial {
  name: 'instagram' | 'linkedin';
  label: string;
  url: string;
}

export interface FooterClock {
  country: string;
  tz: string; // zona horaria IANA
}

export interface FooterConfig {
  headline: string;
  tagline: string;
  cta: FooterLink;
  nav: FooterLink[];
  email: string;
  phones: FooterPhone[];
  socials: FooterSocial[];
  clocks: FooterClock[];
  /** Horario de atención (hora local de cada país). weekdays: 0 = domingo … 6 = sábado */
  hours: { start: number; end: number; weekdays: number[] };
  privacyUrl: string;
}

export const FOOTER_CONFIG: FooterConfig = {
  headline: 'Unimos esfuerzos para que tu negocio crezca.',
  tagline: 'Impulsamos la digitalización de pymes con tecnología clara y accesible.',
  cta: { label: 'Agenda una consulta', route: '/', fragment: 'contacto' },

  // Ajusta los fragments a los ids reales de las secciones de tu home
  nav: [
    { label: 'Servicios', route: '/', fragment: 'soluciones' },
    { label: 'Casos de éxito', route: '/', fragment: 'casos' },
    { label: 'Sobre nosotros', route: '/', fragment: 'nosotros' },
    { label: 'Contacto', route: '/', fragment: 'contacto' },
  ],

  email: 'info@grupoanuna.com',
  phones: [
    { country: 'México', display: '+52 55 3902 2537', tel: '+525539022537' },
    { country: 'Argentina', display: '+54 9 351 395 2644', tel: '+5493513952644' },
    { country: 'España', display: '+34 673 561 620', tel: '+34673561620' },
  ],

  socials: [
    { name: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/grupoanuna' },
    { name: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/grupo-anuna/' },
  ],

  clocks: [
    { country: 'España', tz: 'Europe/Madrid' },
    { country: 'México', tz: 'America/Mexico_City' },
    { country: 'Argentina', tz: 'America/Argentina/Cordoba' },
  ],

  hours: { start: 9, end: 19, weekdays: [1, 2, 3, 4, 5] },

  privacyUrl:
    'https://grupoanuna.com/assets/Pol%C3%ADticas/Aviso%20de%20Privacidad%20%E2%80%93%20Formulario%20de%20Agenda.pdf',
};

/** Versión en inglés (mismos enlaces y teléfonos, textos traducidos) */
export const FOOTER_CONFIG_EN: FooterConfig = {
  ...FOOTER_CONFIG,
  headline: 'We join forces so your business can grow.',
  tagline: 'We drive the digital transformation of small businesses with clear, accessible technology.',
  cta: { label: 'Book a consultation', route: '/', fragment: 'contacto' },
  nav: [
    { label: 'Services', route: '/', fragment: 'soluciones' },
    { label: 'Case studies', route: '/', fragment: 'casos' },
    { label: 'About us', route: '/', fragment: 'nosotros' },
    { label: 'Contact', route: '/', fragment: 'contacto' },
  ],
  phones: [
    { country: 'Mexico', display: '+52 55 3902 2537', tel: '+525539022537' },
    { country: 'Argentina', display: '+54 9 351 395 2644', tel: '+5493513952644' },
    { country: 'Spain', display: '+34 673 561 620', tel: '+34673561620' },
  ],
  clocks: [
    { country: 'Spain', tz: 'Europe/Madrid' },
    { country: 'Mexico', tz: 'America/Mexico_City' },
    { country: 'Argentina', tz: 'America/Argentina/Cordoba' },
  ],
};

export const FOOTER_CONFIGS: Record<Lang, FooterConfig> = { es: FOOTER_CONFIG, en: FOOTER_CONFIG_EN };

/** Textos de la interfaz del footer */
export const FOOTER_TEXT = {
  es: {
    nav: 'Navegación', contact: 'Contacto', follow: 'Síguenos', clocks: 'Ahora mismo en nuestros equipos',
    open: 'En horario de atención', closed: 'Fuera de horario', rights: 'Todos los derechos reservados.',
    privacy: 'Aviso de privacidad', top: 'Volver arriba', socialSuffix: ' de Grupo Anuna (abre en pestaña nueva)',
  },
  en: {
    nav: 'Navigation', contact: 'Contact', follow: 'Follow us', clocks: 'Right now at our offices',
    open: 'Open for business', closed: 'Closed', rights: 'All rights reserved.',
    privacy: 'Privacy notice', top: 'Back to top', socialSuffix: ' of Grupo Anuna (opens in a new tab)',
  },
};
