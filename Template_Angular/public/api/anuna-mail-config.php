<?php
/**
 * ============================================================
 *  Configuración del envío de correos — Grupo Anuna
 * ============================================================
 *  1. Copia este archivo y renómbralo a  anuna-mail-config.php
 *  2. Súbelo FUERA de public_html, en la carpeta del dominio:
 *       /domains/grupoanuna.com/anuna-mail-config.php
 *     (así nadie puede descargarlo desde el navegador)
 *  3. Completa los datos de tu cuenta de correo de Hostinger.
 *
 *  Alternativa (si no puedes subir fuera de public_html):
 *  guárdalo como  api/config.php  — el .htaccess de /api bloquea
 *  el acceso directo a ese archivo.
 * ============================================================
 */
return [
    // ---------- SMTP de Hostinger (hPanel → Correos → Configuración) ----------
    'smtp_host'     => 'smtp.hostinger.com',
    'smtp_port'     => 465,             // 465 con SSL (recomendado) o 587 con TLS
    'smtp_secure'   => 'ssl',           // 'ssl' para 465, 'tls' para 587
    'smtp_user'     => 'no-reply@grupoanuna.com',   // la cuenta que ENVÍA
    'smtp_pass'     => 'AnUn@&r0uP!*',

    // ---------- Remitente y destinatarios ----------
    'from_email'    => 'no-reply@grupoanuna.com',   // debe ser la misma cuenta SMTP
    'from_name'     => 'Grupo Anuna',
    'to_email'      => 'info@grupoanuna.com',       // quién RECIBE las solicitudes
    'to_name'       => 'Equipo Grupo Anuna',
    'bcc'           => [],                          // copias ocultas opcionales, ej. ['ventas@grupoanuna.com']
    'reply_to'      => 'info@grupoanuna.com',       // a dónde responde el cliente desde la confirmación

    // ---------- Comportamiento ----------
    'send_confirmation' => true,    // enviar correo de confirmación al cliente
    'timezone'          => 'America/Mexico_City',
    'timezone_label'    => 'hora de CDMX',      // cómo se muestra la hora en la notificación
    'site_url'          => 'https://grupoanuna.com',
    // Dominios desde los que se aceptan envíos (protección básica contra abuso)
    'allowed_origins'   => ['https://grupoanuna.com', 'https://www.grupoanuna.com'],
    // Límite de envíos por IP
    'rate_limit'        => ['max' => 5, 'window_seconds' => 600],

    // ---------- Datos de contacto que aparecen en los correos ----------
    'whatsapp_es'   => '34673561620',
    'whatsapp_latam'=> '525539022537',
    'contact_email' => 'info@grupoanuna.com',
];
