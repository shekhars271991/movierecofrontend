// src/app/registration/registration.component.ts

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  name: string = '';
  username: string = '';  // Changed from email to username
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';  // New property for success message

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService
      .register(this.name, this.username, this.password)
      .pipe(
        catchError((error) => {
          this.errorMessage = error.error.message || 'Registration failed';
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          // Set the success message and clear the form
          this.successMessage = 'User registered successfully. You can now login.';
          this.errorMessage = '';
          this.name = '';
          this.username = '';
          this.password = '';
          this.confirmPassword = '';
        }
      });
  }
}
