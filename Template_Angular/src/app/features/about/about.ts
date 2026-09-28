import { Component, ElementRef, afterNextRender, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Reveal } from '../../shared/reveal';
import { PILLARS, TEAMS } from './about.data';
import { Footer } from '@features/shell/components/footer/footer.component';
import { HeaderComponent } from '@features/shell/components/header/header.component';


@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, Reveal,HeaderComponent,Footer],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  readonly pillars = PILLARS;
  readonly teams = TEAMS;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterNextRender(() => {
      // Movimiento reducido: congela las animaciones SVG
      if (!document.documentElement.classList.contains('anim')) {
        this.host.nativeElement
          .querySelectorAll('svg')
          .forEach((s) => (s as SVGSVGElement).pauseAnimations?.());
      }
    });
  }
}
