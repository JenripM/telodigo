import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-funciona',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-funciona.component.html',
  styleUrl: './nav-funciona.component.css'
})
export class NavFuncionaComponent {
  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = this.el.nativeElement.querySelector('.navbar');
    if (window.scrollY > 0) {
      navbar.classList.add('bg-purple', 'shadow-header');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.add('bg-transparent');
      navbar.classList.remove('bg-purple' , 'shadow-header');
    }
  }
}
