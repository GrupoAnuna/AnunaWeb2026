import { Component, inject } from '@angular/core';
import { provideTranslations } from '../../core/translations';
import { Meta } from '@angular/platform-browser';
import { AdHero } from './sections/ad-hero/ad-hero';
import { AdTypes } from './sections/ad-types/ad-types';
import { AdFeatures } from './sections/ad-features/ad-features';
import { AdProcess } from './sections/ad-process/ad-process';
import { AdBuilder } from './sections/ad-builder/ad-builder';
import { Footer } from '@features/shell/components/footer/footer.component';
import { HeaderComponent } from '@features/shell/components/header/header.component';
import { Whatsapp } from '@features/shell/components/whatsapp/whatsapp';
import { I18nAnimation } from '@shared/i18n-animation';

import { APP_DEV_EN } from './app-development.i18n';
@Component({
  providers: [provideTranslations(APP_DEV_EN)],
  selector: 'app-app-development',
  imports: [AdHero, AdTypes, AdFeatures, AdProcess, AdBuilder, Footer, HeaderComponent, Whatsapp, I18nAnimation],
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
