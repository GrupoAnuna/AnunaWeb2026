import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Footer } from '@features/shell/components/footer/footer.component';
import { HeaderComponent } from '@features/shell/components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent,Footer],  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
