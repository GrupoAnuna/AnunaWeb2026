import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/icon';
import { Ripple } from '../../../../shared/ripple';
import { EMERGENCY_WHATSAPP } from '../../cyber.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '@shared/tr.pipe';
import { injectTranslate } from '../../../../core/translations';

@Component({
  selector: 'app-cy-hero',
  imports: [TrPipe, RouterLink, Icon, Ripple, I18nAnimation],
  templateUrl: './cy-hero.html',
  styleUrl: './cy-hero.css',
})
export class CyHero {
  readonly headline = 'Protege tu negocio sin complicarte.';
  private readonly translate = injectTranslate();
  /** Se traduce la frase completa y luego se separa en palabras para la animación */
  readonly words = computed(() => String(this.translate(this.headline)).split(' '));
  readonly emergency = EMERGENCY_WHATSAPP;
  readonly perks = ['Explicado sin tecnicismos', 'Prevención antes que reacción', 'Respuesta rápida'];
  /** Amenazas que se acercan al escudo: ángulo y retraso de cada una */
  readonly threats = [
    { a: 20, d: 0 }, { a: 95, d: 1.1 }, { a: 160, d: 2.3 }, { a: 230, d: .6 },
    { a: 300, d: 1.7 }, { a: 340, d: 2.9 }, { a: 130, d: 3.4 }, { a: 265, d: 3.9 },
  ];
}
