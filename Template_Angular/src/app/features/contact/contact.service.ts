import { Injectable, inject, isDevMode } from '@angular/core';
import { LanguageService } from '../../core/language.service';

export interface ContactRequest {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje?: string;
  intereses?: string[];
  privacidad: boolean;
}

/** Error con el motivo devuelto por el servidor (útil para depurar) */
export class ContactError extends Error {
  constructor(
    readonly reason: 'validation' | 'rate_limit' | 'network' | 'server',
    readonly fields: string[] = [],
  ) {
    super(reason);
  }
}

/** Endpoint PHP (public/api/contact.php → se publica en /api/contact.php) */
const ENDPOINT = '/api/contact.php';
/**
 * En desarrollo (ng serve) no hay PHP: se simula el envío para poder probar
 * los formularios. Pon esto en false si levantas PHP localmente y quieres
 * probar el envío real.
 */
const SIMULATE_IN_DEV = true;

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly i18n = inject(LanguageService);

  /**
   * Envía la solicitud. Todos los formularios del sitio pasan por aquí.
   * Añade automáticamente la página de origen, el idioma y el campo trampa.
   * Lanza ContactError si algo falla (los formularios ya muestran su mensaje de error).
   */
  async send(data: ContactRequest): Promise<void> {
    const payload = {
      ...data,
      pagina: typeof location !== 'undefined' ? location.pathname : '/',
      lang: this.i18n.lang(),
      website: '', // campo trampa: los humanos nunca lo llenan
    };

    if (isDevMode() && SIMULATE_IN_DEV) {
      console.info('[ContactService] Envío simulado (desarrollo):', payload);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    let res: Response;
    try {
      res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } catch {
      throw new ContactError('network');
    } finally {
      clearTimeout(timeout);
    }

    const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: string[] };
    if (res.ok && body.ok) return;
    if (res.status === 422) throw new ContactError('validation', body.fields ?? []);
    if (res.status === 429) throw new ContactError('rate_limit');
    throw new ContactError('server');
  }
}
