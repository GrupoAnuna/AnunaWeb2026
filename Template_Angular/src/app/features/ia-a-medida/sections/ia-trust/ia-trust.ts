import { Component } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { PRINCIPLES } from '../../ai.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
@Component({
  selector: 'app-ia-trust',
  imports: [TrPipe, Icon, Reveal, I18nAnimation],
  templateUrl: './ia-trust.html',
  styleUrl: './ia-trust.css',
})
export class IaTrust {
  readonly principles = PRINCIPLES;
}
