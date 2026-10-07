import { Component, ElementRef, Injector, afterNextRender, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { ContactService } from '../../../contact/contact.service';
import { PRACTICES, PROTECTION_LEVELS } from '../../cyber.data';
import { I18nAnimation } from '@shared/i18n-animation';

import { TrPipe } from '../../../../shared/tr.pipe';
type Stage = 'check' | 'contact' | 'success';
type Field = 'nombre' | 'email' | 'privacidad';

@Component({
  selector: 'app-cy-checkup',
  imports: [TrPipe, ReactiveFormsModule, Icon, Reveal, I18nAnimation],
  templateUrl: './cy-checkup.html',
  styleUrl: './cy-checkup.css',
})
export class CyCheckup {
  readonly practices = PRACTICES;
  readonly levels = PROTECTION_LEVELS;
  readonly checked = signal<boolean[]>(PRACTICES.map(() => false));
  readonly stage = signal<Stage>('check');
  readonly sending = signal(false);
  readonly error = signal(false);
  readonly submitted = signal(false);

  readonly count = computed(() => this.checked().filter(Boolean).length);
  readonly percent = computed(() => this.count() / this.practices.length);
  readonly level = computed(() => PROTECTION_LEVELS.find((l) => this.count() <= l.max) ?? PROTECTION_LEVELS[2]);
  /** Lo que aún falta: se convierte en "te ayudamos con…" */
  readonly gaps = computed(() => this.practices.filter((_, i) => !this.checked()[i]).map((p) => p.help));

  readonly form = inject(FormBuilder).nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
    telefono: [''],
    privacidad: [false, Validators.requiredTrue],
  });

  private readonly contact = inject(ContactService);
  private readonly injector = inject(Injector);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  toggle(i: number): void {
    this.checked.update((l) => l.map((v, k) => (k === i ? !v : v)));
  }

  goToContact(): void {
    this.stage.set('contact');
    this.focusSoon('#cyc-title');
  }

  backToCheck(): void {
    this.stage.set('check');
    this.focusSoon('#cyc-title');
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
      this.host.nativeElement.querySelector<HTMLElement>(`#cyc-${first}`)?.focus();
      return;
    }
    this.sending.set(true);
    this.error.set(false);
    const pendientes = this.gaps().join(' | ') || 'Ninguno';
    try {
      await this.contact.send({
        ...this.form.getRawValue(),
        mensaje: `[Chequeo de seguridad] ${this.count()}/${this.practices.length} · ${this.level().title}\nPendientes: ${pendientes}`,
        intereses: ['ciberseguridad', this.level().title],
      });
      this.stage.set('success');
      this.focusSoon('#cyc-title');
    } catch {
      this.error.set(true);
    } finally {
      this.sending.set(false);
    }
  }

  restart(): void {
    this.checked.set(PRACTICES.map(() => false));
    this.form.reset();
    this.submitted.set(false);
    this.stage.set('check');
    this.focusSoon('#cyc-title');
  }

  private focusSoon(selector: string): void {
    afterNextRender(
      () => this.host.nativeElement.querySelector<HTMLElement>(selector)?.focus({ preventScroll: true }),
      { injector: this.injector },
    );
  }
}
