import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { LAYERS } from '../../cyber.data';

@Component({
  selector: 'app-cy-layers',
  imports: [Icon, Reveal],
  templateUrl: './cy-layers.html',
  styleUrl: './cy-layers.css',
})
export class CyLayers {
  readonly layers = LAYERS;
  /** Radio de cada anillo (de fuera hacia dentro) */
  readonly radii = [182, 152, 122, 92, 62];
  readonly active = signal(0);

  private timer?: ReturnType<typeof setInterval>;

  constructor() {
    afterNextRender(() => {
      // Recorrido automático de las capas hasta que el usuario interactúe
      if (!document.documentElement.classList.contains('anim')) return;
      this.timer = setInterval(() => this.active.update((i) => (i + 1) % this.layers.length), 2600);
    });
    inject(DestroyRef).onDestroy(() => clearInterval(this.timer));
  }

  select(i: number): void {
    clearInterval(this.timer); // el usuario toma el control
    this.active.set(i);
  }

  /** Posición del número de cada anillo, en diagonal superior derecha */
  badge(i: number): { x: number; y: number } {
    const a = (-52 * Math.PI) / 180;
    return { x: 200 + this.radii[i] * Math.cos(a), y: 200 + this.radii[i] * Math.sin(a) };
  }
}
