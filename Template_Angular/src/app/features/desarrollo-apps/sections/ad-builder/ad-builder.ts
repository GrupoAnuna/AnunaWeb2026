import { Component, ElementRef, Injector, afterNextRender, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { ContactService } from '../../../contact/contact.service';
import { BUILDER_FEATURES, PLATFORMS } from '../../app-development.data';

type Stage = 'build' | 'contact' | 'success';
type Field = 'nombre' | 'email' | 'privacidad';

@Component({
  selector: 'app-ad-builder',
  imports: [ReactiveFormsModule, Icon, Reveal],
  templateUrl: './ad-builder.html',
  styleUrl: './ad-builder.css',
})
export class AdBuilder {
  readonly platforms = PLATFORMS;
  readonly options = BUILDER_FEATURES;

  readonly selectedPlatforms = signal<string[]>(['ios', 'android']);
  readonly selectedFeatures = signal<string[]>([]);
  readonly stage = signal<Stage>('build');
  readonly sending = signal(false);
  readonly error = signal(false);
  readonly submitted = signal(false);

  /** Funciones elegidas, en el orden del catálogo, para dibujarlas en el teléfono */
  readonly tiles = computed(() => this.options.filter((o) => this.selectedFeatures().includes(o.value)));
  readonly progress = computed(() => this.tiles().length / this.options.length);
  readonly platformLabels = computed(() =>
    this.platforms.filter((p) => this.selectedPlatforms().includes(p.value)).map((p) => p.label),
  );

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

  togglePlatform(value: string): void {
    this.selectedPlatforms.update((l) => (l.includes(value) ? l.filter((v) => v !== value) : [...l, value]));
  }

  toggleFeature(value: string): void {
    this.selectedFeatures.update((l) => (l.includes(value) ? l.filter((v) => v !== value) : [...l, value]));
  }

  isPlatform(value: string): boolean {
    return this.selectedPlatforms().includes(value);
  }

  isFeature(value: string): boolean {
    return this.selectedFeatures().includes(value);
  }

  goToContact(): void {
    this.stage.set('contact');
    this.focusSoon('#adb-title');
  }

  backToBuild(): void {
    this.stage.set('build');
    this.focusSoon('#adb-title');
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
      this.host.nativeElement.querySelector<HTMLElement>(`#adb-${first}`)?.focus();
      return;
    }

    this.sending.set(true);
    this.error.set(false);
    const { mensaje, ...data } = this.form.getRawValue();
    const plataformas = this.platformLabels().join(', ') || 'Por definir';
    const funciones = this.tiles().map((t) => t.label).join(', ') || 'Por definir';
    try {
      await this.contact.send({
        ...data,
        mensaje: `${mensaje ? mensaje + '\n\n' : ''}[Arma tu app] Plataformas: ${plataformas} · Funciones: ${funciones}`,
        intereses: ['app', ...this.selectedPlatforms(), ...this.selectedFeatures()],
      });
      this.stage.set('success');
      this.focusSoon('#adb-success');
    } catch {
      this.error.set(true);
    } finally {
      this.sending.set(false);
    }
  }

  restart(): void {
    this.form.reset();
    this.submitted.set(false);
    this.selectedFeatures.set([]);
    this.selectedPlatforms.set(['ios', 'android']);
    this.stage.set('build');
    this.focusSoon('#adb-title');
  }

  private focusSoon(selector: string): void {
    afterNextRender(
      () => this.host.nativeElement.querySelector<HTMLElement>(selector)?.focus({ preventScroll: true }),
      { injector: this.injector },
    );
  }
}
