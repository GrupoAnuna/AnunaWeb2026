import { Component } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { ADVANTAGES, PROOF } from '../../web-development.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
@Component({
  selector: 'app-wd-why',
  imports: [TrPipe, Icon, Reveal, I18nAnimation],
  templateUrl: './wd-why.html',
  styleUrl: './wd-why.css',
})
export class WdWhy {
  readonly advantages = ADVANTAGES;
  readonly proof = PROOF;
  readonly proofIcons = ['clock', 'users', 'pin'] as const;
  readonly tests = ['Rendimiento', 'Seguridad', 'Responsive'];
}
