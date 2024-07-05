// En supabase.service.ts (o crea un nuevo servicio si es necesario)
import { Injectable } from '@angular/core';
interface Suggestion {
    display_name: string;
    district: string;
    province: string;
    department: string;
    lat: string;
    lon: string;
  }
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
    selectedSuggestion: Suggestion | null = null; // Definir la propiedad selectedSuggestion

  constructor() {}
}
