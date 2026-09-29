import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Reveal } from '../../shared/reveal';
import { Ripple } from '../../shared/ripple';
import { Tilt } from  '../../shared/tilt';
import { CASES } from './cases.data';
import { Footer } from '@features/shell/components/footer/footer.component';
import { HeaderComponent } from '@features/shell/components/header/header.component';


@Component({
  selector: 'app-cases',
  imports: [NgOptimizedImage, RouterLink, Reveal, Ripple, Tilt, Footer, HeaderComponent],
  templateUrl: './cases.html',
  styleUrl: './cases.css',
})
export class Cases {
  readonly cases = CASES;

  /** Dominio legible para la barra del navegador simulado */
  domain(url: string): string {
    return new URL(url).hostname.replace(/^www\./, '');
  }

  /** Los dos primeros proyectos ocupan más espacio en escritorio */
  spanClass(i: number): string {
    if (i < 2) return 'lg:col-span-3';
    if (i === this.cases.length - 1 && this.cases.length % 2 === 1) return 'md:col-span-2 lg:col-span-2';
    return 'lg:col-span-2';
  }
}
