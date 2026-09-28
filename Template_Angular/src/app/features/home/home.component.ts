import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Footer } from '@features/shell/components/footer/footer.component';
import { HeaderComponent } from '@features/shell/components/header/header.component';
import { Hero} from './sections/hero/hero';
import { Services } from './sections/services/services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent,Footer, Hero, Services,],  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
