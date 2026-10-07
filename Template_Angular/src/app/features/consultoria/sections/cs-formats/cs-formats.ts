import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { FORMATS } from '../../consulting.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
@Component({
  selector: 'app-cs-formats',
  imports: [TrPipe, RouterLink, Icon, Reveal, I18nAnimation],
  templateUrl: './cs-formats.html',
  styleUrl: './cs-formats.css',
})
export class CsFormats {
  readonly formats = FORMATS;
}
