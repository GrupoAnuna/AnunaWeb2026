import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { CLOUD_SERVICES } from '../../cloud.data'; 
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
@Component({
  selector: 'app-cl-services',
  imports: [TrPipe, RouterLink, Icon, Reveal, I18nAnimation],
  templateUrl: './cl-services.html',
  styleUrl: './cl-services.css',
})
export class ClServices {
  readonly services = CLOUD_SERVICES;
}
