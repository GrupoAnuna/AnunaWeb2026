// Textos de la sección Servicios de la home en español e inglés.
// Los "id" son las anclas del menú: no los traduzcas.

type Icon = 'phone' | 'compass' | 'cloud' | 'shield';

export interface Service {
  id: string;
  icon: Icon;
  title: string;
  text: string;
  link: string;
}

export interface ServicesText {
  title: string;
  lead: string;
  featured: { id: string; title: string; text: string; bullets: string[]; link: string };
  services: Service[];
  ctaStrong: string;
  ctaText: string;
  ctaButton: string;
}

export const SERVICES_TEXT: Record<'es' | 'en', ServicesText> = {
  es: {
    title: 'Soluciones para cada etapa de tu operación',
    lead: 'Empieza por lo que más urge hoy. Cuando crezcas, el mismo equipo integra lo siguiente sin volver a empezar.',
    featured: {
      id: 'desarrollo-web',
      title: 'Desarrollo web',
      text: 'Sitios rápidos y claros, pensados para convertir visitas en clientes: landing pages, tiendas online y plataformas a la medida.',
      bullets: ['Descubrimiento y prototipo en 2 semanas', 'Entregas funcionales cada sprint', 'Optimizado para móviles y buscadores'],
      link: 'Cotizar mi proyecto',
    },
    services: [
      { id: 'desarrollo-apps', icon: 'phone', title: 'Desarrollo de apps', text: 'Aplicaciones móviles y sistemas internos construidos sobre tus procesos reales, no al revés.', link: 'Idear mi app' },
      { id: 'consultoria', icon: 'compass', title: 'Consultoría', text: 'Diagnosticamos tus procesos y definimos una hoja de ruta con prioridades claras y costos visibles.', link: 'Solicitar diagnóstico' },
      { id: 'cloud', icon: 'cloud', title: 'Cloud', text: 'Migramos y administramos tus servidores en la nube para que tu operación no se detenga.', link: 'Planear mi migración' },
      { id: 'ciberseguridad', icon: 'shield', title: 'Ciberseguridad', text: 'Protegemos tu información con monitoreo, respaldos y políticas de acceso adecuadas a tu tamaño.', link: 'Evaluar mi seguridad' },
    ],
    ctaStrong: '¿Tu reto no encaja en ninguna categoría?',
    ctaText: 'Cuéntanoslo y armamos la solución contigo.',
    ctaButton: 'Hablar con un especialista',
  },
  en: {
    title: 'Solutions for every stage of your business',
    lead: "Start with what's most urgent today. As you grow, the same team adds the next piece without starting over.",
    featured: {
      id: 'desarrollo-web',
      title: 'Web development',
      text: 'Fast, clear websites designed to turn visitors into customers: landing pages, online stores and custom platforms.',
      bullets: ['Discovery and prototype in 2 weeks', 'Working deliveries every sprint', 'Optimized for mobile and search engines'],
      link: 'Get a quote',
    },
    services: [
      { id: 'desarrollo-apps', icon: 'phone', title: 'App development', text: 'Mobile apps and internal systems built around your real processes, not the other way around.', link: 'Plan my app' },
      { id: 'consultoria', icon: 'compass', title: 'Consulting', text: 'We assess your processes and define a roadmap with clear priorities and visible costs.', link: 'Request an assessment' },
      { id: 'cloud', icon: 'cloud', title: 'Cloud', text: 'We migrate and manage your servers in the cloud so your business never stops.', link: 'Plan my migration' },
      { id: 'ciberseguridad', icon: 'shield', title: 'Cybersecurity', text: 'We protect your information with monitoring, backups and access policies sized for your business.', link: 'Assess my security' },
    ],
    ctaStrong: "Doesn't your challenge fit any category?",
    ctaText: "Tell us about it and we'll build the solution with you.",
    ctaButton: 'Talk to a specialist',
  },
};
