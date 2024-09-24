// src/app/home/home.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule for ngIf and ngFor
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MovieService } from '../movie.service';  // Service to fetch and update movies
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Include CommonModule for *ngIf and *ngFor
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];  // To store the list of movies
  page: number = 1;  // Track the current page
  pageSize: number = 5;  // 5 movies per page
  totalMovies: number = 0;  // Total number of movies available
  totalPages: number = 0;  // Total number of pages
  errorMessage: string = '';

  constructor(private authService: AuthService, private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadMovies();
  }

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

  // Set watched status for a movie
  setWatched(movie: any, watched: boolean): void {
    movie.watched = watched;  // Set the watched status
    if (!watched) {
      movie.rating = null;  // Clear rating if the movie is not watched
      this.submitAction(movie);
    }
  }

  // Submit the action (watched status and rating) to the backend
  submitAction(movie: any): void {
    const payload = {
      movie_id: movie.id,
      watched: movie.watched,
      rating: movie.watched && movie.rating ? Number(movie.rating) : undefined
    };

    this.movieService.updateMovieAction(payload).subscribe(
      () => {
        console.log('Movie action submitted successfully');
      },
      (error) => {
        this.errorMessage = 'Failed to submit movie action.';
      }
    );
  }

  // Submit the rating for the movie
  submitRating(movie: any): void {
    if (movie.rating && movie.watched) {
      this.submitAction(movie);  // Submit the action with rating if available
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadMovies();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadMovies();
    }
  }
}
