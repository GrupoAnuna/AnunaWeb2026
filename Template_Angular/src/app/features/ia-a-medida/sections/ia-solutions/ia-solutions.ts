import { Component } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { AI_SOLUTIONS } from '../../ai.data';

@Component({
  selector: 'app-ia-solutions',
  imports: [Icon, Reveal],
  templateUrl: './ia-solutions.html',
  styleUrl: './ia-solutions.css',
})
export class IaSolutions {
  readonly solutions = AI_SOLUTIONS;
}
