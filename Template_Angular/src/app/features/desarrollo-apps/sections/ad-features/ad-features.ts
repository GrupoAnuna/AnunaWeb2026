import { Component } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { FEATURES, USE_CASES } from '../../app-development.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
@Component({
  selector: 'app-ad-features',
  imports: [TrPipe, Icon, Reveal, I18nAnimation],
  templateUrl: './ad-features.html',
  styleUrl: './ad-features.css',
})
export class AdFeatures {
  readonly features = FEATURES;
  /** Dos filas de la cinta, en sentidos opuestos */
  readonly rowA = USE_CASES.slice(0, 6);
  readonly rowB = USE_CASES.slice(6);
}
