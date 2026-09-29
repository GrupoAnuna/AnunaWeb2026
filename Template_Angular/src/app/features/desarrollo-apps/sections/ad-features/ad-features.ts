import { Component } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { FEATURES, USE_CASES } from '../../app-development.data';

@Component({
  selector: 'app-ad-features',
  imports: [Icon, Reveal],
  templateUrl: './ad-features.html',
  styleUrl: './ad-features.css',
})
export class AdFeatures {
  readonly features = FEATURES;
  /** Dos filas de la cinta, en sentidos opuestos */
  readonly rowA = USE_CASES.slice(0, 6);
  readonly rowB = USE_CASES.slice(6);
}
