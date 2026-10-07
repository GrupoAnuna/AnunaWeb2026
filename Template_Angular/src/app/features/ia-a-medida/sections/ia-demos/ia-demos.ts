import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { DEMOS } from '../../ai.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
@Component({
  selector: 'app-ia-demos',
  imports: [TrPipe, Icon, Reveal, I18nAnimation],
  templateUrl: './ia-demos.html',
  styleUrl: './ia-demos.css',
})
export class IaDemos {
  readonly demos = DEMOS;
  readonly active = signal(0);
  /** Apagar y encender la consola recrea su contenido y repite la animación */
  readonly visible = signal(true);
  /** Avance automático entre casos (se detiene cuando el usuario elige uno) */
  readonly autoplay = signal(false);

  private timer?: ReturnType<typeof setInterval>;
  private restart?: ReturnType<typeof setTimeout>;

  constructor() {
    afterNextRender(() => {
      if (!document.documentElement.classList.contains('anim')) return;
      // Avanza solo entre los casos hasta que el usuario elige uno
      this.autoplay.set(true);
      this.timer = setInterval(() => this.show((this.active() + 1) % this.demos.length, false), 7500);
    });
    inject(DestroyRef).onDestroy(() => {
      clearInterval(this.timer);
      clearTimeout(this.restart);
    });
  }

  show(i: number, byUser = true): void {
    if (byUser) this.stopAutoplay();
    if (i === this.active()) this.replay();
    else this.active.set(i);
  }

  replay(): void {
    this.stopAutoplay();
    this.visible.set(false);
    clearTimeout(this.restart);
    this.restart = setTimeout(() => this.visible.set(true), 30);
  }

  private stopAutoplay(): void {
    clearInterval(this.timer);
    this.autoplay.set(false);
  }
}
