import {
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { HEADER_CONFIG, HeaderConfig } from './header.component.config';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
    host: {
    // "sticky" va en el host: si fuera en el <header> interno, el
    // elemento <app-header> lo limitaría y dejaría de quedarse fijo.
    class: 'sticky top-0 z-40 block',
    '(document:keydown.escape)': 'closeMenu()',
  },
})

export class HeaderComponent implements OnDestroy {
  /** Enlaces y botones. Por defecto usa header.config.ts */
  readonly config = input<HeaderConfig>(HEADER_CONFIG);

  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  private readonly headerEl = viewChild.required<ElementRef<HTMLElement>>('headerEl');
  private readonly progressEl = viewChild.required<ElementRef<HTMLElement>>('progress');
  private readonly scroller = inject(ViewportScroller);
  private readonly cleanups: Array<() => void> = [];

  constructor() {
    // Cierra el menú móvil al navegar
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeMenu());

    // Solo en el navegador (seguro con SSR)
    afterNextRender(() => this.init());
  }

  ngOnDestroy(): void {
    this.cleanups.forEach((fn) => fn());
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  /** Enlace "Saltar al contenido": lleva el foco al <main> */
  skipToContent(event: Event): void {
    event.preventDefault();
    const main = document.getElementById('contenido');
    main?.focus();
    main?.scrollIntoView();
  }

  // ------------------------------------------------------------
  private init(): void {
    const header = this.headerEl().nativeElement;
    const bar = this.progressEl().nativeElement;

    // Al ir a una sección (#contacto), deja espacio para el header fijo
    this.scroller.setOffset(() => [0, header.offsetHeight + 8]);

    // Barra de progreso + estado "con scroll". La barra se mueve
    // directamente en el DOM para no redibujar Angular en cada scroll.
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        this.scrolled.set(window.scrollY > 8);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Si la pantalla se agranda hasta escritorio, cierra el menú móvil
    const desktop = window.matchMedia('(min-width: 1280px)');
    const onDesktop = (e: MediaQueryListEvent) => e.matches && this.closeMenu();
    desktop.addEventListener('change', onDesktop);

    this.cleanups.push(() => {
      window.removeEventListener('scroll', onScroll);
      desktop.removeEventListener('change', onDesktop);
      cancelAnimationFrame(raf);
    });
  }
}
