import { Component } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { MIGRATION } from '../../cloud.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
@Component({
  selector: 'app-cl-process',
  imports: [TrPipe, Icon, Reveal, I18nAnimation],
  templateUrl: './cl-process.html',
  styleUrl: './cl-process.css',
})
export class ClProcess {
  readonly steps = MIGRATION;
}
