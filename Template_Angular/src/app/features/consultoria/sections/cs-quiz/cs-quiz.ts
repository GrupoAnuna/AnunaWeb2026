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
import { LEVELS, QUIZ } from '../../consulting.data';

type Field = 'nombre' | 'email' | 'privacidad';

@Component({
  selector: 'app-cs-quiz',
  imports: [ReactiveFormsModule, Icon, Reveal],
  templateUrl: './cs-quiz.html',
  styleUrl: './cs-quiz.css',
})
export class CsQuiz {
  readonly quiz = QUIZ;
  readonly total = QUIZ.length;
  readonly maxScore = QUIZ.length * 2;
  readonly perks = ['Resultado al instante', 'Recomendaciones según tus respuestas', 'Sin necesidad de registrarte'];
  /** Barras del indicador de cada opción (1 a 3) */
  readonly bars = [1, 2, 3];

  /** 0-4 preguntas · 5 resultado · 6 agenda · 7 enviado */
  readonly step = signal(0);
  readonly direction = signal<'forward' | 'back'>('forward');
  readonly answers = signal<number[]>(QUIZ.map(() => -1));
  readonly shownScore = signal(0);
  readonly sending = signal(false);
  readonly error = signal(false);
  readonly submitted = signal(false);

  readonly score = computed(() => this.answers().reduce((sum, a) => sum + Math.max(a, 0), 0));
  readonly level = computed(() => LEVELS.find((l) => this.score() <= l.max) ?? LEVELS[LEVELS.length - 1]);
  /** Recomendaciones: las preguntas con respuesta más baja primero (máximo 3) */
  readonly recommendations = computed(() =>
    this.answers()
      .map((a, i) => ({ a, text: QUIZ[i].recommendation }))
      .filter((r) => r.a < 2)
      .sort((x, y) => x.a - y.a)
      .slice(0, 3)
      .map((r) => r.text),
  );

  readonly form = inject(FormBuilder).nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
    telefono: [''],
    privacidad: [false, Validators.requiredTrue],
  });

  private readonly contact = inject(ContactService);
  private readonly injector = inject(Injector);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private timer?: ReturnType<typeof setTimeout>;
  private raf = 0;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.timer);
      // requestAnimationFrame solo existe en el navegador: en el servidor (SSR) raf siempre es 0
      if (this.raf) cancelAnimationFrame(this.raf);
    });
  }

  isAnswer(q: number, o: number): boolean {
    return this.answers()[q] === o;
  }

  /** Elegir una respuesta avanza sola tras una pausa breve */
  answer(q: number, o: number): void {
    this.answers.update((list) => list.map((v, i) => (i === q ? o : v)));
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (q < this.total - 1) this.goTo(q + 1, 'forward');
      else this.showResult();
    }, 280);
  }

  back(): void {
    const s = this.step();
    this.goTo(s === 6 ? 5 : s - 1, 'back');
  }

  toBooking(): void {
    this.goTo(6, 'forward');
  }

  restart(): void {
    this.answers.set(QUIZ.map(() => -1));
    this.form.reset();
    this.submitted.set(false);
    this.error.set(false);
    this.goTo(0, 'back');
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
      this.host.nativeElement.querySelector<HTMLElement>(`#csq-${first}`)?.focus();
      return;
    }

    this.sending.set(true);
    this.error.set(false);
    const detail = QUIZ.map((q, i) => `${q.question} ${q.options[this.answers()[i]] ?? '—'}`).join(' | ');
    try {
      await this.contact.send({
        ...this.form.getRawValue(),
        mensaje: `[Autodiagnóstico] ${this.score()}/${this.maxScore} · ${this.level().title}\n${detail}`,
        intereses: ['consultoria', this.level().title],
      });
      this.goTo(7, 'forward');
    } catch {
      this.error.set(true);
    } finally {
      this.sending.set(false);
    }
  }

  // ------------------------------------------------------------
  private showResult(): void {
    this.goTo(5, 'forward');
    // El número del resultado cuenta desde cero
    const end = this.score();
    const animated = document.documentElement.classList.contains('anim');
    if (!animated) {
      this.shownScore.set(end);
      return;
    }
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 1200, 1);
      this.shownScore.set(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) this.raf = requestAnimationFrame(tick);
    };
    this.shownScore.set(0);
    this.raf = requestAnimationFrame(tick);
  }

  private goTo(step: number, direction: 'forward' | 'back'): void {
    this.direction.set(direction);
    this.step.set(step);
    afterNextRender(
      () => this.host.nativeElement.querySelector<HTMLElement>('#csq-title')?.focus({ preventScroll: true }),
      { injector: this.injector },
    );
  }
}
