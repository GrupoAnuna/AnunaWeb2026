import { DOCUMENT, Injectable, computed, inject, signal } from '@angular/core';

export type Lang = 'es' | 'en';
const STORAGE_KEY = 'anuna-lang';

/**
 * Idioma del sitio.
 * El script de index.html detecta el idioma del navegador (o la elección
 * guardada) y lo pone en <html lang>; este servicio parte de ahí.
 *
 * Uso en un componente:
 *   private readonly i18n = inject(LanguageService);
 *   readonly t = this.i18n.pick(MIS_TEXTOS);   // MIS_TEXTOS = { es: {...}, en: {...} }
 *   // en la plantilla: {{ t().titulo }}
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly root = inject(DOCUMENT).documentElement;

  readonly lang = signal<Lang>(this.root.lang === 'en' ? 'en' : 'es');

  set(lang: Lang): void {
    this.lang.set(lang);
    this.root.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* navegación privada */
    }
  }

  toggle(): void {
    this.set(this.lang() === 'es' ? 'en' : 'es');
  }

  /** Devuelve una señal con los textos del idioma activo */
  pick<T>(dict: Record<Lang, T>) {
    return computed(() => dict[this.lang()]);
  }
}
