import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/icon';
import { Ripple } from '../../../../shared/ripple';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
import { injectTranslate } from '../../../../core/translations';

@Component({
  selector: 'app-ad-hero',
  imports: [TrPipe, RouterLink, Icon, Ripple, I18nAnimation],
  templateUrl: './ad-hero.html',
  styleUrl: './ad-hero.css',
})
export class AdHero {
  readonly headline = 'Apps que tus clientes quieren usar todos los días.';
  private readonly translate = injectTranslate();
  /** Se traduce la frase completa y luego se separa en palabras para la animación */
  readonly words = computed(() => String(this.translate(this.headline)).split(' '));
}
