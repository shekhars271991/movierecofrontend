// src/app/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';  // Import environment


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.backendUrl; 

  constructor(private http: HttpClient) {}

  /**
   * Registers a new user with the provided name, username, and password.
   * @param name - The full name of the user.
   * @param username - The username chosen by the user.
   * @param password - The user's password.
   * @returns An Observable of the HTTP response.
   */
  register(name: string, username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/register`;
    const body = { name, username, password };
    return this.http.post(url, body);
  }

  /**
   * Logs in an existing user with the provided username and password.
   * @param username - The user's username.
   * @param password - The user's password.
   * @returns An Observable of the HTTP response.
   */
  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    const body = { username, password };
    return this.http.post(url, body);
  }

  /**
   * Logs out the current user by removing their data from localStorage.
   */
  logout(): void {
    localStorage.removeItem('currentUser');
  }

  /**
   * Checks whether a user is currently logged in.
   * @returns True if a user is logged in; otherwise, false.
   */
  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  /**
   * Retrieves the current logged-in user's username.
   * @returns The username if a user is logged in; otherwise, null.
   */
  getCurrentUser(): string | null {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      return user.username;
    }
    return null;
  }
}
