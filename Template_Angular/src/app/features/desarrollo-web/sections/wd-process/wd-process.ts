import { Component } from '@angular/core';
import { Reveal } from '../../../../shared/reveal';
import { PROCESS } from '../../web-development.data';

@Component({
  selector: 'app-wd-process',
  imports: [Reveal],
  templateUrl: './wd-process.html',
  styleUrl: './wd-process.css',
})
export class WdProcess {
  readonly steps = PROCESS;
}
