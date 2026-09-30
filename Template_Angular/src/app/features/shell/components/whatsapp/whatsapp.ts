import { Component, ElementRef, OnDestroy, viewChild } from '@angular/core';
import { WHATSAPP_ZONES, whatsappUrl } from './whatsapp.config';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.html',
  styleUrl: './whatsapp.css',
  host: { class: 'contents' },
})
export class Whatsapp implements OnDestroy {
  readonly zones = WHATSAPP_ZONES.map((z) => ({ ...z, url: whatsappUrl(z.phone) }));

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private closeTimer?: ReturnType<typeof setTimeout>;

  ngOnDestroy(): void {
    clearTimeout(this.closeTimer);
  }

  open(): void {
    const d = this.dialog().nativeElement;
    d.classList.remove('closing');
    d.showModal(); // atrapa el foco, bloquea el fondo y habilita Escape
  }

  /** Cierra con animación (si el usuario no pidió reducir movimiento) */
  close(): void {
    const d = this.dialog().nativeElement;
    if (!d.open) return;
    if (!document.documentElement.classList.contains('anim')) {
      d.close();
      return;
    }
    d.classList.add('closing');
    clearTimeout(this.closeTimer);
    this.closeTimer = setTimeout(() => {
      d.classList.remove('closing');
      d.close();
    }, 220);
  }

  /** Escape: usamos nuestra animación de cierre en lugar del cierre instantáneo */
  onCancel(event: Event): void {
    event.preventDefault();
    this.close();
  }

  /** Clic fuera de la tarjeta (sobre el fondo oscuro) cierra el modal */
  onBackdropClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.close();
  }
}
