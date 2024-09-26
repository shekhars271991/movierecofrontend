Movie Recommendation App - Angular Frontend
===========================================

This project is the frontend for the Movie Recommendation System built with Angular. It allows users to register, log in, view movie recommendations, and perform actions such as rating or marking movies as watched/unwatched. The frontend communicates with the Flask-based backend API.

Backend
--------

-   The Flask backend of this application is available at: https://github.com/shekhars271991/MyRecoEngine

Features
--------

-   **User Registration & Login**: Users can register and log in to access the app.
-   **Movie List**: View a paginated list of movies, mark them as seen or not seen, and provide ratings.
-   **Movie Recommendations**: Get personalized movie recommendations.
-   **Similar Users**: View users with similar movie preferences.
-   **Side Panel Navigation**: Use the side panel for easy navigation between pages.

Table of Contents
-----------------

-   [Installation](#installation)
-   [Project Structure](#project-structure)
-   [Environment Variables](#environment-variables)
-   [Running the Application](#running-the-application)
-   [Features Overview](#features-overview)
-   [Useful Commands](#useful-commands)

Installation
------------

Follow these steps to set up and run the project on your local machine:

### Prerequisites

-   Node.js (v14 or later)
-   Angular CLI (v12 or later)

### Steps

1.  **Clone the Repository**

    bash

    Copy code

    `git clone <repository-url>
    cd movie-recommendation-frontend`

2.  **Install Dependencies**

    Install the required packages by running:

    bash

    Copy code

    `npm install`

3.  **Set Up Environment Variables**

    Create an `environment.ts` file in the `src/environments` directory. You need to configure the backend API endpoint:

    typescript

    Copy code

    `export const environment = {
      production: false,
      apiBaseUrl: 'http://localhost:5000'
    };`

4.  **Run the Angular Application**

    To run the app in development mode:

    bash

    Copy code

    `ng serve`

    The app will be accessible at `http://localhost:4200`.

Environment Variables
---------------------

Ensure that your `environment.ts` file includes the correct API base URL of your backend:

typescript

Copy code

`export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000' // Adjust based on your backend URL
};`

For production builds, create an `environment.prod.ts` file with the same structure and set `production: true`.

Running the Application
-----------------------

1.  To start the development server:

    bash

    Copy code

    `ng serve`

    Visit `http://localhost:4200` in your browser to see the app.

2.  **Build for Production**:

    To build the application for production, use:

    bash

    Copy code

    `ng build --prod`

    The build output will be stored in the `dist/` directory.

Features Overview
-----------------

### 1\. **User Registration & Login**

The app includes two main components for registration and login:

-   `src/app/auth/login.component.ts`
-   `src/app/auth/register.component.ts`

These components handle user input and communicate with the backend to authenticate users and store JWT tokens.

* * * * *

### 2\. **Movie List (Home Page)**

**Component**: `HomeComponent`

This component displays a paginated list of movies fetched from the backend API. Users can mark movies as "seen" or "not seen" and rate the ones they have watched.

**Features**:

-   Display movie details such as title, description, genres, and actors.
-   "Seen" and "Not Seen" buttons to mark the movie status.
-   Rating system for seen movies.

* * * * *

### 3\. **Movie Recommendations**

**Component**: `RecommendationsComponent`

This page shows personalized movie recommendations based on the user's viewing preferences.

**Features**:

-   Movie details such as title, genres, release year, and rating.
-   Posters displayed for each recommended movie.

* * * * *

### 4\. **Similar Users**

**Component**: `SimilarUsersComponent`

Shows a list of users with similar movie preferences based on vector distances.

**Features**:

-   Displays the users and the movies they've rated.

* * * * *

### 5\. **Side Panel Navigation**

**Component**: `SidePanelComponent`

The side panel contains navigation buttons that allow users to quickly switch between the home page, recommendations, and the similar users page. The current user's name is also displayed at the top.

* * * * *

Useful Commands
---------------

### Serve the Application

bash

Copy code

`ng serve`

### Build the Application for Production

bash

Copy code

`ng build --prod`

