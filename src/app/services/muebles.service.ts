import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.models';

@Injectable({
  providedIn: 'root'
})
export class MueblesService {

  private apiUrl = 'http://localhost:3000/categorias'; // URL de tu API de categorías

  constructor(private http: HttpClient) { }

  // Método para obtener las categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }
}
