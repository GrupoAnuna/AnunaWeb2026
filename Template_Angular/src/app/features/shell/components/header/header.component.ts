import {
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { Icon } from '@shared/icon';
import { HEADER_CONFIGS, HEADER_TEXT, HEADER_CONFIG, HeaderConfig } from './header.component.config';
import { ThemeService } from '@core/theme.service';
import { LanguageService } from '@core/language.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Icon],
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
  readonly themeService = inject(ThemeService);
  readonly i18n = inject(LanguageService);
  readonly text = this.i18n.pick(HEADER_TEXT);

  /** Enlaces y botones personalizados (opcional). Por defecto usa header.config.ts en el idioma activo */
  readonly customConfig = input<HeaderConfig | null>(null);
  readonly config = computed(() => this.customConfig() ?? HEADER_CONFIGS[this.i18n.lang()]);

  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  private readonly router = inject(Router);
  /** Ruta actual, para resaltar "Servicios" dentro de una página de servicio */
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  private readonly headerEl = viewChild.required<ElementRef<HTMLElement>>('headerEl');
  private readonly servicesEl = viewChild<ElementRef<HTMLElement>>('servicesEl');
  private readonly progressEl = viewChild.required<ElementRef<HTMLElement>>('progress');
  private readonly scroller = inject(ViewportScroller);
  private readonly cleanups: Array<() => void> = [];

  constructor() {
    // Cierra el menú móvil al navegar
    this.router
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
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onDesktop = (e: MediaQueryListEvent) => e.matches && this.closeMenu();
    desktop.addEventListener('change', onDesktop);

    this.cleanups.push(() => {
      window.removeEventListener('scroll', onScroll);
      desktop.removeEventListener('change', onDesktop);
      cancelAnimationFrame(raf);
    });
  }
}
