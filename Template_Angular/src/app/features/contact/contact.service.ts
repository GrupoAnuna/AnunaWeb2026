import { Injectable } from '@angular/core';

export interface ContactRequest {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  intereses: string[];
  privacidad: boolean;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  /**
   * Envía la solicitud de contacto.
   * TODO: conectar con el endpoint real. Ejemplo con fetch:
   *
   *   const res = await fetch('/api/contacto', {
   *     method: 'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body: JSON.stringify(data),
   *   });
   *   if (!res.ok) throw new Error('Error al enviar');
   */
  async send(data: ContactRequest): Promise<void> {
    console.info('[ContactService] Solicitud (simulada):', JSON.stringify(data));
    await new Promise((resolve) => setTimeout(resolve, 1300));
  }
}
