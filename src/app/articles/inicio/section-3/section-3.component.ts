import { Component, OnInit } from '@angular/core';
import { Icon, Map, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-section-3',
  standalone: true,
  templateUrl: './section-3.component.html',
  styleUrls: ['./section-3.component.css']
})
export class Section3Component implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    const map = new Map('map').setView([-8.1153, -79.026], 5);
    tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const violetIcon = new Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const popupContent = `
      <div style="color:blue;">
        <strong>HOTEL</strong>
        <span style="color:red;"> PRUEBAAA</span>
      </div>
    `;

    marker([-8.11184, -79.02874], { icon: violetIcon }).addTo(map).bindPopup(popupContent);
  }
}
