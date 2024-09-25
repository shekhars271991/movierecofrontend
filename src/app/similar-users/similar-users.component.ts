import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from '../side-panel/side-panel.component';

@Component({
  selector: 'app-similar-users',
  templateUrl: './similar-users.component.html',
  styleUrls: ['./similar-users.component.scss'],
  standalone: true, 
  imports: [CommonModule, SidePanelComponent]
})
export class SimilarUsersComponent implements OnInit {
  similarUsers: any[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchSimilarUsers();
  }

  fetchSimilarUsers(): void {
    this.http.get<any[]>('http://127.0.0.1:5000/similar-users').subscribe(
      (data) => {
        this.similarUsers = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching similar users';
      }
    );
  }

  // Helper to get a list of rated movies for each user
  getRatedMovies(ratings: any): string[] {
    return Object.keys(ratings);
  }
}
