import { Component, ElementRef, afterNextRender, inject } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { FLOW_OUTPUTS, FLOW_SOURCES } from '../../ai.data';

@Component({
  selector: 'app-ia-flow',
  imports: [Icon, Reveal],
  templateUrl: './ia-flow.html',
  styleUrl: './ia-flow.css',
})
export class IaFlow {
  readonly sources = FLOW_SOURCES;
  readonly outputs = FLOW_OUTPUTS;
  /** Altura (en el lienzo de 900×400) de cada fuente y cada canal */
  readonly srcY = [60, 150, 250, 340];
  readonly outY = [90, 200, 310];

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef);
    afterNextRender(() => {
      if (!document.documentElement.classList.contains('anim')) {
        host.nativeElement.querySelectorAll('svg').forEach((s) => (s as SVGSVGElement).pauseAnimations?.());
      }
    });
  }

  /** Curva desde una fuente (izquierda) hasta el centro */
  inPath(y: number): string {
    return `M175 ${y} C 290 ${y}, 330 200, 410 200`;
  }

  /** Curva desde el centro hasta un canal (derecha) */
  outPath(y: number): string {
    return `M490 200 C 570 200, 610 ${y}, 722 ${y}`;
  }
}
