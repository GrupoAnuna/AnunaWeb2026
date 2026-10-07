import { Component, computed, signal } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { HOUSE_SPOTS, HouseSpot } from '../../cyber.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
@Component({
  selector: 'app-cy-house',
  imports: [TrPipe, Icon, Reveal, I18nAnimation],
  templateUrl: './cy-house.html',
  styleUrl: './cy-house.css',
})
export class CyHouse {
  readonly spots = HOUSE_SPOTS;
  readonly active = signal<HouseSpot['id']>('puerta');
  readonly current = computed(() => this.spots.find((s) => s.id === this.active())!);

  select(id: HouseSpot['id']): void {
    this.active.set(id);
  }

  is(id: HouseSpot['id']): boolean {
    return this.active() === id;
  }
}
