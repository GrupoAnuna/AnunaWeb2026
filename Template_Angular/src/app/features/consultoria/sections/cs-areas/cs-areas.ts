import { Component, signal } from '@angular/core';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { AREAS } from '../../consulting.data';

@Component({
  selector: 'app-cs-areas',
  imports: [Icon, Reveal],
  templateUrl: './cs-areas.html',
  styleUrl: './cs-areas.css',
})
export class CsAreas {
  readonly areas = AREAS;
  /** Contenido ilustrativo de cada documento de la pila */
  readonly previewBars = [
    { l: 'Procesos', w: 45 },
    { l: 'Herramientas', w: 70 },
    { l: 'Datos', w: 30 },
    { l: 'Equipo', w: 85 },
  ];
  readonly previewRoadmap = ['Etapa 1 · Lo urgente', 'Etapa 2 · Conectar', 'Etapa 3 · Crecer'];
  readonly previewFlow = ['Pedido', 'Aprobación', 'Factura'];
  readonly previewIdeas = ['Atención 24/7', 'Reportes automáticos', 'Clasificar correos', 'Resumir reuniones'];
  readonly previewCompare = [
    { o: 'Opción A', s: 2 },
    { o: 'Opción B', s: 3 },
    { o: 'Opción C', s: 1 },
  ];
  readonly dots = [1, 2, 3];

  /** Área abierta (la primera, por defecto) */
  readonly open = signal(0);

  toggle(i: number): void {
    // Siempre queda una abierta: así la pila de documentos nunca está vacía
    this.open.set(i);
  }
}
