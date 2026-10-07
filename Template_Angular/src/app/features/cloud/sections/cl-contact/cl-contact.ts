import { Component, ElementRef, Injector, afterNextRender, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { ContactService } from '../../../contact/contact.service';
import { SITUATIONS } from '../../cloud.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
type Field = 'nombre' | 'email' | 'privacidad';

@Component({
  selector: 'app-cl-contact',
  imports: [TrPipe, ReactiveFormsModule, Icon, Reveal, I18nAnimation],
  templateUrl: './cl-contact.html',
  styleUrl: './cl-contact.css',
})
export class ClContact {
  readonly situations = SITUATIONS;
  readonly perks = ['Diagnóstico inicial sin costo', 'Te respondemos en menos de 12 h', 'Plan claro antes de mover nada'];
  readonly situation = signal('empezar');
  readonly sending = signal(false);
  readonly error = signal(false);
  readonly done = signal(false);
  readonly submitted = signal(false);

  readonly form = inject(FormBuilder).nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
    telefono: [''],
    mensaje: [''],
    privacidad: [false, Validators.requiredTrue],
  });

  private readonly contact = inject(ContactService);
  private readonly injector = inject(Injector);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  showError(field: Field): boolean {
    const c = this.form.controls[field];
    return c.invalid && (c.touched || this.submitted());
  }

  async submit(): Promise<void> {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const first = (['nombre', 'email', 'privacidad'] as Field[]).find((f) => this.form.controls[f].invalid);
      this.host.nativeElement.querySelector<HTMLElement>(`#clc-${first}`)?.focus();
      return;
    }
    this.sending.set(true);
    this.error.set(false);
    const { mensaje, ...data } = this.form.getRawValue();
    const label = this.situations.find((s) => s.value === this.situation())?.label ?? '';
    try {
      await this.contact.send({
        ...data,
        mensaje: `${mensaje ? mensaje + '\n\n' : ''}[Cloud] Situación: ${label}`,
        intereses: ['cloud', this.situation()],
      });
      this.done.set(true);
      afterNextRender(() => this.host.nativeElement.querySelector<HTMLElement>('#clc-success')?.focus({ preventScroll: true }), { injector: this.injector });
    } catch {
      this.error.set(true);
    } finally {
      this.sending.set(false);
    }
  }

  restart(): void {
    this.form.reset();
    this.submitted.set(false);
    this.situation.set('empezar');
    this.done.set(false);
  }
}
