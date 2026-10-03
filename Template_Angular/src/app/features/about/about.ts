import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Reveal } from '../../shared/reveal';
import { FOUNDERS, PILLARS } from './about.data';
import { Footer } from '@features/shell/components/footer/footer.component';
import { HeaderComponent } from '@features/shell/components/header/header.component';
import { Whatsapp } from '@features/shell/components/whatsapp/whatsapp';


/** Radio del círculo, en % del escenario (todos a la misma distancia del centro) */
const RADIUS = 37;
/** Tiempo que cada fundador pasa en el foco cuando nadie interactúa */
const SPOTLIGHT_MS = 3800;

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, Reveal, Footer, HeaderComponent, Whatsapp],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  readonly pillars = PILLARS;
  readonly founders = FOUNDERS;

  /**
   * Posición de cada fundador: repartidos cada 360°/6 = 60°, empezando arriba.
   * (ox, oy) indican hacia dónde "vuelan" al entrar desde fuera del círculo.
   */
  readonly spots = FOUNDERS.map((_, i) => {
    const a = ((-90 + (i * 360) / FOUNDERS.length) * Math.PI) / 180;
    return {
      x: 50 + RADIUS * Math.cos(a),
      y: 50 + RADIUS * Math.sin(a),
      ox: Math.round(Math.cos(a) * 180),
      oy: Math.round(Math.sin(a) * 180),
    };
  });
  /** Hexágono que une a los seis (coordenadas en un lienzo de 100×100) */
  readonly hexagon = this.spots.map((s) => `${s.x.toFixed(2)},${s.y.toFixed(2)}`).join(' ');
  /** Pulsos de luz que recorren el hexágono */
  readonly pulses = [0, 1, 2, 3];
  readonly hexPath = 'M' + this.spots.map((s) => `${s.x.toFixed(2)} ${s.y.toFixed(2)}`).join(' L') + ' Z';

  /** Fundador en el foco (null = nadie: el centro muestra el isotipo) */
  readonly active = signal<number | null>(null);
  readonly current = computed(() => (this.active() === null ? null : this.founders[this.active()!]));
  /** Mientras alguien interactúa, el círculo se detiene */
  readonly holding = signal(false);

  private timer?: ReturnType<typeof setInterval>;
  private started = false;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterNextRender(() => {
      if (!document.documentElement.classList.contains('anim')) {
        // Movimiento reducido: sin giro ni foco automático; se congela el SVG
        this.host.nativeElement.querySelectorAll('svg').forEach((s) => (s as SVGSVGElement).pauseAnimations?.());
      }
    });
    inject(DestroyRef).onDestroy(() => clearInterval(this.timer));
  }

  /** Se llama cuando el círculo entra en pantalla: arranca el foco por turnos */
  start(): void {
    if (this.started || !document.documentElement.classList.contains('anim')) return;
    this.started = true;
    setTimeout(() => {
      if (!this.holding()) this.active.set(0);
      this.timer = setInterval(() => {
        if (!this.holding()) this.active.update((i) => ((i ?? -1) + 1) % this.founders.length);
      }, SPOTLIGHT_MS);
    }, 2600); // espera a que termine la animación de llegada
  }

  /** Cursor, foco o toque sobre un fundador: lo muestra y detiene el círculo */
  hold(i: number): void {
    this.holding.set(true);
    this.active.set(i);
  }

  release(): void {
    this.holding.set(false);
  }

  /** Clic fuera de los fundadores dentro del escenario (útil en pantallas táctiles) */
  onStageLeave(event: FocusEvent | MouseEvent): void {
    const next = (event as FocusEvent).relatedTarget as Node | null;
    if (next && this.host.nativeElement.querySelector('.stage')?.contains(next)) return;
    this.release();
  }
}
