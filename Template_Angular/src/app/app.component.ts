import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  // Usamos template inline para asegurarnos de que NO carga basura
  template: `
    <router-outlet />
  `,
  styleUrl: './app.component.css' // Si tienes estilos globales en este css
})
export class AppComponent {}