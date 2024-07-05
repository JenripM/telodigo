import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_KEY,
    );
  }

  // Método para obtener datos de una tabla
  async getTableData(tableName: string) {
    const { data, error } = await this.supabaseClient
      .from(tableName)
      .select('*');

    if (error) {
      throw error;
    }
    return data;
  }
}