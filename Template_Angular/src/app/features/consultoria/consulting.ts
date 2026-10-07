import { Component, inject } from '@angular/core';
import { provideTranslations } from '../../core/translations';
import { Meta } from '@angular/platform-browser';
import { CsHero } from './sections/cs-hero/cs-hero';
import { CsPains } from './sections/cs-pains/cs-pains';
import { CsAreas } from './sections/cs-areas/cs-areas';
import { CsFormats } from './sections/cs-formats/cs-formats';
import { CsQuiz } from './sections/cs-quiz/cs-quiz';
import { Footer } from '@features/shell/components/footer/footer.component';
import { HeaderComponent } from '@features/shell/components/header/header.component';
import { Whatsapp } from '@features/shell/components/whatsapp/whatsapp';

import { CONSULTING_EN } from './consulting.i18n';
@Component({
  providers: [provideTranslations(CONSULTING_EN)],
  selector: 'app-consulting',
  imports: [CsHero, CsPains, CsAreas, CsFormats, CsQuiz, Footer, HeaderComponent, Whatsapp],
  templateUrl: './consulting.html',
})
export class Consulting {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Consultoría tecnológica para pymes: diagnóstico digital, hoja de ruta, automatización de procesos, IA aplicada y selección de tecnología. Haz tu autodiagnóstico gratis.',
    });
  }
}
