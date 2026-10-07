import { Component, inject } from '@angular/core';
import { provideTranslations } from '../../core/translations';
import { Meta } from '@angular/platform-browser';
import { ClHero } from './sections/cl-hero/cl-hero';
import { ClCompare } from './sections/cl-compare/cl-compare';
import { ClServices } from './sections/cl-services/cl-services';
import { ClProcess } from './sections/cl-process/cl-process';
import { ClFaq } from './sections/cl-faq/cl-faq';
import { ClContact } from './sections/cl-contact/cl-contact';
import { Footer } from '@features/shell/components/footer/footer.component';
import { HeaderComponent } from '@features/shell/components/header/header.component';
import { Whatsapp } from '@features/shell/components/whatsapp/whatsapp';

import { CLOUD_EN } from './cloud-page.i18n';
@Component({
  providers: [provideTranslations(CLOUD_EN)],
  selector: 'app-cloud-page',
  imports: [ClHero, ClCompare, ClServices, ClProcess, ClFaq, ClContact, Footer, HeaderComponent, Whatsapp],
  templateUrl: './cloud-page.html',
})
export class CloudPage {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Servicios cloud para pymes: migración a la nube sin detener tu operación, infraestructura administrada, respaldos, correo corporativo, hosting y optimización de costos.',
    });
  }
}
