import { Component } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { AI_SOLUTIONS } from '../../ai.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
@Component({
  selector: 'app-ia-solutions',
  imports: [TrPipe, Icon, Reveal, I18nAnimation],
  templateUrl: './ia-solutions.html',
  styleUrl: './ia-solutions.css',
})
export class IaSolutions {
  readonly solutions = AI_SOLUTIONS;
}
