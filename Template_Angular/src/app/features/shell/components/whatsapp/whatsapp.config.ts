// ============================================================
// Configuración del botón flotante de WhatsApp.
// Edita aquí los números, las zonas y el mensaje inicial.
// ============================================================

export interface WhatsappZone {
  id: 'es' | 'mx' | 'ar';
  label: string;
  phone: string;   // solo dígitos, con código de país (sin + ni espacios)
  display: string; // cómo se muestra en pantalla
}

import type { Lang } from "@core/language.service";
export const WHATSAPP_MESSAGE = 'Hola, me gustaría más información sobre sus servicios.';
export const WHATSAPP_MESSAGES: Record<Lang, string> = {
  es: WHATSAPP_MESSAGE,
  en: "Hi, I'd like more information about your services.",
};

/** Nombre de cada zona en inglés (los números no cambian) */
export const ZONE_LABELS_EN: Record<string, string> = { es: 'Spain', mx: 'Mexico', ar: 'Argentina' };

/** Textos de la interfaz del botón y el modal */
export const WHATSAPP_TEXT = {
  es: {
    fab: 'Escríbenos por WhatsApp', title: 'Elige tu zona',
    desc: 'Selecciona dónde quieres que te atendamos por WhatsApp.',
    close: 'Cerrar', newTab: '(abre WhatsApp en una pestaña nueva)',
  },
  en: {
    fab: 'Message us on WhatsApp', title: 'Choose your region',
    desc: 'Select where you would like us to help you on WhatsApp.',
    close: 'Close', newTab: '(opens WhatsApp in a new tab)',
  },
};

export const WHATSAPP_ZONES: WhatsappZone[] = [
  { id: 'es', label: 'España', phone: '34673561620', display: '+34 673 561 620' },
  { id: 'mx', label: 'Mexico', phone: '525539022537', display: '+52 55 3902 2537' },
  { id: 'ar', label: 'Argentina', phone: '5493513952644', display: '+54 9 351 395 2644' },
];

/** Arma el enlace oficial de WhatsApp con el mensaje ya escrito */
export function whatsappUrl(phone: string, message = WHATSAPP_MESSAGE): string {
  const params = new URLSearchParams({
    phone,
    text: message,
    type: 'phone_number',
    app_absent: '0',
  });
  return `https://api.whatsapp.com/send/?${params.toString()}`;
}
