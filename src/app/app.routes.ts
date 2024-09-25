// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { RegistrationComponent } from './registration/registration.component'; // Import the registration component
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { SimilarUsersComponent } from './similar-users/similar-users.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'recommendations', 
    component: RecommendationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'similar-users', 
    component: SimilarUsersComponent,
    canActivate: [AuthGuard]
  },
  { path: 'register', component: RegistrationComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
