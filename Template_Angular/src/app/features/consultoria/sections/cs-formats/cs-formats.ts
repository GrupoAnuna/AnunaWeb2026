import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { FORMATS } from '../../consulting.data';

@Component({
  selector: 'app-cs-formats',
  imports: [RouterLink, Icon, Reveal],
  templateUrl: './cs-formats.html',
  styleUrl: './cs-formats.css',
})
export class CsFormats {
  readonly formats = FORMATS;
}
