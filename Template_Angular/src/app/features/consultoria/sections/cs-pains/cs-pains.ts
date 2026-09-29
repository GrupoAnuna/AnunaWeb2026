import { Component, signal } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { PAINS } from '../../consulting.data';

@Component({
  selector: 'app-cs-pains',
  imports: [Icon, Reveal],
  templateUrl: './cs-pains.html',
  styleUrl: './cs-pains.css',
})
export class CsPains {
  readonly pains = PAINS;
  /** Tarjetas volteadas con clic o toque (en escritorio también voltean con el cursor) */
  readonly flipped = signal<number[]>([]);

  toggle(i: number): void {
    this.flipped.update((l) => (l.includes(i) ? l.filter((x) => x !== i) : [...l, i]));
  }

  isFlipped(i: number): boolean {
    return this.flipped().includes(i);
  }
}
