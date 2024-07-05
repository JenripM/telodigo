import { Component } from '@angular/core';
import { NavFuncionaComponent } from '../nav-funciona.component';
import { Section1Component } from './section-1/section-1.component';

@Component({
  selector: 'app-conocenos',
  standalone: true,
  imports: [NavFuncionaComponent, Section1Component,],
  templateUrl: './conocenos.component.html',
  styleUrl: './conocenos.component.css'
})
export class ConocenosComponent {

}
