import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  template: `
    <div class="layout">
      <div class="menu">
        <app-menu></app-menu>
      </div>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent {
  title = 'quasar-dynamics';
}
