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
    { label: 'Desarrollo web', route: '/desarrollo-web' },
    { label: 'Desarrollo apps', route: '/desarrollo-apps'},
    { label: 'IA a medida', route: '/ia-medida'  },
    { label: 'Consultoría', route: '/consultoria' },
    { label: 'Cloud', route: '/cloud' },
    { label: 'Ciberseguridad', route: '/ciberseguridad' },
    { label: 'Casos éxito', route: '/casos' },
    { label: 'Nosotros', route: '/nosotros' },
  ],
  cta: { label: 'Contáctanos', route: '/contacto' },
  mobileCta: { label: 'Agenda una asesoría', route: '/contacto' },
};
