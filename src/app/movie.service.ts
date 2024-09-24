// src/app/movie.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';  // Adjust if needed

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  // Fetch movies with pagination and optional status
  getMovies(page: number, pageSize: number, status: string): Observable<any> {
    const url = `${this.baseUrl}/movies?page=${page}&page_size=${pageSize}&status=${status}`;
    return this.http.get<any>(url);
  }

  // Submit movie action (watched status and rating)
  updateMovieAction(payload: { movie_id: string; watched: boolean; rating?: number }): Observable<any> {
    const url = `${this.baseUrl}/movies/action`;
    return this.http.post<any>(url, payload);  // Send movie action to the backend
  }
}
