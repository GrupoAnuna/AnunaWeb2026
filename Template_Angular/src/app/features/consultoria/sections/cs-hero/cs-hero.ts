import { afterNextRender, Component, computed, ElementRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/icon';
import { Ripple } from '../../../../shared/ripple';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
import { injectTranslate } from '../../../../core/translations';

@Component({
  selector: 'app-cs-hero',
  imports: [TrPipe, RouterLink, Icon, Ripple, I18nAnimation],
  templateUrl: './cs-hero.html',
  styleUrl: './cs-hero.css',
})
export class CsHero {
  readonly headline = 'Antes de invertir en tecnología, pongamos orden.';
  private readonly translate = injectTranslate();
  /** Se traduce la frase completa y luego se separa en palabras para la animación */
  readonly words = computed(() => String(this.translate(this.headline)).split(' '));
  readonly nodes = [
    { label: 'Ventas', x: 13, y: 16 },
    { label: 'Clientes', x: 87, y: 16 },
    { label: 'Inventario', x: 13, y: 84 },
    { label: 'Pagos', x: 87, y: 84 },
  ];

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef);
    afterNextRender(() => {
      // Movimiento reducido: congela los pulsos SVG
      if (!document.documentElement.classList.contains('anim')) {
        host.nativeElement.querySelectorAll('svg').forEach((s) => (s as SVGSVGElement).pauseAnimations?.());
      }
    });
  }
}
