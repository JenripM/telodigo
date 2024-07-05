import { Component } from '@angular/core';
import { NavFuncionaComponent } from './nav-funciona/nav-funciona.component';
import { Section1Component } from './section-1/section-1.component';
import { Section2Component } from './section-2/section-2.component';

@Component({
  selector: 'app-funciona',
  standalone: true,
  imports: [NavFuncionaComponent, Section1Component, Section2Component],
  templateUrl: './funciona.component.html',
  styleUrl: './funciona.component.css'
})
export class FuncionaComponent {

}
