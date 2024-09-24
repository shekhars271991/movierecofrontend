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
    this.loadMovies();  // Load movies when the page loads
  }

  // Load movies (default to new movies)
  loadMovies(): void {
    this.movieService.getMovies(this.page, this.pageSize, 'new').subscribe(
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

  // Set watched status for a movie without triggering the API call yet
  setWatched(movie: any, watched: boolean): void {
    movie.watched = watched;  // Set the watched status
    if (!watched) {
      movie.rating = null;  // Clear rating if the movie is not watched
      this.submitAction(movie);  // Submit the action for not seen immediately
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
        // Refresh the movie list after an action
        this.loadMovies();  // Reload only 'new' movies
      },
      (error) => {
        this.errorMessage = 'Failed to submit movie action.';
      }
    );
  }

  // Submit the rating for the movie and trigger the API call
  submitRating(movie: any): void {
    if (movie.watched && movie.rating) {
      this.submitAction(movie);  // Submit the action with rating after rating is provided
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Navigate to the next page and reload the movie list
  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadMovies();
    }
  }

  // Navigate to the previous page and reload the movie list
  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadMovies();
    }
  }
}
