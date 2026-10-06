import { DOCUMENT, Injectable, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';
const STORAGE_KEY = 'anuna-theme';

/**
 * Modo claro / oscuro.
 * El script de index.html ya aplicó el tema antes del primer pintado
 * (elección guardada o preferencia del sistema); aquí solo se lee y se cambia.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly root = inject(DOCUMENT).documentElement;

  readonly theme = signal<Theme>(this.root.classList.contains('dark') ? 'dark' : 'light');

  toggle(): void {
    this.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    // Transición suave de colores solo durante el cambio
    this.root.classList.add('theme-switching');
    this.root.classList.toggle('dark', theme === 'dark');
    this.theme.set(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* navegación privada: no se guarda, pero funciona */
    }
    setTimeout(() => this.root.classList.remove('theme-switching'), 400);
  }
}
