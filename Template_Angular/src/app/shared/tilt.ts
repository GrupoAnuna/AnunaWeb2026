import { Directive, ElementRef, OnDestroy, afterNextRender, inject, input } from '@angular/core';

/**
 * Inclina el elemento en 3D siguiendo el cursor y expone la posición
 * del puntero como variables CSS (--rx, --ry, --mx, --my).
 * Uso:  <article appTilt [tiltMax]="6">…</article>
 * Solo actúa con mouse y si las animaciones están activas (html.anim).
 */
@Directive({ selector: '[appTilt]' })
export class Tilt implements OnDestroy {
  /** Inclinación máxima en grados */
  readonly tiltMax = input(6);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private cleanup?: () => void;

  constructor() {
    afterNextRender(() => {
      const animated = document.documentElement.classList.contains('anim');
      if (!animated || !window.matchMedia('(pointer: fine)').matches) return;

      const node = this.el.nativeElement;
      let raf = 0;

      // Escucha nativa: no dispara la detección de cambios de Angular en cada movimiento
      const move = (e: PointerEvent) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = node.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          const max = this.tiltMax();
          node.style.setProperty('--ry', `${(x - 0.5) * max * 2}deg`);
          node.style.setProperty('--rx', `${(0.5 - y) * max * 2}deg`);
          node.style.setProperty('--mx', `${x * 100}%`);
          node.style.setProperty('--my', `${y * 100}%`);
        });
      };
      const leave = () => {
        cancelAnimationFrame(raf);
        ['--rx', '--ry', '--mx', '--my'].forEach((p) => node.style.removeProperty(p));
      };

      node.addEventListener('pointermove', move);
      node.addEventListener('pointerleave', leave);
      this.cleanup = () => {
        node.removeEventListener('pointermove', move);
        node.removeEventListener('pointerleave', leave);
        cancelAnimationFrame(raf);
      };
    });
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }
}
