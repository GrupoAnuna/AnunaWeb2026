import { Component } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { ADVANTAGES, PROOF } from '../../web-development.data';

@Component({
  selector: 'app-wd-why',
  imports: [Icon, Reveal],
  templateUrl: './wd-why.html',
  styleUrl: './wd-why.css',
})
export class WdWhy {
  readonly advantages = ADVANTAGES;
  readonly proof = PROOF;
  readonly proofIcons = ['clock', 'users', 'pin'] as const;
  readonly tests = ['Rendimiento', 'Seguridad', 'Responsive'];
}
