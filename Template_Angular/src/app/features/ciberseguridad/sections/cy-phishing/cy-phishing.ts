import { Component, computed, signal } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { PHISH_FLAGS, PhishFlag } from '../../cyber.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
@Component({
  selector: 'app-cy-phishing',
  imports: [TrPipe, Icon, Reveal, I18nAnimation],
  templateUrl: './cy-phishing.html',
  styleUrl: './cy-phishing.css',
})
export class CyPhishing {
  readonly flags = PHISH_FLAGS;
  /** Señales encontradas, en el orden en que se descubrieron */
  readonly found = signal<PhishFlag['id'][]>([]);
  readonly done = computed(() => this.found().length === this.flags.length);
  readonly foundFlags = computed(() => this.found().map((id) => this.flags.find((f) => f.id === id)!));

  reveal(id: PhishFlag['id']): void {
    if (!this.found().includes(id)) this.found.update((l) => [...l, id]);
  }

  /** Número de la señal (según el orden en que se encontró) */
  order(id: PhishFlag['id']): number {
    return this.found().indexOf(id) + 1;
  }

  isFound(id: PhishFlag['id']): boolean {
    return this.found().includes(id);
  }

  showAll(): void {
    this.flags.forEach((f) => this.reveal(f.id));
  }

  reset(): void {
    this.found.set([]);
  }
}
