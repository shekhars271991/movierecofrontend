// src/app/recommendations/recommendations.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';  // Service to fetch movie recommendations
import { SidePanelComponent } from '../side-panel/side-panel.component';  // Import the side panel


@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, SidePanelComponent],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  recommendedMovies: any[] = [];  // To store the list of recommended movies
  errorMessage: string = '';

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadRecommendations();  // Load movie recommendations when the page loads
  }

  // Load movie recommendations
  loadRecommendations(): void {
    this.movieService.getRecommendations().subscribe(
      (response) => {
        this.recommendedMovies = response;
      },
      (error) => {
        this.errorMessage = 'Error loading recommendations. Please try again later.';
      }
    );
  }

  // Navigate back to the home page
  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
