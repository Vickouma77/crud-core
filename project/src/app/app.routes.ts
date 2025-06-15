import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'books',
    loadComponent: () => import('./features/books/books.component').then(m => m.BooksComponent)
  },
  {
    path: 'books/:id',
    loadComponent: () => import('./features/books/book-detail.component').then(m => m.BookDetailComponent)
  },
  {
    path: 'clubs',
    loadComponent: () => import('./features/clubs/clubs.component').then(m => m.ClubsComponent)
  },
  {
    path: 'clubs/:id',
    loadComponent: () => import('./features/clubs/club-detail.component').then(m => m.ClubDetailComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];