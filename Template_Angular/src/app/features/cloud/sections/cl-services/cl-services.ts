import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { CLOUD_SERVICES } from '../../cloud.data';

@Component({
  selector: 'app-cl-services',
  imports: [RouterLink, Icon, Reveal],
  templateUrl: './cl-services.html',
  styleUrl: './cl-services.css',
})
export class ClServices {
  readonly services = CLOUD_SERVICES;
}
