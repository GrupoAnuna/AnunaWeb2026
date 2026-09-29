import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/icon';
import { Ripple } from '../../../../shared/ripple';
import { SCOPE } from '../../web-development.data';

@Component({
  selector: 'app-wd-hero',
  imports: [RouterLink, Icon, Ripple],
  templateUrl: './wd-hero.html',
  styleUrl: './wd-hero.css',
})
export class WdHero {
  readonly headline = 'Construimos la web que tu negocio necesita, desde cero o desde donde te quedaste.';
  readonly words = this.headline.split(' ');
  readonly scope = SCOPE;
}
