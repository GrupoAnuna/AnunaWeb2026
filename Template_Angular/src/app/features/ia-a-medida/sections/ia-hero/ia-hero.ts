import { afterNextRender, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/icon';
import { Ripple } from '../../../../shared/ripple';
import { HERO_CHAT } from '../../ai.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
/** Cada paso de la conversación: cuántos mensajes se ven, si la IA "escribe" y cuánto dura */
const SCRIPT = [
  { count: 0, typing: false, ms: 700 },
  { count: 1, typing: false, ms: 800 },
  { count: 1, typing: true, ms: 1400 },
  { count: 2, typing: false, ms: 1800 },
  { count: 3, typing: false, ms: 800 },
  { count: 3, typing: true, ms: 1400 },
  { count: 4, typing: false, ms: 5000 },
];

import { injectTranslate } from '../../../../core/translations';

@Component({
  selector: 'app-ia-hero',
  imports: [TrPipe, RouterLink, Icon, Ripple, I18nAnimation],
  templateUrl: './ia-hero.html',
  styleUrl: './ia-hero.css',
})
export class IaHero {
  readonly headline = 'Inteligencia artificial que trabaja para tu negocio.';
  private readonly translate = injectTranslate();
  /** Se traduce la frase completa y luego se separa en palabras para la animación */
  readonly words = computed(() => String(this.translate(this.headline)).split(' '));
  readonly chat = HERO_CHAT;
  readonly perks = ['Conectada a tu información', 'Lista para WhatsApp y web', 'Sin tecnicismos'];
  readonly sources = ['Políticas de envío', 'Inventario'];

  /** El servidor (SSR) muestra la conversación completa */
  readonly count = signal(HERO_CHAT.length);
  readonly typing = signal(false);

  /** La fuente que la IA está consultando en este momento */
  readonly searching = computed(() => (this.typing() ? this.chat[this.count()]?.source ?? null : null));

  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    afterNextRender(() => {
      if (!document.documentElement.classList.contains('anim')) return;
      this.play(0);
    });
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  /** ¿Esta fuente ya se usó en una respuesta visible? */
  isDone(source: string): boolean {
    return this.chat.slice(0, this.count()).some((m) => m.source === source);
  }

  private play(i: number): void {
    const step = SCRIPT[i];
    this.count.set(step.count);
    this.typing.set(step.typing);
    this.timer = setTimeout(() => this.play((i + 1) % SCRIPT.length), step.ms);
  }
}
