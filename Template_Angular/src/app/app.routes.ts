import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Grupo Anuna | Tecnología que une esfuerzos',
   },
  { path: 'contacto', loadComponent: () => import('./features/contact/contact').then(m => m.Contact)  }
];
