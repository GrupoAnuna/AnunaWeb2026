import { Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal';
import { Ripple } from '../../shared/ripple';
import { APP_CASES, APP_CASES_EN, CASES, CASES_EN } from './cases.data';
import { CASES_TEXT } from './cases.i18n';
import { LanguageService } from '../../core/language.service';
import { Footer } from '@features/shell/components/footer/footer.component';
import { HeaderComponent } from '@features/shell/components/header/header.component';
import { Whatsapp } from '@features/shell/components/whatsapp/whatsapp';

const AUTOPLAY_MS = 6000;
type Kind = 'web' | 'app';

@Component({
  selector: 'app-cases',
  imports: [NgOptimizedImage, RouterLink, Icon, Reveal, Ripple, Footer, HeaderComponent, Whatsapp],
  templateUrl: './cases.html',
  styleUrl: './cases.css',
})

export class Cases {
  private readonly i18n = inject(LanguageService);
  readonly t = this.i18n.pick(CASES_TEXT);
  readonly webs = computed(() => (this.i18n.lang() === 'en' ? CASES_EN : CASES));
  readonly apps = computed(() => (this.i18n.lang() === 'en' ? APP_CASES_EN : APP_CASES));
  readonly autoplayMs = AUTOPLAY_MS;

  /** Pestaña activa: sitios web o apps móviles */
  readonly kind = signal<Kind>('web');
  readonly total = computed(() => (this.kind() === 'web' ? this.webs().length : this.apps().length));
  readonly active = signal(0);
  /** Dirección del último cambio, para animar la entrada del texto */
  readonly direction = signal<'next' | 'prev'>('next');
  readonly playing = signal(false);
  readonly paused = signal(false);

  private timer?: ReturnType<typeof setTimeout>;
  private startX: number | null = null;

  constructor() {
    afterNextRender(() => {
      if (!document.documentElement.classList.contains('anim')) return;
      this.playing.set(true);
      this.schedule();
    });
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  setKind(kind: Kind): void {
    if (kind === this.kind()) return;
    this.kind.set(kind);
    this.direction.set('next');
    this.active.set(0);
    this.schedule();
  }

  /** Número con dos dígitos: 01, 02… */
  pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  domain(url: string): string {
    return new URL(url).hostname.replace(/^www\./, '');
  }

  /** Iniciales para el icono de la pantalla ilustrada */
  initials(name: string): string {
    return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  }

  go(i: number): void {
    const n = this.total();
    const next = (i + n) % n;
    if (next === this.active()) return;
    this.direction.set(i > this.active() || (this.active() === n - 1 && next === 0) ? 'next' : 'prev');
    this.active.set(next);
    this.schedule();
  }

  next(): void {
    this.go(this.active() + 1);
    this.direction.set('next');
  }

  prev(): void {
    this.go(this.active() - 1);
    this.direction.set('prev');
  }

  pause(value: boolean): void {
    this.paused.set(value);
    this.schedule();
  }

  onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (target.getAttribute('role') === 'tab' && target.closest('.kind-tabs')) return; // las pestañas usan sus propias flechas
    if (event.key === 'ArrowRight') { event.preventDefault(); this.next(); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); this.prev(); }
  }

  onPointerDown(event: PointerEvent): void {
    this.startX = event.clientX;
  }

  onPointerUp(event: PointerEvent): void {
    if (this.startX === null) return;
    const dx = event.clientX - this.startX;
    this.startX = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) this.next();
    else this.prev();
  }

  private schedule(): void {
    clearTimeout(this.timer);
    if (!this.playing() || this.paused() || this.total() < 2) return;
    this.timer = setTimeout(() => {
      this.direction.set('next');
      this.go(this.active() + 1);
    }, AUTOPLAY_MS);
  }
}