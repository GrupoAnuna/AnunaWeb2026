import { Component } from '@angular/core';
import { Reveal } from '../../../../shared/reveal';
import { PROCESS } from '../../web-development.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
@Component({
  selector: 'app-wd-process',
  imports: [TrPipe, Reveal, I18nAnimation],
  templateUrl: './wd-process.html',
  styleUrl: './wd-process.css',
})
export class WdProcess {
  readonly steps = PROCESS;
}
