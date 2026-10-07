import { Component, inject } from '@angular/core';
import { provideTranslations } from '../../core/translations';
import { Meta } from '@angular/platform-browser';
import { WdHero } from './sections/wd-hero/wd-hero';
import { WdServices } from './sections/wd-services/wd-services';
import { WdWhy } from './sections/wd-why/wd-why';
import { WdProcess } from './sections/wd-process/wd-process';
import { WdQuote } from './sections/wd-quote/wd-quote';
import { Footer } from '@features/shell/components/footer/footer.component';
import { HeaderComponent } from '@features/shell/components/header/header.component';
import { Whatsapp } from '@features/shell/components/whatsapp/whatsapp';
import { I18nAnimation } from '@shared/i18n-animation';

import { WEB_DEV_EN } from './web-development.i18n';
@Component({
  providers:[provideTranslations(WEB_DEV_EN)],
  selector: 'app-web-development',
  imports: [WdHero, WdServices, WdWhy, WdProcess, WdQuote, Footer, HeaderComponent, Whatsapp, I18nAnimation],
  templateUrl: './web-development.html',
})
export class WebDevelopment {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Desarrollo de páginas web, tiendas online y aplicaciones web a la medida. WordPress, CMS o código 100% personalizado, desde cero o continuando tu proyecto.',
    });
  }
}
