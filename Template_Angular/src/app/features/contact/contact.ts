import {
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reveal } from '../../shared/reveal';
import { ContactService } from './contact.service';
import { HeaderComponent } from '@features/shell/components/header/header.component';
import { Footer } from '@features/shell/components/footer/footer.component';

type Status = 'idle' | 'sending' | 'success' | 'error';
type Field = 'nombre' | 'email' | 'mensaje' | 'privacidad';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Reveal,HeaderComponent,Footer],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  /** WhatsApp por zona (mismas opciones que el sitio actual) */
  readonly zones = [
    { name: 'España', flag: '🇪🇸', phone: '+34 673 561 620', wa: 'https://wa.me/34673561620' },
    { name: 'Latinoamérica', flag: '🌎', phone: '+52 55 3902 2537', wa: 'https://wa.me/525539022537' },
  ];

  /** Servicios que el usuario puede marcar como interés (opcional) */
  readonly interestOptions = [
    { value: 'web', label: 'Desarrollo web' },
    { value: 'apps', label: 'Desarrollo de apps' },
    { value: 'consultoria', label: 'Consultoría' },
    { value: 'cloud', label: 'Cloud' },
    { value: 'ciberseguridad', label: 'Ciberseguridad' },
  ];

  readonly privacyUrl =
    'https://grupoanuna.com/assets/Pol%C3%ADticas/Aviso%20de%20Privacidad%20%E2%80%93%20Formulario%20de%20Agenda.pdf';

  readonly form = inject(FormBuilder).nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
    telefono: [''],
    mensaje: ['', [Validators.required, Validators.minLength(5)]],
    privacidad: [false, Validators.requiredTrue],
  });

  readonly interests = signal<string[]>([]);
  readonly status = signal<Status>('idle');
  readonly submitted = signal(false);
  /** Mensaje para lectores de pantalla */
  readonly announcement = signal('');

  private readonly card = viewChild.required<ElementRef<HTMLElement>>('card');
  private readonly successEl = viewChild<ElementRef<HTMLElement>>('success');
  private readonly contact = inject(ContactService);
  private readonly injector = inject(Injector);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Muestra el error si el campo es inválido y ya se tocó o se intentó enviar */
  showError(field: Field): boolean {
    const c = this.form.controls[field];
    return c.invalid && (c.touched || this.submitted());
  }

  toggleInterest(value: string, checked: boolean): void {
    this.interests.update((list) =>
      checked ? [...list, value] : list.filter((v) => v !== value),
    );
  }

  async onSubmit(): Promise<void> {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.announcement.set('Revisa los campos marcados.');
      this.focusFirstInvalid();
      this.shake();
      return;
    }

    this.status.set('sending');
    this.announcement.set('Enviando tu mensaje…');

    try {
      await this.contact.send({ ...this.form.getRawValue(), intereses: this.interests() });
      this.status.set('success');
      this.announcement.set('Mensaje enviado. Te responderemos en menos de 12 horas.');
      // El formulario es más alto que el mensaje de éxito: centra la tarjeta
      // en pantalla y lleva el foco al mensaje cuando ya esté renderizado
      afterNextRender(() => this.revealSuccess(), { injector: this.injector });
    } catch {
      this.status.set('error');
      this.announcement.set('No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.');
    }
  }

  reset(): void {
    this.form.reset();
    this.interests.set([]);
    this.submitted.set(false);
    this.status.set('idle');
    this.announcement.set('');
    afterNextRender(
      () => this.host.nativeElement.querySelector<HTMLElement>('#contact-nombre')?.focus(),
      { injector: this.injector },
    );
  }

  // ------------------------------------------------------------
  private revealSuccess(): void {
    const animated = document.documentElement.classList.contains('anim');
    this.card().nativeElement.scrollIntoView({ behavior: animated ? 'smooth' : 'auto', block: 'center' });
    this.successEl()?.nativeElement.focus({ preventScroll: true });
  }

  private focusFirstInvalid(): void {
    const order: Field[] = ['nombre', 'email', 'mensaje', 'privacidad'];
    const first = order.find((f) => this.form.controls[f].invalid);
    if (first) this.host.nativeElement.querySelector<HTMLElement>(`#contact-${first}`)?.focus();
  }

  /** Sacudida suave de la tarjeta (solo si hay animaciones activas) */
  private shake(): void {
    if (!document.documentElement.classList.contains('anim')) return;
    const el = this.card().nativeElement;
    el.classList.remove('shake');
    void el.offsetWidth; // reinicia la animación
    el.classList.add('shake');
  }
}
