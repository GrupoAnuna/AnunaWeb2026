<?php
/**
 * ============================================================
 *  Endpoint de contacto — Grupo Anuna
 *  Recibe los formularios del sitio (JSON por POST), valida,
 *  y envía dos correos con PHPMailer vía SMTP de Hostinger:
 *    1) Notificación al equipo de Anuna
 *    2) Confirmación al cliente (en su idioma)
 * ============================================================
 */
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailException;

require __DIR__ . '/lib/PHPMailer/Exception.php';
require __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require __DIR__ . '/lib/PHPMailer/SMTP.php';
require __DIR__ . '/templates/mail.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

/** Responde en JSON y termina */
function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

// ---------- 1. Configuración (fuera de public_html o en api/config.php) ----------
$configPaths = [
    getenv('ANUNA_MAIL_CONFIG') ?: '',
    dirname(__DIR__, 2) . '/anuna-mail-config.php', // /domains/tudominio.com/anuna-mail-config.php
    __DIR__ . '/config.php',
];
$config = null;
foreach ($configPaths as $path) {
    if ($path !== '' && is_file($path)) { $config = require $path; break; }
}
if (!is_array($config)) {
    error_log('[anuna-contact] No se encontró el archivo de configuración.');
    respond(500, ['ok' => false, 'error' => 'config']);
}
date_default_timezone_set($config['timezone'] ?? 'America/Mexico_City');

// ---------- 2. Método y origen ----------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method']);
}
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = $config['allowed_origins'] ?? [];
if ($origin !== '' && $allowed && !in_array(rtrim($origin, '/'), $allowed, true)) {
    respond(403, ['ok' => false, 'error' => 'origin']);
}

// ---------- 3. Límite de envíos por IP ----------
$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$limit = $config['rate_limit'] ?? ['max' => 5, 'window_seconds' => 600];
$rateFile = sys_get_temp_dir() . '/anuna_rl_' . hash('sha256', $ip . '|anuna');
$now = time();
$hits = [];
if (is_file($rateFile)) {
    $hits = array_filter(
        (array) json_decode((string) file_get_contents($rateFile), true),
        fn($t) => is_int($t) && $t > $now - (int) $limit['window_seconds']
    );
}
if (count($hits) >= (int) $limit['max']) {
    respond(429, ['ok' => false, 'error' => 'rate_limit']);
}

// ---------- 4. Lectura y validación ----------
$raw = file_get_contents('php://input', false, null, 0, 20000);
$in = json_decode((string) $raw, true);
if (!is_array($in)) {
    respond(400, ['ok' => false, 'error' => 'invalid_json']);
}

/** Texto limpio: sin caracteres de control (salvo saltos de línea si se permiten) */
function clean($value, int $max, bool $multiline = false): string
{
    $s = trim(is_scalar($value) ? (string) $value : '');
    $s = $multiline ? preg_replace('/[^\P{C}\n]+/u', '', str_replace("\r\n", "\n", $s)) : preg_replace('/\p{C}+/u', ' ', $s);
    return mb_substr((string) $s, 0, $max);
}

// Campo trampa: si un bot lo llena, se responde "ok" pero no se envía nada
if (!empty($in['website'])) {
    respond(200, ['ok' => true]);
}

$data = [
    'nombre'    => clean($in['nombre'] ?? '', 120),
    'email'     => clean($in['email'] ?? '', 160),
    'telefono'  => clean($in['telefono'] ?? '', 40),
    'mensaje'   => clean($in['mensaje'] ?? '', 5000, true),
    'pagina'    => clean($in['pagina'] ?? '/', 200),
    'lang'      => ($in['lang'] ?? 'es') === 'en' ? 'en' : 'es',
    'intereses' => [],
];
foreach (array_slice((array) ($in['intereses'] ?? []), 0, 15) as $i) {
    $v = clean($i, 60);
    if ($v !== '') $data['intereses'][] = $v;
}

$errors = [];
if (mb_strlen($data['nombre']) < 2)                                $errors[] = 'nombre';
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL))            $errors[] = 'email';
if ($data['telefono'] !== '' && !preg_match('/^[0-9+()\s.-]{6,40}$/', $data['telefono'])) $errors[] = 'telefono';
if (($in['privacidad'] ?? false) !== true)                         $errors[] = 'privacidad';
if ($errors) {
    respond(422, ['ok' => false, 'error' => 'validation', 'fields' => $errors]);
}

// Registrar el intento (cuenta para el límite)
$hits[] = $now;
@file_put_contents($rateFile, json_encode(array_values($hits)), LOCK_EX);

// ---------- 5. Envío ----------
/** Crea un PHPMailer configurado con el SMTP de Hostinger */
function makeMailer(array $config): PHPMailer
{
    $m = new PHPMailer(true);
    $m->isSMTP();
    $m->Host       = $config['smtp_host'];
    $m->Port       = (int) $config['smtp_port'];
    $m->SMTPAuth   = ($config['smtp_user'] ?? '') !== '';
    $m->Username   = $config['smtp_user'];
    $m->Password   = $config['smtp_pass'];
    $secure = $config['smtp_secure'] ?? 'ssl';
    $m->SMTPSecure = $secure === 'tls' ? PHPMailer::ENCRYPTION_STARTTLS : ($secure === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : '');
    $m->SMTPAutoTLS = $secure !== '';
    $m->CharSet    = PHPMailer::CHARSET_UTF8;
    $m->Encoding   = PHPMailer::ENCODING_BASE64;
    $m->Timeout    = 15;
    $m->setFrom($config['from_email'], $config['from_name']);
    $m->isHTML(true);
    $m->addEmbeddedImage(__DIR__ . '/assets/anuna-isotipo.png', 'anuna-logo', 'anuna.png', PHPMailer::ENCODING_BASE64, 'image/png');
    return $m;
}

$meta = [
    'page'  => anuna_page_name($data['pagina']),
    'date'  => date('d/m/Y H:i'),
    'tz'    => $config['timezone_label'] ?? 'hora de CDMX',
];

try {
    // 5.1 Notificación al equipo
    $n = makeMailer($config);
    $n->addAddress($config['to_email'], $config['to_name'] ?? '');
    foreach (($config['bcc'] ?? []) as $bcc) $n->addBCC($bcc);
    $n->addReplyTo($data['email'], $data['nombre']);   // "Responder" contesta directo al cliente
    $n->Subject = "Nueva solicitud: {$data['nombre']} · {$meta['page']}";
    $n->Body    = anuna_notify_html($data, $meta, $config);
    $n->AltBody = anuna_notify_text($data, $meta);
    $n->send();
} catch (MailException $e) {
    error_log('[anuna-contact] Error al notificar: ' . $e->getMessage());
    respond(502, ['ok' => false, 'error' => 'send']);
}

// 5.2 Confirmación al cliente (si falla, la solicitud ya llegó: no es un error para el usuario)
if (!empty($config['send_confirmation'])) {
    try {
        $c = makeMailer($config);
        $c->addAddress($data['email'], $data['nombre']);
        $c->addReplyTo($config['reply_to'] ?? $config['to_email'], $config['from_name']);
        $c->Subject = $data['lang'] === 'en' ? 'We got your request — Grupo Anuna' : 'Recibimos tu solicitud — Grupo Anuna';
        $c->Body    = anuna_confirm_html($data, $meta, $config);
        $c->AltBody = anuna_confirm_text($data, $config);
        $c->send();
    } catch (MailException $e) {
        error_log('[anuna-contact] Error en la confirmación: ' . $e->getMessage());
    }
}

respond(200, ['ok' => true]);
