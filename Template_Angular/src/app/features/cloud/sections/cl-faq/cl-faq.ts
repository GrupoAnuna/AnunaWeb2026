import { Component, signal } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { FAQ } from '../../cloud.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
@Component({
  selector: 'app-cl-faq',
  imports: [TrPipe, Icon, Reveal, I18nAnimation],
  templateUrl: './cl-faq.html',
  styleUrl: './cl-faq.css',
})
export class ClFaq {
  readonly faq = FAQ;
  /** Pregunta abierta (-1 = ninguna) */
  readonly open = signal(0);

  toggle(i: number): void {
    this.open.update((o) => (o === i ? -1 : i));
  }
}
