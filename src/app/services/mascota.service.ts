import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascota } from '../models/mascota';


@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private apiUrl = 'http://localhost:8080/api/mascotas';

  constructor(private http: HttpClient) {}

  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.apiUrl);
  }
}
