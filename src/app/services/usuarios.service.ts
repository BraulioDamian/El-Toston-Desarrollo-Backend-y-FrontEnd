import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http:HttpClient) { }

  pruebaConexion(): Observable<any>{
    return this.http.get(`${this.apiUrl}/prueba`);
  }

}
