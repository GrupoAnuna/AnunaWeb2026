
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
 
import { routes } from './app.routes';
 
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Tu proyecto no usa Zone.js: se mantiene la detección de cambios sin zonas
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      // Permite que los enlaces con fragment (#contacto) bajen a su sección
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    // Hidratación de SSR (venía en tu proyecto original)
    provideClientHydration(withEventReplay()),
  ],
};
 