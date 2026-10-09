<?php
/**
 * ============================================================
 *  Plantillas de correo — Grupo Anuna
 *  HTML con tablas y estilos en línea (compatibles con Gmail,
 *  Outlook y Apple Mail) + versión de texto plano.
 *  Colores institucionales:
 *    Pizarra #4A6670 · Naranja #FF6B35 · Crema #FDF6EC
 *    Amarillo #FFD97D · Gris #5C5C5C · Tinta #1E2B30
 * ============================================================
 */
declare(strict_types=1);

function e(string $s): string { return htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, 'UTF-8'); }

/** Nombre legible de la página desde la que se envió el formulario */
function anuna_page_name(string $path): string
{
    $path = '/' . trim(strtok($path, '?#') ?: '/', '/');
    $map = [
        '/' => 'Inicio', '/desarrollo-web' => 'Desarrollo web', '/desarrollo-apps' => 'Desarrollo de apps',
        '/consultoria' => 'Consultoría', '/ia-a-medida' => 'IA a medida',
        '/ciberseguridad' => 'Ciberseguridad', '/cloud' => 'Cloud',
    ];
    return $map[$path] ?? $path;
}

/** Separa el mensaje del cliente del resumen automático que añaden algunos formularios ("[Cotizador] …") */
function anuna_split_message(string $msg): array
{
    if (preg_match('/^(.*?)(?:\n\n)?(\[[^\]]+\].*)$/s', $msg, $m)) {
        return [trim($m[1]), trim($m[2])];
    }
    return [trim($msg), ''];
}

/** Botón compatible con clientes de correo */
function anuna_button(string $href, string $label, string $bg, string $color): string
{
    return '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-table;margin:0 8px 8px 0"><tr>'
        . '<td bgcolor="' . $bg . '" style="border-radius:999px;background:' . $bg . '">'
        . '<a href="' . e($href) . '" target="_blank" style="display:inline-block;padding:13px 24px;font-family:\'DM Sans\',Arial,sans-serif;font-size:15px;font-weight:700;color:' . $color . ';text-decoration:none;border-radius:999px">' . $label . '</a>'
        . '</td></tr></table>';
}

/** Estructura común: cabecera con logo, contenido y pie institucional */
function anuna_layout(string $content, string $preheader, string $badge, array $config, string $lang = 'es'): string
{
    $site = e($config['site_url'] ?? 'https://grupoanuna.com');
    $mail = e($config['contact_email'] ?? 'info@grupoanuna.com');
    $footerLine = $lang === 'en'
        ? 'We join forces so your business can grow.'
        : 'Aunamos esfuerzos para que tu negocio crezca.';
    $year = date('Y');
    return <<<HTML
<!DOCTYPE html>
<html lang="{$lang}" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">
<title>Grupo Anuna</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap" rel="stylesheet">
<style>
  @media (max-width:620px){ .container{width:100%!important} .px{padding-left:24px!important;padding-right:24px!important} .stack{display:block!important;width:100%!important} }
  a{color:#B8431A}
</style>
</head>
<body style="margin:0;padding:0;background:#F4EEE4;-webkit-text-size-adjust:100%">
<!-- Texto de vista previa (se muestra junto al asunto en la bandeja) -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">{$preheader}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F4EEE4" style="background:#F4EEE4">
<tr><td align="center" style="padding:32px 12px">
  <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px">

    <!-- Cabecera -->
    <tr><td style="background:#FDF6EC;border-radius:24px 24px 0 0;border:1px solid #EADFCC;border-bottom:0;padding:26px 36px" class="px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td valign="middle">
          <a href="{$site}" target="_blank" style="text-decoration:none">
            <img src="cid:anuna-logo" width="30" height="39" alt="" style="display:inline-block;vertical-align:middle;border:0">
            <span style="display:inline-block;vertical-align:middle;margin-left:10px;font-family:'DM Sans',Arial,sans-serif;font-size:26px;font-weight:700;letter-spacing:-0.5px;color:#4A6670">anuna</span>
          </a>
        </td>
        <td align="right" valign="middle">
          <span style="display:inline-block;background:#FFD97D;color:#2E434A;border-radius:999px;padding:6px 14px;font-family:'DM Sans',Arial,sans-serif;font-size:12px;font-weight:700">{$badge}</span>
        </td>
      </tr></table>
    </td></tr>

    <!-- Línea institucional: pizarra con tramo naranja -->
    <tr><td style="font-size:0;line-height:0">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="70%" height="4" bgcolor="#4A6670" style="background:#4A6670;font-size:0;line-height:0">&nbsp;</td>
        <td width="30%" height="4" bgcolor="#FF6B35" style="background:#FF6B35;font-size:0;line-height:0">&nbsp;</td>
      </tr></table>
    </td></tr>

    <!-- Contenido -->
    <tr><td bgcolor="#FFFFFF" style="background:#FFFFFF;border-left:1px solid #EADFCC;border-right:1px solid #EADFCC;padding:36px 36px 32px" class="px">
      {$content}
    </td></tr>

    <!-- Pie -->
    <tr><td bgcolor="#2E434A" style="background:#2E434A;border-radius:0 0 24px 24px;padding:28px 36px" class="px">
      <p style="margin:0;font-family:'DM Sans',Arial,sans-serif;font-size:16px;font-weight:700;color:#FFFFFF">{$footerLine}</p>
      <p style="margin:10px 0 0;font-family:'DM Sans',Arial,sans-serif;font-size:13px;line-height:1.6;color:#C9D6DA">
        <a href="{$site}" style="color:#FFD97D;text-decoration:none">grupoanuna.com</a> &nbsp;·&nbsp;
        <a href="mailto:{$mail}" style="color:#FFD97D;text-decoration:none">{$mail}</a><br>
        México · Argentina · España
      </p>
      <p style="margin:16px 0 0;font-family:'DM Sans',Arial,sans-serif;font-size:11px;color:#8FA5AC">© {$year} Grupo Anuna</p>
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>
HTML;
}

/** Fila de datos: etiqueta + valor */
function anuna_row(string $label, string $valueHtml): string
{
    return '<tr><td style="padding:12px 0;border-bottom:1px solid #F1EADF;font-family:\'DM Sans\',Arial,sans-serif;vertical-align:top" width="34%">'
        . '<span style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#8A9599">' . $label . '</span></td>'
        . '<td style="padding:12px 0;border-bottom:1px solid #F1EADF;font-family:\'DM Sans\',Arial,sans-serif;font-size:15px;color:#1E2B30;vertical-align:top">' . $valueHtml . '</td></tr>';
}

/** Etiquetas de interés (chips amarillos) */
function anuna_chips(array $items): string
{
    $out = '';
    foreach ($items as $i) {
        $label = e(ucfirst(str_replace(['-', '_'], ' ', $i)));
        $out .= '<span style="display:inline-block;margin:0 6px 6px 0;background:#FFF4D6;border:1px solid #FFD97D;color:#2E434A;border-radius:999px;padding:4px 12px;font-size:12px;font-weight:700">' . $label . '</span>';
    }
    return $out;
}

// ============================================================
//  1) Notificación para el equipo de Anuna
// ============================================================
function anuna_notify_html(array $d, array $meta, array $config): string
{
    [$own, $summary] = anuna_split_message($d['mensaje']);
    $name = e($d['nombre']); $email = e($d['email']); $page = e($meta['page']);
    $langLabel = $d['lang'] === 'en' ? 'Inglés' : 'Español';

    $rows  = anuna_row('Nombre', '<strong>' . $name . '</strong>');
    $rows .= anuna_row('Email', '<a href="mailto:' . $email . '" style="color:#B8431A;font-weight:700;text-decoration:none">' . $email . '</a>');
    if ($d['telefono'] !== '') {
        $rows .= anuna_row('Teléfono', e($d['telefono']));
    }
    $rows .= anuna_row('Formulario', $page . ' <span style="color:#8A9599;font-size:13px">(' . e($d['pagina']) . ')</span>');
    $rows .= anuna_row('Idioma', $langLabel);
    if ($d['intereses']) {
        $rows .= anuna_row('Intereses', anuna_chips($d['intereses']));
    }

    $msgBlock = '';
    if ($own !== '') {
        $msgBlock .= '<p style="margin:28px 0 10px;font-family:\'DM Sans\',Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#8A9599">Mensaje</p>'
            . '<div style="background:#FDF6EC;border-left:4px solid #FF6B35;border-radius:0 14px 14px 0;padding:16px 20px;font-family:\'DM Sans\',Arial,sans-serif;font-size:15px;line-height:1.6;color:#1E2B30">' . nl2br(e($own)) . '</div>';
    }
    if ($summary !== '') {
        $msgBlock .= '<p style="margin:24px 0 10px;font-family:\'DM Sans\',Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#8A9599">Detalle del formulario</p>'
            . '<div style="background:#F3F6F7;border-radius:14px;padding:16px 20px;font-family:\'DM Sans\',Arial,sans-serif;font-size:14px;line-height:1.7;color:#2E434A">' . nl2br(e(str_replace(' | ', "\n", $summary))) . '</div>';
    }

    $buttons = anuna_button('mailto:' . $d['email'] . '?subject=' . rawurlencode('Re: tu solicitud a Grupo Anuna'), 'Responder a ' . $name, '#FF6B35', '#1E2B30');
    $digits = preg_replace('/\D+/', '', $d['telefono']);
    if (strlen($digits) >= 8) {
        $buttons .= anuna_button('https://wa.me/' . $digits, 'Escribir por WhatsApp', '#25D366', '#FFFFFF');
    }

    $content = <<<HTML
<p style="margin:0;font-family:'DM Sans',Arial,sans-serif;font-size:13px;font-weight:700;color:#B8431A">{$meta['date']} · {$meta['tz']}</p>
<h1 style="margin:8px 0 6px;font-family:'DM Sans',Arial,sans-serif;font-size:26px;line-height:1.25;color:#4A6670">Nueva solicitud desde {$page}</h1>
<p style="margin:0 0 22px;font-family:'DM Sans',Arial,sans-serif;font-size:15px;line-height:1.6;color:#5C5C5C">{$name} dejó sus datos en el sitio. Respóndele en menos de 12 horas, como prometemos en la web.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">{$rows}</table>
{$msgBlock}
<div style="margin-top:30px">{$buttons}</div>
<p style="margin:18px 0 0;font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#8A9599">Consejo: al pulsar «Responder» en tu correo, la respuesta va directo a {$email}.</p>
HTML;
    return anuna_layout($content, e("{$d['nombre']} · {$meta['page']}"), 'Nueva solicitud', $config, 'es');
}

function anuna_notify_text(array $d, array $meta): string
{
    $lines = [
        "NUEVA SOLICITUD — {$meta['page']} ({$meta['date']})", '',
        "Nombre: {$d['nombre']}", "Email: {$d['email']}",
        'Teléfono: ' . ($d['telefono'] ?: '—'), "Formulario: {$meta['page']} ({$d['pagina']})",
        'Idioma: ' . ($d['lang'] === 'en' ? 'Inglés' : 'Español'),
        'Intereses: ' . ($d['intereses'] ? implode(', ', $d['intereses']) : '—'), '',
        "Mensaje:", $d['mensaje'] ?: '—',
    ];
    return implode("\n", $lines);
}

// ============================================================
//  2) Confirmación para el cliente (español / inglés)
// ============================================================
function anuna_confirm_texts(string $lang): array
{
    return $lang === 'en' ? [
        'badge' => 'Request received', 'hello' => 'Hi', 'title' => 'We got your request!',
        'lead' => 'Thank you for reaching out to Grupo Anuna. Our team is already reviewing your message.',
        'next' => 'What happens next',
        'steps' => [['We review your request', 'A specialist reads your message and gets the context ready.'],
                    ['We contact you within 12 hours', 'By email or WhatsApp, to schedule a call that suits you.'],
                    ['You get a clear proposal', 'With visible scope, timelines and costs. No surprises.']],
        'summary' => 'Your request', 'interests' => 'Interests', 'message' => 'Message',
        'faster' => 'Prefer to talk now? Message us on WhatsApp:', 'es' => 'Spain', 'latam' => 'Latin America',
        'note' => 'You received this email because you filled out a form on grupoanuna.com. If it wasn\'t you, you can ignore it.',
        'preheader' => 'We\'ll contact you within 12 hours. Here is what happens next.',
    ] : [
        'badge' => 'Solicitud recibida', 'hello' => 'Hola', 'title' => '¡Recibimos tu solicitud!',
        'lead' => 'Gracias por escribir a Grupo Anuna. Nuestro equipo ya está revisando tu mensaje.',
        'next' => 'Qué sigue ahora',
        'steps' => [['Revisamos tu solicitud', 'Un especialista lee tu mensaje y prepara el contexto.'],
                    ['Te contactamos en menos de 12 horas', 'Por correo o WhatsApp, para agendar una llamada a tu medida.'],
                    ['Recibes una propuesta clara', 'Con alcance, tiempos y costos visibles. Sin sorpresas.']],
        'summary' => 'Tu solicitud', 'interests' => 'Intereses', 'message' => 'Mensaje',
        'faster' => '¿Prefieres hablar ahora? Escríbenos por WhatsApp:', 'es' => 'España', 'latam' => 'Latinoamérica',
        'note' => 'Recibiste este correo porque llenaste un formulario en grupoanuna.com. Si no fuiste tú, puedes ignorarlo.',
        'preheader' => 'Te contactaremos en menos de 12 horas. Esto es lo que sigue.',
    ];
}

function anuna_confirm_html(array $d, array $meta, array $config): string
{
    $t = anuna_confirm_texts($d['lang']);
    $first = e(explode(' ', trim($d['nombre']))[0]);
    [$own] = anuna_split_message($d['mensaje']);

    $steps = '';
    foreach ($t['steps'] as $i => [$title, $text]) {
        $n = $i + 1;
        $steps .= '<tr><td width="52" valign="top" style="padding:0 0 18px">'
            . '<div style="width:38px;height:44px;border-radius:19px 19px 8px 8px;background:#FFD97D;text-align:center;font-family:\'DM Sans\',Arial,sans-serif;font-size:16px;font-weight:700;line-height:52px;color:#2E434A">' . $n . '</div></td>'
            . '<td valign="top" style="padding:2px 0 18px;font-family:\'DM Sans\',Arial,sans-serif">'
            . '<p style="margin:0;font-size:16px;font-weight:700;color:#4A6670">' . e($title) . '</p>'
            . '<p style="margin:4px 0 0;font-size:14px;line-height:1.55;color:#5C5C5C">' . e($text) . '</p></td></tr>';
    }

    $summary = '';
    // Al cliente solo se le muestra su propio mensaje (los intereses son códigos internos de los formularios)
    if ($own !== '') {
        $summary = '<div style="margin-top:12px;background:#FDF6EC;border:1px solid #EADFCC;border-radius:18px;padding:20px 22px;font-family:\'DM Sans\',Arial,sans-serif">'
            . '<p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#8A9599">' . $t['summary'] . '</p>';
        {
            $excerpt = mb_strlen($own) > 400 ? mb_substr($own, 0, 400) . '…' : $own;
            $summary .= '<p style="margin:6px 0 0;font-size:14px;line-height:1.6;color:#1E2B30">' . nl2br(e($excerpt)) . '</p>';
        }
        $summary .= '</div>';
    }

    $waText = rawurlencode($d['lang'] === 'en' ? "Hi, I just sent a request on your website." : 'Hola, acabo de enviar una solicitud en su sitio web.');
    $buttons = anuna_button('https://wa.me/' . ($config['whatsapp_es'] ?? '') . '?text=' . $waText, 'WhatsApp · ' . $t['es'], '#4A6670', '#FDF6EC')
             . anuna_button('https://wa.me/' . ($config['whatsapp_latam'] ?? '') . '?text=' . $waText, 'WhatsApp · ' . $t['latam'], '#4A6670', '#FDF6EC');

    $content = <<<HTML
<p style="margin:0;font-family:'DM Sans',Arial,sans-serif;font-size:15px;color:#5C5C5C">{$t['hello']}, <strong style="color:#4A6670">{$first}</strong> 👋</p>
<h1 style="margin:8px 0 10px;font-family:'DM Sans',Arial,sans-serif;font-size:28px;line-height:1.2;color:#4A6670">{$t['title']}</h1>
<p style="margin:0 0 30px;font-family:'DM Sans',Arial,sans-serif;font-size:16px;line-height:1.6;color:#5C5C5C">{$t['lead']}</p>
<p style="margin:0 0 16px;font-family:'DM Sans',Arial,sans-serif;font-size:13px;font-weight:700;color:#B8431A">{$t['next']}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">{$steps}</table>
{$summary}
<p style="margin:30px 0 12px;font-family:'DM Sans',Arial,sans-serif;font-size:15px;font-weight:700;color:#4A6670">{$t['faster']}</p>
<div>{$buttons}</div>
<p style="margin:22px 0 0;font-family:'DM Sans',Arial,sans-serif;font-size:12px;line-height:1.5;color:#8A9599">{$t['note']}</p>
HTML;
    return anuna_layout($content, e($t['preheader']), e($t['badge']), $config, $d['lang']);
}

function anuna_confirm_text(array $d, array $config): string
{
    $t = anuna_confirm_texts($d['lang']);
    $first = explode(' ', trim($d['nombre']))[0];
    $out = ["{$t['hello']}, {$first}", '', $t['title'], $t['lead'], '', strtoupper($t['next'])];
    foreach ($t['steps'] as $i => [$title, $text]) $out[] = ($i + 1) . ". {$title} — {$text}";
    $out[] = '';
    $out[] = $t['faster'];
    $out[] = "{$t['es']}: https://wa.me/" . ($config['whatsapp_es'] ?? '');
    $out[] = "{$t['latam']}: https://wa.me/" . ($config['whatsapp_latam'] ?? '');
    $out[] = '';
    $out[] = 'Grupo Anuna · ' . ($config['site_url'] ?? 'https://grupoanuna.com');
    return implode("\n", $out);
}
