import {
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Icon } from '../../../../shared/icon';
import { Reveal } from '../../../../shared/reveal';
import { ContactService } from '../../../contact/contact.service';
import { QUOTE_PLATFORMS, QUOTE_STARTS, QUOTE_TYPES, QuoteOption } from '../../web-development.data';

type Key = 'tipo' | 'plataforma' | 'inicio';
type Field = 'nombre' | 'email' | 'privacidad';

interface Question {
  key: Key;
  title: string;
  options: QuoteOption[];
}

@Component({
  selector: 'app-wd-quote',
  imports: [ReactiveFormsModule, Icon, Reveal],
  templateUrl: './wd-quote.html',
  styleUrl: './wd-quote.css',
})
export class WdQuote {
  readonly questions: Question[] = [
    { key: 'tipo', title: '¿Qué necesitas?', options: QUOTE_TYPES },
    { key: 'plataforma', title: '¿Cómo prefieres construirlo?', options: QUOTE_PLATFORMS },
    { key: 'inicio', title: '¿Cuál es tu punto de partida?', options: QUOTE_STARTS },
  ];
  readonly labels = ['Proyecto', 'Plataforma', 'Punto de partida', 'Tus datos'];

  /** Paso actual: 0-2 preguntas, 3 datos de contacto */
  readonly step = signal(0);
  readonly direction = signal<'forward' | 'back'>('forward');
  readonly answers = signal<Partial<Record<Key, string>>>({});
  readonly status = signal<'idle' | 'sending' | 'success' | 'error'>('idle');
  readonly submitted = signal(false);

  /** Un proyecto a rescatar ya parte de algo existente: se salta esa pregunta */
  readonly isRescue = computed(() => this.answers().tipo === 'rescate');

  readonly summary = computed(() =>
    this.questions
      .map((q) => q.options.find((o) => o.value === this.answers()[q.key])?.label)
      .filter((l): l is string => !!l),
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
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  isDone(i: number): boolean {
    const s = this.step();
    if (this.status() === 'success') return true;
    if (i === 2 && this.isRescue() && s === 3) return true;
    return i < s;
  }

  isSelected(key: Key, value: string): boolean {
    return this.answers()[key] === value;
  }

  /** Elegir una opción avanza solo, tras una pausa breve para ver la selección */
  choose(key: Key, value: string): void {
    this.answers.update((a) => {
      const next = { ...a, [key]: value };
      if (key === 'tipo') {
        // Rescatar implica partir de algo existente; si se cambia de opinión, se limpia
        if (value === 'rescate') next.inicio = 'existente';
        else if (a.tipo === 'rescate') delete next.inicio;
      }
      return next;
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const s = this.step();
      this.goTo(s === 1 && this.isRescue() ? 3 : s + 1, 'forward');
    }, 280);
  }

  back(): void {
    const s = this.step();
    this.goTo(s === 3 && this.isRescue() ? 1 : s - 1, 'back');
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
      this.host.nativeElement.querySelector<HTMLElement>(`#wdq-${first}`)?.focus();
      return;
    }

    this.status.set('sending');
    const { mensaje, ...data } = this.form.getRawValue();
    const a = this.answers();
    try {
      await this.contact.send({
        ...data,
        mensaje: `${mensaje ? mensaje + '\n\n' : ''}[Cotizador web] ${this.summary().join(' · ')}`,
        intereses: [a.tipo, a.plataforma, a.inicio].filter((v): v is string => !!v),
      });
      this.status.set('success');
      this.focusSoon('#wdq-success');
    } catch {
      this.status.set('error');
    }
  }

  restart(): void {
    this.form.reset();
    this.answers.set({});
    this.submitted.set(false);
    this.status.set('idle');
    this.goTo(0, 'back');
  }

  // ------------------------------------------------------------
  private goTo(step: number, direction: 'forward' | 'back'): void {
    this.direction.set(direction);
    this.step.set(Math.max(0, Math.min(3, step)));
    this.focusSoon('#wdq-step-title');
  }

  /** Mueve el foco al nuevo contenido (teclado y lectores de pantalla) */
  private focusSoon(selector: string): void {
    afterNextRender(
      () => this.host.nativeElement.querySelector<HTMLElement>(selector)?.focus({ preventScroll: true }),
      { injector: this.injector },
    );
  }
}
