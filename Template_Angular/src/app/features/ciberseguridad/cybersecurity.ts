import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { CyHero } from './sections/cy-hero/cy-hero';
import { CyHouse } from './sections/cy-house/cy-house';
import { CyPhishing } from './sections/cy-phishing/cy-phishing';
import { CyLayers } from './sections/cy-layers/cy-layers';
import { CyCycle } from './sections/cy-cycle/cy-cycle';
import { CyCheckup } from './sections/cy-checkup/cy-checkup';
import { Footer } from '@features/shell/components/footer/footer.component';
import { HeaderComponent } from '@features/shell/components/header/header.component';

@Component({
  selector: 'app-cybersecurity',
  imports: [CyHero, CyHouse, CyPhishing, CyLayers, CyCycle, CyCheckup, Footer, HeaderComponent],
  templateUrl: './cybersecurity.html',
})
export class Cybersecurity {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Ciberseguridad para pymes explicada en palabras simples: contraseñas, correo, respaldos, protección de equipos, monitoreo y capacitación. Haz tu chequeo gratis.',
    });
  }
}
