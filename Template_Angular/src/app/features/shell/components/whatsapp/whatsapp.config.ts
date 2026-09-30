// ============================================================
// Configuración del botón flotante de WhatsApp.
// Edita aquí los números, las zonas y el mensaje inicial.
// ============================================================

export interface WhatsappZone {
  id: 'es' | 'latam';
  label: string;
  phone: string;   // solo dígitos, con código de país (sin + ni espacios)
  display: string; // cómo se muestra en pantalla
}

export const WHATSAPP_MESSAGE = 'Hola, me gustaría más información sobre sus servicios.';

export const WHATSAPP_ZONES: WhatsappZone[] = [
  { id: 'es', label: 'España', phone: '34673561620', display: '+34 673 561 620' },
  { id: 'latam', label: 'Latinoamérica', phone: '525539022537', display: '+52 55 3902 2537' },
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
