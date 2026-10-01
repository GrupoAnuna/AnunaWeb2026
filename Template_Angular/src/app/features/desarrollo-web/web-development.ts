import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { WdHero } from './sections/wd-hero/wd-hero';
import { WdServices } from './sections/wd-services/wd-services';
import { WdWhy } from './sections/wd-why/wd-why';
import { WdProcess } from './sections/wd-process/wd-process';
import { WdQuote } from './sections/wd-quote/wd-quote';
import { Footer } from '@features/shell/components/footer/footer.component';
import { HeaderComponent } from '@features/shell/components/header/header.component';
import { Whatsapp } from '@features/shell/components/whatsapp/whatsapp';

@Component({
  selector: 'app-web-development',
  imports: [WdHero, WdServices, WdWhy, WdProcess, WdQuote, Footer, HeaderComponent,Whatsapp],
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
