import { Component, input } from '@angular/core';

export type AnunaIcon =
  | 'code' | 'layout' | 'grid' | 'refresh' | 'globe' | 'app' | 'layers' | 'route'
  | 'check' | 'arrow-right' | 'arrow-left' | 'clock' | 'users' | 'pin'
  | 'phone' | 'bell' | 'card' | 'chat' | 'lock' | 'upload' | 'chart' | 'calendar'
  | 'bag' | 'bolt' | 'briefcase' | 'sparkles' | 'server'
  | 'file' | 'target' | 'plug' | 'help' | 'sheet' | 'coins' | 'search'
  | 'shield' | 'key' | 'mail' | 'eye' | 'wifi' | 'database' | 'alert' | 'school' | 'link' | 'paperclip'
  | 'cloud' | 'box' | 'building' | 'trend'
  | 'bot' | 'brain' | 'hand' | 'send' | 'wand';

/**
 * Iconos de trazo de la marca (24×24, heredan el color del texto).
 * Uso:  <app-icon name="code" class="h-6 w-6" />
 */
@Component({
  selector: 'app-icon',
  host: { class: 'inline-block shrink-0', 'aria-hidden': 'true' },
  template: `
    <svg class="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      @switch (name()) {
        @case ('code') { <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" /> }
        @case ('layout') { <rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18M9 9v11" /> }
        @case ('grid') { <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><path d="M14 17.5h7M17.5 14v7" /> }
        @case ('refresh') { <path d="M20 11a8 8 0 0 0-14.9-3.9L4 9" /><path d="M4 4v5h5" /><path d="M4 13a8 8 0 0 0 14.9 3.9L20 15" /><path d="M20 20v-5h-5" /> }
        @case ('globe') { <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" /> }
        @case ('app') { <rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 8h18" /><path d="M7 12h4M7 15.5h7" /> }
        @case ('layers') { <path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /> }
        @case ('route') { <circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8.5 6H13a3 3 0 0 1 3 3v6.5" /><path d="M6 8.5V18h9.5" /> }
        @case ('check') { <path d="m5 12 5 5 9-10" /> }
        @case ('arrow-right') { <path d="M5 12h14M13 6l6 6-6 6" /> }
        @case ('arrow-left') { <path d="M19 12H5M11 18l-6-6 6-6" /> }
        @case ('clock') { <circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2M9 2h6" /> }
        @case ('users') { <circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" /> }
        @case ('pin') { <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /> }
        @case ('phone') { <rect x="6" y="2.5" width="12" height="19" rx="3" /><path d="M10.5 18.5h3" /> }
        @case ('bell') { <path d="M6 10a6 6 0 0 1 12 0c0 5 2 6.5 2 6.5H4S6 15 6 10" /><path d="M10 20a2 2 0 0 0 4 0" /> }
        @case ('card') { <rect x="2.5" y="5" width="19" height="14" rx="2.5" /><path d="M2.5 10h19M6.5 15h4" /> }
        @case ('chat') { <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.1A8 8 0 1 1 20 12Z" /> }
        @case ('lock') { <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /> }
        @case ('upload') { <path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /> }
        @case ('chart') { <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /> }
        @case ('calendar') { <rect x="3" y="5" width="18" height="16" rx="2.5" /><path d="M3 10h18M8 3v4M16 3v4" /> }
        @case ('bag') { <path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /> }
        @case ('bolt') { <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /> }
        @case ('briefcase') { <rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /> }
        @case ('sparkles') { <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /> }
        @case ('file') { <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /> }
        @case ('target') { <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /> }
        @case ('plug') { <path d="M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0Z" /><path d="M12 17v5" /> }
        @case ('help') { <circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17.5h.01" /> }
        @case ('sheet') { <rect x="3" y="3" width="18" height="18" rx="2.5" /><path d="M3 9h18M3 15h18M9 3v18" /> }
        @case ('coins') { <ellipse cx="9" cy="7" rx="6" ry="3" /><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7" /><path d="M9 15v2c0 1.7 2.7 3 6 3s6-1.3 6-3v-5c0-1.7-2.7-3-6-3" /> }
        @case ('search') { <circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /> }
        @case ('shield') { <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6z" /><path d="m9 12 2 2 4-4" /> }
        @case ('key') { <circle cx="8" cy="15" r="4" /><path d="m11 12 9-9M17 6l3 3M14 9l2 2" /> }
        @case ('mail') { <rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" /> }
        @case ('eye') { <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /> }
        @case ('wifi') { <path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" /><path d="M12 19.5h.01" /> }
        @case ('database') { <ellipse cx="12" cy="5.5" rx="8" ry="3" /><path d="M4 5.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6M4 11.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /> }
        @case ('alert') { <path d="M10.3 3.9 2.4 17.5A2 2 0 0 0 4.1 20.5h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /> }
        @case ('school') { <path d="m2 9 10-5 10 5-10 5Z" /><path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6" /> }
        @case ('link') { <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /> }
        @case ('paperclip') { <path d="m20 11.5-8.3 8.3a5 5 0 0 1-7.1-7.1l8.8-8.8a3.3 3.3 0 0 1 4.7 4.7l-8.8 8.8a1.7 1.7 0 0 1-2.4-2.4l8-8" /> }
        @case ('cloud') { <path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4 4 0 0 1-.5 8.5z" /> }
        @case ('box') { <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /> }
        @case ('building') { <rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 21v-4h6v4M8 7h2M14 7h2M8 11h2M14 11h2" /> }
        @case ('trend') { <path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /> }
        @case ('bot') { <rect x="4" y="8" width="16" height="12" rx="4" /><path d="M12 4v4M9 14h.01M15 14h.01" /><path d="M2 13v3M22 13v3" /> }
        @case ('brain') { <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Z" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3h0a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" /> }
        @case ('hand') { <path d="M8 11V5.5a1.5 1.5 0 0 1 3 0V10M11 9.5V4a1.5 1.5 0 0 1 3 0v6M14 9.5V6a1.5 1.5 0 0 1 3 0v7a7 7 0 0 1-7 7h-.5A6.5 6.5 0 0 1 4 15l-1-3a1.5 1.5 0 0 1 2.7-1.2L8 13" /> }
        @case ('send') { <path d="M21 3 10 14" /><path d="m21 3-7 18-4-7-7-4Z" /> }
        @case ('wand') { <path d="m15 4 5 5L9 20l-5-5Z" /><path d="M13 6l5 5M5 3v3M3.5 4.5h3M19 15v3M17.5 16.5h3" /> }
        @case ('server') { <rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /> }
      }
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<AnunaIcon>();
}
