import { Component } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { MIGRATION } from '../../cloud.data';

@Component({
  selector: 'app-cl-process',
  imports: [Icon, Reveal],
  templateUrl: './cl-process.html',
  styleUrl: './cl-process.css',
})
export class ClProcess {
  readonly steps = MIGRATION;
}
