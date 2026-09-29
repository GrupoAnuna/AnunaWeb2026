import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { AdHero } from './sections/ad-hero/ad-hero';
import { AdTypes } from './sections/ad-types/ad-types';
import { AdFeatures } from './sections/ad-features/ad-features';
import { AdProcess } from './sections/ad-process/ad-process';
import { AdBuilder } from './sections/ad-builder/ad-builder';
import { Footer } from '@features/shell/components/footer/footer.component';
import { HeaderComponent } from '@features/shell/components/header/header.component';

@Component({
  selector: 'app-app-development',
  imports: [AdHero, AdTypes, AdFeatures, AdProcess, AdBuilder, Footer, HeaderComponent],
  templateUrl: './app-development.html',
})
export class AppDevelopment {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Desarrollo de apps para iOS, Android y web: multiplataforma, nativas, PWA y apps empresariales. Diseño, desarrollo, publicación en tiendas y soporte.',
    });
  }
}
