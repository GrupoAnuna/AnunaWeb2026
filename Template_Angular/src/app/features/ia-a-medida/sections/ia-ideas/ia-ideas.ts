import { Component, ElementRef, Injector, afterNextRender, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { ContactService } from '../../../contact/contact.service';
import { IDEA_AREAS } from '../../ai.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
type Field = 'nombre' | 'email' | 'privacidad';

@Component({
  selector: 'app-ia-ideas',
  imports: [TrPipe, ReactiveFormsModule, Icon, Reveal, I18nAnimation],
  templateUrl: './ia-ideas.html',
  styleUrl: './ia-ideas.css',
})
export class IaIdeas {
  readonly areas = IDEA_AREAS;
  readonly active = signal(IDEA_AREAS[0].id);
  readonly current = computed(() => this.areas.find((a) => a.id === this.active())!);

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

  select(id: string): void {
    this.active.set(id);
  }

  showError(field: Field): boolean {
    const c = this.form.controls[field];
    return c.invalid && (c.touched || this.submitted());
  }

  async submit(): Promise<void> {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const first = (['nombre', 'email', 'privacidad'] as Field[]).find((f) => this.form.controls[f].invalid);
      this.host.nativeElement.querySelector<HTMLElement>(`#iai-${first}`)?.focus();
      return;
    }
    this.sending.set(true);
    this.error.set(false);
    const { mensaje, ...data } = this.form.getRawValue();
    const area = this.current();
    try {
      await this.contact.send({
        ...data,
        mensaje: `${mensaje ? mensaje + '\n\n' : ''}[IA a medida] Área: ${area.label} · Ideas: ${area.ideas.map((x) => x.title).join(', ')}`,
        intereses: ['ia', area.id],
      });
      this.done.set(true);
      afterNextRender(() => this.host.nativeElement.querySelector<HTMLElement>('#iai-success')?.focus({ preventScroll: true }), { injector: this.injector });
    } catch {
      this.error.set(true);
    } finally {
      this.sending.set(false);
    }
  }

  restart(): void {
    this.form.reset();
    this.submitted.set(false);
    this.done.set(false);
  }
}
