import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { SupabaseService } from '../../../shared/data-access/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedDataService } from '../../../shared/data-access/shared-data.service';

interface Suggestion {
  display_name: string;
  district: string;
  province: string;
  department: string;
  lat: string;
  lon: string;
}

@Component({
  selector: 'app-section-1',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './section-1.component.html',
  styleUrls: ['./section-1.component.css']
})
export class Section1Component implements OnInit {
  
  tableData: any[] = [];
  filteredSuggestions: Suggestion[] = [];
  ciudadBuscada: string = '';

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
  constructor(private router: Router, private el: ElementRef, private supabaseService: SupabaseService, private sharedDataService: SharedDataService) {
    this.filteredSuggestions = this.allSuggestions;

  }
  ngOnInit() {
    this.fetchTableData();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = this.el.nativeElement.querySelector('.navbar');
    const searchBar = this.el.nativeElement.querySelector('#search-bar');

    if (window.scrollY > 0) {
      navbar.classList.add('bg-purple', 'shadow-header');
      navbar.classList.remove('bg-transparent');

      if (searchBar) {
        searchBar.classList.add('fixed-search-bar');
      }
    } else {
      navbar.classList.add('bg-transparent');
      navbar.classList.remove('bg-purple', 'shadow-header');

      if (searchBar) {
        searchBar.classList.remove('fixed-search-bar');
      }
    }
  }


  async fetchTableData() {
    try {
      this.tableData = await this.supabaseService.getTableData('categorias');
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  }


  scrollToBottom() {
    // Desplazar hacia el elemento con ID 'final'
    const element = document.getElementById('pre-registro');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}



filterSuggestions() {
  if (this.ciudadBuscada.trim() !== '') {
    this.filteredSuggestions = this.allSuggestions.filter(suggestion =>
      suggestion.display_name.toLowerCase().includes(this.ciudadBuscada.toLowerCase())
    );
  } else {
    this.filteredSuggestions = [];
  }
}

selectSuggestion(suggestion: Suggestion) {
  this.ciudadBuscada = suggestion.display_name; // Mostrar display_name completo
  this.sharedDataService.selectedSuggestion = suggestion; // Guardar la sugerencia seleccionada en el servicio compartido

  this.filteredSuggestions = []; // Limpiar las sugerencias
}

clearSuggestions() {
  // Limpiar las sugerencias cuando el input está vacío
  if (this.ciudadBuscada.trim() === '') {
    this.filteredSuggestions = [];
  }
}
categoriaBuscada: string = '';
buscar() {
  // Redirigir a la página de 'telos' con la ciudad buscada como parámetro
  if (this.ciudadBuscada.trim()) {
    this.router.navigate(['/telos/ciudad=',this.ciudadBuscada.split(',')[2].trim(),'/categoria=',this.categoriaBuscada]);
  }
}
}
