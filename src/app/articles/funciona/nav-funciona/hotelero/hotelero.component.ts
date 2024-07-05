import { Component } from '@angular/core';
import { Section1Component } from './section-1/section-1.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hotelero',
  standalone: true,
  imports: [Section1Component, RouterLink],
  templateUrl: './hotelero.component.html',
  styleUrl: './hotelero.component.css'
})
export class HoteleroComponent {

}
