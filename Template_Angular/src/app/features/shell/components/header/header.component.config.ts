// ============================================================
// Datos del header. Edita aquí los enlaces: el menú de
// escritorio y el menú móvil usan la misma lista.
// ============================================================

export interface HeaderLink {
  label: string;
  route: string;      // ruta de Angular, ej. '/'
  fragment?: string;  // ancla dentro de la ruta, ej. 'soluciones'
}

export interface HeaderConfig {
  nav: HeaderLink[];
  cta: HeaderLink;        // botón de escritorio
  mobileCta: HeaderLink;  // botón principal del menú móvil
}

export const HEADER_CONFIG: HeaderConfig = {
  nav: [
    { label: 'Desarrollo web', route: '/desarrollo-web', fragment: 'desarrollo-web' },
    { label: 'Desarrollo apps', route: '/desarrollo-apps', fragment: 'desarrollo-apps' },
    { label: 'Consultoría', route: '/consultoria', fragment: 'consultoria' },
    { label: 'Cloud', route: '/', fragment: 'cloud' },
    { label: 'Ciberseguridad', route: '/ciberseguridad', fragment: 'ciberseguridad' },
    { label: 'Casos de éxito', route: '/casos', fragment: 'casos' },
    { label: 'Nosotros', route: '/nosotros', fragment: 'nosotros' },
  ],
  cta: { label: 'Contáctanos', route: '/contacto', fragment: 'contacto' },
  mobileCta: { label: 'Agenda una asesoría', route: '/contacto', fragment: 'contacto' },
};
