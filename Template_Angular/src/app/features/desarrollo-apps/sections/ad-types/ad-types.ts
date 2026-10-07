import { Component, ElementRef, inject, signal } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { APP_TYPES } from '../../app-development.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
@Component({
  selector: 'app-ad-types',
  imports: [TrPipe, Icon, Reveal, I18nAnimation],
  templateUrl: './ad-types.html',
  styleUrl: './ad-types.css',
})
export class AdTypes {
  readonly types = APP_TYPES;
  readonly active = signal(0);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  select(i: number): void {
    this.active.set(i);
  }

  /** Navegación con teclado entre pestañas (patrón accesible de "tabs") */
  onKeydown(event: KeyboardEvent): void {
    const last = this.types.length - 1;
    const map: Record<string, number> = {
      ArrowRight: this.active() === last ? 0 : this.active() + 1,
      ArrowLeft: this.active() === 0 ? last : this.active() - 1,
      Home: 0,
      End: last,
    };
    const next = map[event.key];
    if (next === undefined) return;
    event.preventDefault();
    this.active.set(next);
    this.host.nativeElement.querySelector<HTMLElement>(`#ad-tab-${next}`)?.focus();
  }
}
