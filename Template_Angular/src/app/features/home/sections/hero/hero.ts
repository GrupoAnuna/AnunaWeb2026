import { Component, ElementRef, OnDestroy, afterNextRender, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ripple } from '../../../../shared/ripple';

interface Stat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

@Component({
  selector: 'app-hero',
  imports: [RouterLink, Ripple],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnDestroy {
  readonly headline = 'Unimos tecnología y personas para que tu empresa avance más rápido.';
  readonly words = this.headline.split(' ');

  /** Cifras del hero (reemplazar por datos reales) */
  readonly stats: Stat[] = [
    { label: 'Proyectos', value: 120, prefix: '+' },
    { label: 'Clientes activos', value: 45 },
    { label: 'Respuesta', value: 12, prefix: '< ', suffix: ' h' },
  ];
  /** Valor que se muestra de cada cifra (el servidor renderiza el valor final) */
  readonly shown = signal(this.stats.map((s) => s.value));

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly cleanups: Array<() => void> = [];

  constructor() {
    afterNextRender(() => this.init());
  }

  ngOnDestroy(): void {
    this.cleanups.forEach((fn) => fn());
  }

  private init(): void {
    const root = this.host.nativeElement;
    const animated = document.documentElement.classList.contains('anim');

    if (!animated) {
      // Movimiento reducido: congela los pulsos SVG
      root.querySelectorAll('svg').forEach((s) => (s as SVGSVGElement).pauseAnimations?.());
      return;
    }

    this.runCounters();
    this.initParallax(root);
  }

  /** Las cifras cuentan desde 0 cuando aparecen */
  private runCounters(): void {
    this.shown.set(this.stats.map(() => 0));
    const start = window.setTimeout(() => {
      const t0 = performance.now();
      const dur = 1500;
      const tick = (now: number) => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        this.shown.set(this.stats.map((s) => Math.round(s.value * eased)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      let raf = requestAnimationFrame(tick);
      this.cleanups.push(() => cancelAnimationFrame(raf));
    }, 1100);
    this.cleanups.push(() => clearTimeout(start));
  }

  /** Las capas de la ilustración siguen al cursor (solo con mouse) */
  private initParallax(root: HTMLElement): void {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const section = root.querySelector<HTMLElement>('section')!;
    const layers = root.querySelectorAll<SVGGElement>('.layer');
    let raf = 0;

    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = section.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        layers.forEach((l) => {
          const d = Number(l.dataset['depth'] ?? 0);
          l.style.transform = `translate(${x * d}px, ${y * d}px)`;
        });
      });
    };
    const leave = () => layers.forEach((l) => (l.style.transform = ''));

    section.addEventListener('pointermove', move);
    section.addEventListener('pointerleave', leave);
    this.cleanups.push(() => {
      section.removeEventListener('pointermove', move);
      section.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    });
  }
}
