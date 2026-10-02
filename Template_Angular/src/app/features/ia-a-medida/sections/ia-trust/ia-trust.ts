import { Component } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { PRINCIPLES } from '../../ai.data';

@Component({
  selector: 'app-ia-trust',
  imports: [Icon, Reveal],
  templateUrl: './ia-trust.html',
  styleUrl: './ia-trust.css',
})
export class IaTrust {
  readonly principles = PRINCIPLES;
}
