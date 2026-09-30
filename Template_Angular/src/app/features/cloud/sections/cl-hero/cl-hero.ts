import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/icon';
import { Ripple } from '../../../../shared/ripple';

@Component({
  selector: 'app-cl-hero',
  imports: [RouterLink, Icon, Ripple],
  templateUrl: './cl-hero.html',
  styleUrl: './cl-hero.css',
})
export class ClHero {
  readonly headline = 'Tu negocio en la nube, sin complicaciones.';
  readonly words = this.headline.split(' ');
  readonly perks = ['Sin detener tu operación', 'Respaldos automáticos', 'Pagas solo lo que usas'];
  readonly units = [0, 1, 2];
  readonly packets = [0, 1, 2, 3];
  readonly chips = ['Disponible', 'Respaldado', 'Escalable'];
  /** Porcentaje de la migración (el servidor renderiza la versión terminada) */
  readonly progress = signal(100);

  private raf = 0;

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef);
    afterNextRender(() => {
      if (!document.documentElement.classList.contains('anim')) {
        host.nativeElement.querySelectorAll('svg').forEach((s) => (s as SVGSVGElement).pauseAnimations?.());
        return;
      }
      // La barra de migración sube de 0 a 100 %
      this.progress.set(0);
      const start = performance.now() + 1200;
      const tick = (now: number) => {
        const p = Math.min(Math.max((now - start) / 3000, 0), 1);
        this.progress.set(Math.round(100 * (1 - Math.pow(1 - p, 2))));
        if (p < 1) this.raf = requestAnimationFrame(tick);
      };
      this.raf = requestAnimationFrame(tick);
    });
    inject(DestroyRef).onDestroy(() => {
      if (this.raf) cancelAnimationFrame(this.raf); // solo existe en el navegador
    });
  }
}
