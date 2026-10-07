import { Component, ElementRef, OnDestroy, afterNextRender, inject, signal } from '@angular/core';
import { Reveal } from '../../../../shared/reveal';
import { APP_PROCESS } from '../../app-development.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
@Component({
  selector: 'app-ad-process',
  imports: [TrPipe, Reveal, I18nAnimation],
  templateUrl: './ad-process.html',
  styleUrl: './ad-process.css',
})
export class AdProcess implements OnDestroy {
  readonly steps = APP_PROCESS;
  /** Paso que está a la altura del centro de la pantalla */
  readonly current = signal(0);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private cleanup?: () => void;

  constructor() {
    afterNextRender(() => this.init());
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }

  private init(): void {
    const root = this.host.nativeElement;
    const list = root.querySelector<HTMLElement>('.steps')!;
    const items = [...root.querySelectorAll<HTMLElement>('.step')];

    // Sin animaciones: todos los pasos encendidos y la línea completa
    if (!document.documentElement.classList.contains('anim')) {
      list.style.setProperty('--p', '1');
      items.forEach((el) => el.classList.add('on'));
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const mark = window.innerHeight * 0.6; // línea imaginaria al 60% de la pantalla
      const r = list.getBoundingClientRect();
      const p = Math.min(Math.max((mark - r.top) / r.height, 0), 1);
      list.style.setProperty('--p', p.toFixed(3)); // directo al DOM: sin redibujar Angular

      let last = 0;
      items.forEach((el, i) => {
        const on = el.getBoundingClientRect().top + 24 < mark;
        el.classList.toggle('on', on);
        if (on) last = i;
      });
      this.current.set(last); // solo redibuja si cambia el paso
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    this.cleanup = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }
}
