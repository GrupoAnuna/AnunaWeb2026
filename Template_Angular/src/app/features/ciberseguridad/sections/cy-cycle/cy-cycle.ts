import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { CYCLE } from '../../cyber.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
@Component({
  selector: 'app-cy-cycle',
  imports: [TrPipe, Icon, Reveal, I18nAnimation],
  templateUrl: './cy-cycle.html',
  styleUrl: './cy-cycle.css',
})
export class CyCycle {
  readonly steps = CYCLE;
  readonly active = signal(0);
  /** Grados acumulados del arco: siempre crece, así nunca gira hacia atrás */
  readonly rotation = signal(0);
  /** Pausa el giro automático mientras el usuario explora */
  readonly paused = signal(false);

  /** Posición de cada nodo sobre el círculo (arriba, derecha, abajo, izquierda) */
  readonly positions = [
    { x: 50, y: 6 },
    { x: 94, y: 50 },
    { x: 50, y: 94 },
    { x: 6, y: 50 },
  ];

  private timer?: ReturnType<typeof setInterval>;

  constructor() {
    afterNextRender(() => {
      if (!document.documentElement.classList.contains('anim')) return;
      this.timer = setInterval(() => {
        if (!this.paused()) this.select((this.active() + 1) % this.steps.length);
      }, 3200);
    });
    inject(DestroyRef).onDestroy(() => clearInterval(this.timer));
  }

  select(i: number): void {
    const n = this.steps.length;
    const forward = (i - this.active() + n) % n; // pasos hacia adelante hasta la etapa elegida
    this.rotation.update((r) => r + forward * 90);
    this.active.set(i);
  }
}
