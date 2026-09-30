import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { COMPARE } from '../../cloud.data';

@Component({
  selector: 'app-cl-compare',
  imports: [Icon, Reveal],
  templateUrl: './cl-compare.html',
  styleUrl: './cl-compare.css',
})
export class ClCompare {
  readonly rows = COMPARE;
  /** Posición del divisor, en % (lado izquierdo = "sin nube") */
  readonly pos = signal(50);
  readonly touched = signal(false);

  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.timers.forEach(clearTimeout));
  }

  onInput(event: Event): void {
    this.touched.set(true);
    this.timers.forEach(clearTimeout);
    this.pos.set(Number((event.target as HTMLInputElement).value));
  }

  /** Al aparecer, el divisor se mueve solo para mostrar que se puede arrastrar */
  hint(): void {
    if (!document.documentElement.classList.contains('anim')) return;
    const steps: [number, number][] = [[500, 30], [1300, 70], [2100, 50]];
    this.timers = steps.map(([t, v]) => setTimeout(() => { if (!this.touched()) this.pos.set(v); }, t));
  }
}
