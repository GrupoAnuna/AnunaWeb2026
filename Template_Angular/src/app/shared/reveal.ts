import { Directive, ElementRef, OnDestroy, afterNextRender, inject, output } from '@angular/core';

/**
 * Añade la clase "in" cuando el elemento entra en pantalla.
 * Uso:  <div class="reveal" appReveal>…</div>
 * Opcional: (revealed)="miMetodo()" para disparar algo al aparecer.
 */
@Directive({ selector: '[appReveal]' })
export class Reveal implements OnDestroy {
  readonly revealed = output<void>();

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private io?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement;
      const animated = document.documentElement.classList.contains('anim');

      if (!animated || !('IntersectionObserver' in window)) {
        node.classList.add('in');
        this.revealed.emit();
        return;
      }

      this.io = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          node.classList.add('in');
          this.revealed.emit();
          this.io?.disconnect();
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
      );
      this.io.observe(node);
    });
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
