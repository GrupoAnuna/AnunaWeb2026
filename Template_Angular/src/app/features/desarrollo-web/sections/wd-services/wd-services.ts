import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { KEY_SERVICES, PATH_MESSAGES, Path } from '../../web-development.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
@Component({
  selector: 'app-wd-services',
  imports: [TrPipe, RouterLink, Icon, Reveal, I18nAnimation],
  templateUrl: './wd-services.html',
  styleUrl: './wd-services.css',
})
export class WdServices {
  readonly services = KEY_SERVICES;
  readonly paths: { value: Path; label: string }[] = [
    { value: 'nuevo', label: 'Empiezo desde cero' },
    { value: 'existente', label: 'Ya tengo algo construido' },
  ];

  /** Camino elegido por el usuario (null = ver todo) */
  readonly path = signal<Path | null>(null);
  readonly message = computed(() => {
    const p = this.path();
    return p ? PATH_MESSAGES[p] : '';
  });

  select(p: Path): void {
    // Un segundo clic en el mismo camino vuelve a mostrar todo
    this.path.update((current) => (current === p ? null : p));
  }

  isMatch(paths: Path[]): boolean {
    const p = this.path();
    return p === null || paths.includes(p);
  }
}
