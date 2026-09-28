import { Component, ElementRef, afterNextRender, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reveal } from '../../../../shared/reveal';
import { Ripple } from '../../../../shared/ripple';

type Icon = 'phone' | 'compass' | 'cloud' | 'shield';

interface Service {
  id: string;       // ancla para el menú (#desarrollo-apps)
  icon: Icon;
  title: string;
  text: string;
  link: string;
}

@Component({
  selector: 'app-services',
  imports: [RouterLink, Reveal, Ripple],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  /** Servicio destacado (tarjeta oscura grande) */
  readonly featured = {
    id: 'desarrollo-web',
    title: 'Desarrollo web',
    text: 'Sitios rápidos y claros, pensados para convertir visitas en clientes: landing pages, tiendas online y plataformas a la medida.',
    bullets: [
      'Descubrimiento y prototipo en 2 semanas',
      'Entregas funcionales cada sprint',
      'Optimizado para móviles y buscadores',
    ],
    link: 'Cotizar mi proyecto',
  };

  /** Resto de servicios */
  readonly services: Service[] = [
    {
      id: 'desarrollo-apps',
      icon: 'phone',
      title: 'Desarrollo de apps',
      text: 'Aplicaciones móviles y sistemas internos construidos sobre tus procesos reales, no al revés.',
      link: 'Idear mi app',
    },
    {
      id: 'consultoria',
      icon: 'compass',
      title: 'Consultoría',
      text: 'Diagnosticamos tus procesos y definimos una hoja de ruta con prioridades claras y costos visibles.',
      link: 'Solicitar diagnóstico',
    },
    {
      id: 'cloud',
      icon: 'cloud',
      title: 'Cloud',
      text: 'Migramos y administramos tus servidores en la nube para que tu operación no se detenga.',
      link: 'Planear mi migración',
    },
    {
      id: 'ciberseguridad',
      icon: 'shield',
      title: 'Ciberseguridad',
      text: 'Protegemos tu información con monitoreo, respaldos y políticas de acceso adecuadas a tu tamaño.',
      link: 'Evaluar mi seguridad',
    },
  ];

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterNextRender(() => {
      // Movimiento reducido: congela los pulsos SVG de la tarjeta destacada
      if (!document.documentElement.classList.contains('anim')) {
        this.host.nativeElement
          .querySelectorAll('svg')
          .forEach((s) => (s as SVGSVGElement).pauseAnimations?.());
      }
    });
  }
}
