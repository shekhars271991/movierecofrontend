// src/app/movie.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  // Fetch movies with pagination
  getMovies(page: number, pageSize: number): Observable<any> {
    const url = `${this.baseUrl}/movies?page=${page}&page_size=${pageSize}`;
    return this.http.get<any>(url);  // No need to manually add headers anymore
  }
}
