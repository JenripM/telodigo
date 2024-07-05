import { Component, HostListener, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Icon, Map, marker, tileLayer } from 'leaflet';
import { SupabaseService } from '../../shared/data-access/supabase.service';
import { SharedDataService } from '../../shared/data-access/shared-data.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
interface Suggestion {
  display_name: string;
  district: string;
  province: string;
  department: string;
  lat: string;
  lon: string;
}

@Component({
  selector: 'app-telos',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './telos.component.html',
  styleUrls: ['./telos.component.css']
})
export class TelosComponent implements AfterViewInit, OnInit {
  mostrarBotonD = true;
  isModalOpen: boolean = false;
  map: Map | null = null;
  violetIcon: Icon | undefined;
  searchQuery = '';
  suggestions: Suggestion[] = [];
  selectedSuggestion: Suggestion | null = null;
  minValue: number = 10; // Valor mínimo por defecto
  maxValue: number = 400; // Valor máximo por defecto

  constructor(private router: Router,private el: ElementRef,private sharedDataService: SharedDataService,  private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.fetchTableData();

    this.selectedSuggestion = this.sharedDataService.selectedSuggestion;

    if (this.selectedSuggestion) {
      this.initializeMap2(this.selectedSuggestion); // Inicializar el mapa con la sugerencia seleccionada
    }
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  
  initializeMap(): void {
    this.map = new Map('map').setView([-8.1153, -79.026], 5);

    tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.violetIcon = new Icon({
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


  }
  initializeMap2(selectedSuggestion: Suggestion): void {
    this.map = new Map('map').setView([parseFloat(selectedSuggestion.lat), parseFloat(selectedSuggestion.lon)], 13);

    tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.violetIcon = new Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    marker([parseFloat(selectedSuggestion.lat), parseFloat(selectedSuggestion.lon)], { icon: this.violetIcon }).addTo(this.map)
      .bindPopup(`<strong>${selectedSuggestion.display_name}</strong>`)
      .openPopup();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = this.el.nativeElement.querySelector('.navbar');
    if (window.scrollY > 0) {
      navbar.classList.add('bg-purple', 'shadow-header');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.add('bg-transparent');
      navbar.classList.remove('bg-purple', 'shadow-header');
    }
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.trim();

    if (this.searchQuery.length > 0) {
      this.fetchSuggestions(this.searchQuery);
    } else {
      this.suggestions = [];
    }
  }

  fetchSuggestions(query: string): void {
    const countryCode = 'PE'; // Código del país, por ejemplo 'PE' para Perú

    // Realizarías la búsqueda de sugerencias según el query
    // Aquí puedes añadir manualmente las sugerencias según lo solicitado
    const filteredSuggestions = this.allSuggestions.filter(suggestion =>
      suggestion.display_name.toLowerCase().includes(query.toLowerCase())
    );

    this.suggestions = filteredSuggestions.slice(0, 5); // Limitar a 5 sugerencias
  }

  selectSuggestion(suggestion: Suggestion): void {
    this.searchQuery = suggestion.display_name;
    this.selectedSuggestion = suggestion;
    this.suggestions = [];
  }


  tableData: any[] = [];

  hostalesData: any[] = [];
  fotosData: any[] = [];
  selectedCategoria: number = 1;

  async fetchTableData() {
    try {
      // Obtener datos de ambas tablas en paralelo
      const [categoriasData, hostalesData, fotosData] = await Promise.all([
        this.supabaseService.getTableData('categorias'),
        this.supabaseService.getTableData('hostales'),
        this.supabaseService.getTableData('fotos')

      ]);
  
      // Asignar los datos a las variables correspondientes
      this.tableData = categoriasData;
      this.hostalesData = hostalesData;
      this.fotosData = fotosData;
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  }
  getFotosForHostal(hostalId: number): any[] {
    return this.fotosData.filter(foto => foto.hostalcodigo === hostalId);
  }
  getFilteredHostales(): any[] {
    return this.hostalesData.filter(hostal => hostal.categoriaid === this.selectedCategoria);
  }
  updateRangeByInput() {
    const minInput = document.querySelector('.input-min') as HTMLInputElement;
    const maxInput = document.querySelector('.input-max') as HTMLInputElement;

    this.minValue = parseInt(minInput.value);
    this.maxValue = parseInt(maxInput.value);

    if (this.minValue > this.maxValue) {
      this.maxValue = this.minValue;
    }

    this.updateSlider();
  }

  updateSlider() {
    const minRange = document.querySelector('.range-min') as HTMLInputElement;
    const maxRange = document.querySelector('.range-max') as HTMLInputElement;

    minRange.value = this.minValue.toString();
    maxRange.value = this.maxValue.toString();

    const progress = document.querySelector('.progress') as HTMLElement;
    const range = parseInt(maxRange.max) - parseInt(minRange.min);

    const value = (this.maxValue - this.minValue) / range * 100;

    progress.style.width = value + '%';
  }

  updateRangeBySlider() {
    const minRange = document.querySelector('.range-min') as HTMLInputElement;
    const maxRange = document.querySelector('.range-max') as HTMLInputElement;

    this.minValue = parseInt(minRange.value);
    this.maxValue = parseInt(maxRange.value);

    if (this.minValue > this.maxValue) {
      this.minValue = this.maxValue;
    }

    const minInput = document.querySelector('.input-min') as HTMLInputElement;
    const maxInput = document.querySelector('.input-max') as HTMLInputElement;
    minInput.value = this.minValue.toString();
    maxInput.value = this.maxValue.toString();

    this.updateSlider();
  }

  redirigirComponenteC() {
    this.mostrarBotonD = false;
  }

  showCity(categoriaId: number): void {
    this.selectedCategoria = categoriaId;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Aquí defines tus sugerencias manualmente
 // Aquí defines tus sugerencias manualmente
private allSuggestions: Suggestion[] = [
  { display_name: 'Trujillo, Trujillo, La Libertad', district: 'Trujillo', province: 'Trujillo', department: 'La Libertad', lat: '-8.1153', lon: '-79.026' },
  { display_name: 'Huanchaco, Trujillo, La Libertad', district: 'Huanchaco', province: 'Trujillo', department: 'La Libertad', lat: '-8.0862', lon: '-79.1178' },
  { display_name: 'Laredo, Trujillo, La Libertad', district: 'Laredo', province: 'Trujillo', department: 'La Libertad', lat: '-8.0999', lon: '-78.9643' },
  { display_name: 'Moche, Trujillo, La Libertad', district: 'Moche', province: 'Trujillo', department: 'La Libertad', lat: '-8.1719', lon: '-79.0093' },
  { display_name: 'Salaverry, Trujillo, La Libertad', district: 'Salaverry', province: 'Trujillo', department: 'La Libertad', lat: '-8.2268', lon: '-78.9765' },
  { display_name: 'Florencia de Mora, Trujillo, La Libertad', district: 'Florencia de Mora', province: 'Trujillo', department: 'La Libertad', lat: '-8.1211', lon: '-79.0307' },
  { display_name: 'El Porvenir, Trujillo, La Libertad', district: 'El Porvenir', province: 'Trujillo', department: 'La Libertad', lat: '-8.1207', lon: '-79.0252' },
  { display_name: 'Victor Larco Herrera, Trujillo, La Libertad', district: 'Victor Larco Herrera', province: 'Trujillo', department: 'La Libertad', lat: '-8.1208', lon: '-79.0286' },
  { display_name: 'La Esperanza, Trujillo, La Libertad', district: 'La Esperanza', province: 'Trujillo', department: 'La Libertad', lat: '-8.0964', lon: '-79.0084' },
  { display_name: 'Víctor Raúl Haya de la Torre, Trujillo, La Libertad', district: 'Víctor Raúl Haya de la Torre', province: 'Trujillo', department: 'La Libertad', lat: '-8.1293', lon: '-79.0486' }
];

categoriaBuscada: string = '';
searchLocation(): void {
  if (this.selectedSuggestion) {
    const lat = parseFloat(this.selectedSuggestion.lat);
    const lon = parseFloat(this.selectedSuggestion.lon);
    const ciudad = this.selectedSuggestion.province.toLowerCase().replace(/\s+/g, '-');

    // Navegar a la ruta con la provincia seleccionada
    this.router.navigate(['/telos', ciudad,this.categoriaBuscada.toLowerCase()]);

    if (this.map) {
      this.map.setView([lat, lon], 13);
      marker([lat, lon], { icon: this.violetIcon }).addTo(this.map)
        .bindPopup(`<strong>${this.selectedSuggestion.display_name}</strong>`)
        .openPopup();
    }
  }
}
}
