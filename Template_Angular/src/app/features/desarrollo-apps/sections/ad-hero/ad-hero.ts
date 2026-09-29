import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/icon';
import { Ripple } from '../../../../shared/ripple';

@Component({
  selector: 'app-ad-hero',
  imports: [RouterLink, Icon, Ripple],
  templateUrl: './ad-hero.html',
  styleUrl: './ad-hero.css',
})
export class AdHero {
  readonly headline = 'Apps que tus clientes quieren usar todos los días.';
  readonly words = this.headline.split(' ');
}
