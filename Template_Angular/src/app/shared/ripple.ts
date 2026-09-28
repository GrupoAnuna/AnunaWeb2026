import { Directive, ElementRef, inject } from '@angular/core';

/**
 * Onda que se expande desde el punto donde se hace clic.
 * Uso:  <a class="ripple-host" appRipple>…</a>
 */
@Directive({
  selector: '[appRipple]',
  host: { '(pointerdown)': 'spawn($event)' },
})
export class Ripple {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  spawn(event: PointerEvent): void {
    if (!document.documentElement.classList.contains('anim')) return;
    const host = this.el.nativeElement;
    const r = host.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2;
    const wave = document.createElement('span');
    wave.className = 'ripple';
    wave.style.cssText =
      `width:${size}px;height:${size}px;` +
      `left:${event.clientX - r.left - size / 2}px;top:${event.clientY - r.top - size / 2}px`;
    host.appendChild(wave);
    wave.addEventListener('animationend', () => wave.remove());
  }
}
