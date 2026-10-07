import { Pipe, PipeTransform } from '@angular/core';
import { injectTranslate } from '../core/translations';

/**
 * Traduce un texto según el idioma activo usando el diccionario de la página.
 *   {{ 'Cotiza tu proyecto' | tr }}
 *   [attr.aria-label]="'Cerrar' | tr"
 *   {{ servicio.titulo | tr }}      ← también funciona con datos
 * Valores que no son texto (números, null…) se devuelven sin cambios.
 * Es "impuro" para reaccionar al instante cuando cambia el idioma.
 */
@Pipe({ name: 'tr', pure: false })
export class TrPipe implements PipeTransform {
  private readonly translate = injectTranslate();

  transform<T>(value: T): T {
    return this.translate(value) as T;
  }
}
