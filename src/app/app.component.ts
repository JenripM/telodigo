import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { Section1Component } from './articles/inicio/section-1/section-1.component';
import { InicioComponent } from './articles/inicio/inicio.component';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      CommonModule, 
      RouterOutlet, 
      NavBarComponent, 
      FooterComponent, 
      InicioComponent,
      Section1Component
      ]
})
export class AppComponent {
  title = 'AngularArquitectura';
}
