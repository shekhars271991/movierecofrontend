// src/app/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';  // Import your environment file

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.backendUrl;  // URL for your backend

  constructor(private http: HttpClient) {}

  // Login method to authenticate the user
  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<any>(url, { username, password });
  }

  // Register method to register a new user
  register(name: string, username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/register`;
    const body = { name, username, password };
    return this.http.post<any>(url, body);  // Send the registration data
  }

  // Logout method to clear the token
  logout(): void {
    localStorage.removeItem('authToken'); 
    localStorage.removeItem('currentUser'); // Clear the token from localStorage
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('authToken') !== null;  // Check if token exists
  }

  // Method to get the current user (if stored in localStorage)
  getCurrentUser(): string | null {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser).username;
    }
    return null;
  }
}
