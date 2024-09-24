// src/app/login/login.component.ts

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService
      .login(this.username, this.password)
      .pipe(
        catchError((error) => {
          this.errorMessage = error.error.message || 'Login failed';
          return of(null); // Return null to continue after handling the error
        })
      )
      .subscribe((response) => {
        if (response) {
          // Store user data in localStorage after successful login
          localStorage.setItem('currentUser', JSON.stringify({ username: this.username }));
          localStorage.setItem('authToken', response.access_token );
          // Navigate to the home page or dashboard
          this.router.navigate(['/home']);
        }
      });
  }

  // Method to navigate to the registration page
  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
