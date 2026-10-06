import {
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FOOTER_CONFIGS, FOOTER_TEXT, FooterConfig } from './footer.component.config';
import { LanguageService } from '@core/language.service';

interface ClockView {
  hh: string;
  mm: string;
  open: boolean;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  host: { class: 'block' },
})
export class Footer implements OnDestroy {
  readonly i18n = inject(LanguageService);
  readonly text = this.i18n.pick(FOOTER_TEXT);

  /** Datos personalizados (opcional). Por defecto usa footer.config.ts en el idioma activo */
  readonly customConfig = input<FooterConfig | null>(null);
  readonly config = computed(() => this.customConfig() ?? FOOTER_CONFIGS[this.i18n.lang()]);  /** Muestra u oculta la banda animada superior (útil en páginas legales) */
  readonly showBand = input(true);
  /** Muestra u oculta los relojes en vivo */
  readonly showClocks = input(true);

  readonly year = new Date().getFullYear();
  readonly words = computed(() => this.config().headline.trim().split(/\s+/));
  readonly wmLetters = ['a', 'n', 'u', 'n', 'a'];
  /** Hora por zona horaria (vacío hasta que el componente llega al navegador) */
  readonly clocks = signal<Partial<Record<string, ClockView>>>({});

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly cleanups: Array<() => void> = [];
  private reduce = false;

  constructor() {
    // Solo se ejecuta en el navegador (seguro con SSR)
    afterNextRender(() => this.init());
  }

  ngOnDestroy(): void {
    this.cleanups.forEach((fn) => fn());
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: this.reduce ? 'auto' : 'smooth' });
  }

  // ------------------------------------------------------------
  private init(): void {
    const root = this.host.nativeElement;
    this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.reduce) {
      // Sin animación: todo se muestra en su estado final
      root.querySelectorAll('svg').forEach((s) => (s as SVGSVGElement).pauseAnimations?.());
    } else {
      // Activa los estados iniciales de las animaciones
      root.classList.add('anim');
    }

    this.initReveal(root);
    this.initParallax(root);
    this.initScrollArch(root);

    if (this.showClocks()) {
      this.tickClocks();
      const id = window.setInterval(() => this.tickClocks(), 20000);
      this.cleanups.push(() => clearInterval(id));
    }
  }

  /** Aparición al hacer scroll + arranque de los pulsos SVG de la banda */
  private initReveal(root: HTMLElement): void {
    const els = root.querySelectorAll<HTMLElement>('.reveal');
    if (this.reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('in');
          if (e.target.classList.contains('ft-band')) {
            const t = window.setTimeout(() => this.startSmil(root), 1800);
            this.cleanups.push(() => clearTimeout(t));
          }
          io.unobserve(e.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' },
    );
    els.forEach((el) => io.observe(el));
    this.cleanups.push(() => io.disconnect());
  }

  private startSmil(root: HTMLElement): void {
    root.querySelectorAll<SVGAnimationElement>('.ft-smil').forEach((a) => {
      try {
        a.beginElement();
      } catch {
        /* navegador sin SMIL: se ignora */
      }
    });
  }

  /** Parallax de la banda según el cursor (solo con mouse) */
  private initParallax(root: HTMLElement): void {
    if (this.reduce || !window.matchMedia('(pointer: fine)').matches) return;
    const layers = root.querySelectorAll<SVGGElement>('.layer');
    let raf = 0;

    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = root.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        layers.forEach((l) => {
          const d = Number(l.dataset['depth'] ?? 0);
          l.style.transform = `translate(${x * d}px, ${y * d}px)`;
        });
      });
    };
    const leave = () => layers.forEach((l) => (l.style.transform = ''));

    root.addEventListener('pointermove', move);
    root.addEventListener('pointerleave', leave);
    this.cleanups.push(() => {
      root.removeEventListener('pointermove', move);
      root.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    });
  }

  /** El arco de "Volver arriba" se completa según el scroll */
  private initScrollArch(root: HTMLElement): void {
    const arch = root.querySelector<SVGPathElement>('.top-arch');
    if (!arch) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      arch.style.strokeDashoffset = String(1 - (max > 0 ? window.scrollY / max : 0));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    this.cleanups.push(() => window.removeEventListener('scroll', onScroll));
  }

  /** Hora local y estado de atención de cada equipo */
  private tickClocks(): void {
    const { clocks, hours } = this.config();
    const now = new Date();
    const next: Partial<Record<string, ClockView>> = {};

    clocks.forEach((c) => {
      const p = Object.fromEntries(
        new Intl.DateTimeFormat('en-US', {
          timeZone: c.tz,
          hour: '2-digit',
          minute: '2-digit',
          hourCycle: 'h23',
          weekday: 'short',
        })
          .formatToParts(now)
          .map((x) => [x.type, x.value]),
      ) as Record<string, string>;
      const h = Number(p['hour']);
      const day = WEEKDAYS.indexOf(p['weekday']);

      next[c.tz] = {
        hh: p['hour'],
        mm: p['minute'],
        open: hours.weekdays.includes(day) && h >= hours.start && h < hours.end,
      };
    });

    this.clocks.set(next);
  }

  private readonly el = inject(ElementRef);

  private readonly languageAnimation = effect(() => {
    const lang = this.i18n.lang();

    queueMicrotask(() => {
      const elements = this.el.nativeElement.querySelectorAll('.footer-i18n');

      elements.forEach((element: HTMLElement) => {
        element.classList.remove('footer-text-in');

        void element.offsetWidth;

        element.classList.add('footer-text-in');
      });
    });
  });
}
