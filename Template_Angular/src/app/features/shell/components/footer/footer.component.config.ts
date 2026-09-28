// ============================================================
// Datos del footer. Edita aquí textos, enlaces y teléfonos:
// el componente se actualiza en todas las páginas a la vez.
// ============================================================

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
  cta: { label: 'Agenda una consulta', route: '/contacto', fragment: 'contacto' },

  // Ajusta los fragments a los ids reales de las secciones de tu home
  nav: [
    { label: 'Servicios', route: '/', fragment: 'soluciones' },
    { label: 'Casos de éxito', route: '/', fragment: 'casos' },
    { label: 'Sobre nosotros', route: '/nosotros', fragment: 'nosotros' },
    { label: 'Contacto', route: '/contacto', fragment: 'contacto' },
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
