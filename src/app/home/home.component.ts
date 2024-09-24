// src/app/home/home.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MovieService } from '../movie.service'; // A service to handle movie fetching
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];  // Store the list of movies
  page: number = 1;  // Track the current page
  pageSize: number = 5;  // 5 movies per page
  totalMovies: number = 0;  // Total number of movies available
  totalPages: number = 0;  // Total number of pages
  errorMessage: string = '';

  constructor(private authService: AuthService, private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  // Load movies for the current page
  loadMovies(): void {
    this.movieService.getMovies(this.page, this.pageSize).subscribe(
      (response) => {
        this.movies = response.movies;
        this.totalMovies = response.total_movies;
        this.totalPages = response.total_pages;
      },
      (error) => {
        this.errorMessage = 'Error loading movies. Please try again later.';
      }
    );
  }

  // Logout and navigate to login
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Move to the next page of movies
  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadMovies();
    }
  }

  // Move to the previous page of movies
  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadMovies();
    }
  }
}
