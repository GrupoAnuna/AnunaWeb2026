// ============================================================
// Datos del header. Edita aquí los enlaces: el menú de
// escritorio y el menú móvil usan la misma lista.
// ============================================================

import { AnunaIcon } from "@shared/icon";
import { Lang } from "@core/language.service";

export interface HeaderLink {
  label: string;
  route: string;      // ruta de Angular, ej. '/'
  fragment?: string;  // ancla dentro de la ruta, ej. 'soluciones'
}

/** Un servicio dentro del menú desplegable */
export interface ServiceLink extends HeaderLink {
  icon: AnunaIcon;
  text: string; // descripción corta bajo el nombre
}

export interface HeaderConfig {
  nav: HeaderLink[];
  cta: HeaderLink;        // botón de escritorio
  mobileCta: HeaderLink;  // botón principal del menú móvil
}

export const HEADER_CONFIG: HeaderConfig = {
  nav: [
    { label: 'Desarrollo web', route: '/desarrollo-web' },
    { label: 'Desarrollo apps', route: '/desarrollo-apps' },
    { label: 'IA a medida', route: '/ia-medida' },
    { label: 'Consultoría', route: '/consultoria' },
    { label: 'Nube', route: '/cloud' },
    { label: 'Ciberseguridad', route: '/ciberseguridad' },
    { label: 'Casos éxito', route: '/casos' },
    { label: 'Nosotros', route: '/nosotros' },
  ],
  cta: { label: 'Contáctanos', route: '/contacto' },
  mobileCta: { label: 'Agenda una asesoría', route: '/contacto' },
};



/** Versión en inglés (mismas rutas, textos traducidos) */
export const HEADER_CONFIG_EN: HeaderConfig = {
  nav: [
    { label: 'Web develop', route: '/desarrollo-web' },
    { label: 'Apps develop', route: '/desarrollo-apps' },
    { label: 'Custom AI', route: '/ia-medida' },
    { label: 'Consultory', route: '/consultoria' },
    { label: 'Cloud', route: '/cloud' },
    { label: 'Cibersecurity', route: '/ciberseguridad' },
    { label: 'Case studies', route: '/', fragment: 'casos' },
    { label: 'About us', route: '/', fragment: 'nosotros' },
  ],
  cta: { label: 'Contact us', route: '/contacto', },
  mobileCta: { label: 'Book a consultation', route: '/contacto', },
};

export const HEADER_CONFIGS: Record<Lang, HeaderConfig> = { es: HEADER_CONFIG, en: HEADER_CONFIG_EN };

/** Textos de la interfaz del header */
export const HEADER_TEXT = {
  es: {
    skip: 'Saltar al contenido', nav: 'Principal', home: 'Grupo Anuna, inicio',
    openMenu: 'Abrir menú', closeMenu: 'Cerrar menú',
    toDark: 'Activar modo oscuro', toLight: 'Activar modo claro',
    language: 'Idioma', switchTo: 'Cambiar a inglés',
  },
  en: {
    skip: 'Skip to content', nav: 'Main', home: 'Grupo Anuna, home',
    openMenu: 'Open menu', closeMenu: 'Close menu',
    toDark: 'Switch to dark mode', toLight: 'Switch to light mode',
    language: 'Language', switchTo: 'Switch to Spanish',
  },
};
