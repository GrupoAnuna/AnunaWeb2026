import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/icon';
import { Ripple } from '../../../../shared/ripple';
import { SCOPE } from '../../web-development.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
import { injectTranslate } from '../../../../core/translations';

@Component({
  selector: 'app-wd-hero',
  imports: [TrPipe, RouterLink, Icon, Ripple, I18nAnimation],
  templateUrl: './wd-hero.html',
  styleUrl: './wd-hero.css',
})
export class WdHero {
  readonly headline = 'Construimos la web que tu negocio necesita, desde cero o desde donde te quedaste.';
  private readonly translate = injectTranslate();
  /** Se traduce la frase completa y luego se separa en palabras para la animación */
  readonly words = computed(() => String(this.translate(this.headline)).split(' '));
  readonly scope = SCOPE;
}
