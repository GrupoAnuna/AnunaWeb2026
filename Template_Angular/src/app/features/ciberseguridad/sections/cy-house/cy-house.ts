import { Component, computed, signal } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { HOUSE_SPOTS, HouseSpot } from '../../cyber.data';

@Component({
  selector: 'app-cy-house',
  imports: [Icon, Reveal],
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
