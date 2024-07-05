import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-4',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-4.component.html',
  styleUrl: './section-4.component.css'
})
export class Section4Component implements OnInit {
  selectedCity: string = 'Lima';

  constructor() { }

  ngOnInit(): void {
  }

  showCity(cityName: string): void {
    this.selectedCity = cityName;
  }
}
