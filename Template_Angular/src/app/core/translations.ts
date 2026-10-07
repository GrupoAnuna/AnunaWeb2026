import { InjectionToken, Provider, inject } from '@angular/core';
import { LanguageService } from './language.service';

/**
 * Diccionarios de traducción "por texto original": la clave es la frase en
 * español tal como aparece en la plantilla o en los datos, y el valor es su
 * versión en inglés. Cada página registra el suyo con provideTranslations().
 */
export type Dictionary = Record<string, string>;

export const TRANSLATIONS = new InjectionToken<Dictionary[]>('TRANSLATIONS');

/** Registra el diccionario de una página (se usa en "providers" del componente de la página) */
export function provideTranslations(dict: Dictionary): Provider {
  return { provide: TRANSLATIONS, useValue: dict, multi: true };
}

/** Frases sin traducción detectadas en modo desarrollo (para revisar en consola: window.__trMissing) */
const missing = new Set<string>();

/**
 * Devuelve una función que traduce una frase según el idioma activo.
 * Úsala en código TypeScript; en plantillas usa el pipe "tr".
 */
export function injectTranslate(): (text: unknown) => unknown {
  const dicts = inject(TRANSLATIONS, { optional: true }) ?? [];
  const i18n = inject(LanguageService);
  const translated = new Set(dicts.flatMap((d) => Object.values(d)));
  return (text: unknown) => {
    if (typeof text !== 'string' || i18n.lang() === 'es') return text;
    for (const d of dicts) {
      const hit = d[text];
      if (hit !== undefined) return hit;
    }
    // Registro de faltantes: solo textos que parecen frases (con letras y espacios o acentos)
    if (typeof window !== 'undefined' && !translated.has(text) && /[A-Za-zÁÉÍÓÚáéíóúñÑ]/.test(text) && /[\sáéíóúñ¿¡]/.test(text)) {
      missing.add(text);
      (window as unknown as { __trMissing: string[] }).__trMissing = [...missing];
    }
    return text; // sin traducción: se muestra el original
  };
}
