import { Component, ElementRef, afterNextRender, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reveal } from '../../../../shared/reveal';
import { Ripple } from '../../../../shared/ripple';
import { I18nAnimation } from '@shared/i18n-animation';
import { LanguageService } from '../../../../core/language.service';
import { SERVICES_TEXT } from './services.i18n';

@Component({
  selector: 'app-services',
  imports: [RouterLink, Reveal, Ripple, I18nAnimation],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  private readonly i18n = inject(LanguageService);
  readonly t = this.i18n.pick(SERVICES_TEXT);
  /** Servicio destacado (tarjeta oscura grande) */
  readonly featured = computed(() => this.t().featured);
  /** Resto de servicios */
  readonly services = computed(() => this.t().services);

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
