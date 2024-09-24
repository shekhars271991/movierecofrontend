// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi , HTTP_INTERCEPTORS} from '@angular/common/http';  // New imports
import { AuthInterceptor } from './app/auth.interceptor';  // Import the interceptor

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),  // Use the new provideHttpClient method
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true  // Register the AuthInterceptor
    },
  ],
}).catch((err) => console.error(err));
