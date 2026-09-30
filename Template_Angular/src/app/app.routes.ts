import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Grupo Anuna | Tecnología que une esfuerzos',
  },
  { path: 'contacto', loadComponent: () => import('./features/contact/contact').then(m => m.Contact) },
  { path: 'nosotros', loadComponent: () => import('./features/about/about').then(m => m.About) },
  { path: 'casos', loadComponent: () => import('./features/cases/cases').then(m => m.Cases) },
  {
    path: 'desarrollo-web',
    loadComponent: () =>
      import('./features/desarrollo-web/web-development').then((m) => m.WebDevelopment),
    title: 'Desarrollo web y aplicaciones web | Grupo Anuna',
  },

  {
    path: 'desarrollo-apps',
    loadComponent: () =>
      import('./features/desarrollo-apps/app-development').then((m) => m.AppDevelopment),
    title: 'Desarrollo de apps | Grupo Anuna',
  },

  {
    path: 'consultoria',
    loadComponent: () => import('./features/consultoria/consulting').then((m) => m.Consulting),
    title: 'Consultoría tecnológica | Grupo Anuna',
  },

  {
    path: 'ciberseguridad',
    loadComponent: () => import('./features/ciberseguridad/cybersecurity').then((m) => m.Cybersecurity),
    title: 'Ciberseguridad para tu negocio | Grupo Anuna',
  },

  {
  path: 'cloud',
  loadComponent: () => import('./features/cloud/cloud-page').then((m) => m.CloudPage),
  title: 'Servicios cloud | Grupo Anuna',
},
];
