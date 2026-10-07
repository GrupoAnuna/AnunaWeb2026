import { Component, signal } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { PAINS } from '../../consulting.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
@Component({
  selector: 'app-cs-pains',
  imports: [TrPipe, Icon, Reveal, I18nAnimation],
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
