import {
  Directive,
  ElementRef,
  inject,
  effect,
} from '@angular/core';

import { LanguageService } from '@core/language.service';

@Directive({
  selector: '[i18nAnimation]',
  standalone: true,
})
export class I18nAnimation {
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly i18n = inject(LanguageService);

  constructor() {
    effect(() => {
      this.i18n.lang();

      const el = this.element.nativeElement;

      queueMicrotask(() => {
        el.classList.remove('i18n-text-in');

        void el.offsetWidth;

        el.classList.add('i18n-text-in');
      });
    });
  }
}