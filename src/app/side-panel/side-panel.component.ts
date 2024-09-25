import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  standalone: true,  // Make it standalone
  imports: [CommonModule]
})
export class SidePanelComponent {
  currentUser: string | null = null;
  ngOnInit(): void {
    this.loadCurrentUser();
  }

  constructor(private router: Router) {}

  // Function to navigate to different routes
  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  // Function to log out the user
  logout(): void {
    // Add your logout logic here (e.g., clear auth tokens)
    this.router.navigate(['/login']);
  }
  loadCurrentUser(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      this.currentUser = parsedUser.username || 'User';
    }
  }
}
