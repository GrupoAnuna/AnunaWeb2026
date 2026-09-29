import { Component, input } from '@angular/core';

export type AnunaIcon =
  | 'code' | 'layout' | 'grid' | 'refresh' | 'globe' | 'app' | 'layers' | 'route'
  | 'check' | 'arrow-right' | 'arrow-left' | 'clock' | 'users' | 'pin';

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
      }
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<AnunaIcon>();
}
