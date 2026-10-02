import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { IaHero } from './sections/ia-hero/ia-hero';
import { IaDemos } from './sections/ia-demos/ia-demos';
import { IaFlow } from './sections/ia-flow/ia-flow';
import { IaSolutions } from './sections/ia-solutions/ia-solutions';
import { IaTrust } from './sections/ia-trust/ia-trust';
import { IaIdeas } from './sections/ia-ideas/ia-ideas';
import { Footer } from '@features/shell/components/footer/footer.component';
import { HeaderComponent } from '@features/shell/components/header/header.component';
import { Whatsapp } from '@features/shell/components/whatsapp/whatsapp';

@Component({
  selector: 'app-ai-page',
  imports: [IaHero, IaDemos, IaFlow, IaSolutions, IaTrust, IaIdeas, Footer, HeaderComponent, Whatsapp],
  templateUrl: './ai-page.html',
})
export class AiPage {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'IA a medida para pymes: asistentes virtuales para web y WhatsApp, automatización de documentos, análisis de datos y capacitación. Conectada a la información de tu negocio.',
    });
  }
}
