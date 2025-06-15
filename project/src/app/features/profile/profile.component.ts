import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BookService } from '../../services/book.service';
import { ClubService } from '../../services/club.service';
import { User } from '../../models/user.model';
import { Book, Review } from '../../models/book.model';
import { Club } from '../../models/club.model';
import { StarRatingComponent } from '../../shared/components/star-rating/star-rating.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, StarRatingComponent],
  template: `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" *ngIf="user">
      <!-- Profile Header -->
      <div class="card mb-8">
        <div class="flex items-center space-x-6">
          <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
            <span class="text-primary-600 font-bold text-2xl">
              {{ user.username.charAt(0).toUpperCase() }}
            </span>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ user.username }}</h1>
            <p class="text-gray-600">{{ user.email }}</p>
            <div class="flex items-center space-x-6 mt-4 text-sm text-gray-500">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                {{ borrowedBooks.length }} books borrowed
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                {{ joinedClubs.length }} clubs joined
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Borrowed Books -->
      <div class="card mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Currently Borrowed Books</h2>
        
        <div *ngIf="borrowedBooks.length === 0" class="text-center py-8 text-gray-500">
          You haven't borrowed any books yet.
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4" *ngIf="borrowedBooks.length > 0">
          <div *ngFor="let book of borrowedBooks" class="border border-gray-200 rounded-lg p-4">
            <div class="flex space-x-4">
              <div class="w-12 h-16 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">{{ book.title }}</h3>
                <p class="text-sm text-gray-600">by {{ book.author }}</p>
                <div class="flex items-center justify-between mt-2">
                  <app-star-rating [rating]="book.rating" [readonly]="true" [showRating]="false"></app-star-rating>
                  <a [routerLink]="['/books', book.id]" class="text-primary-600 hover:text-primary-700 text-sm">
                    View →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Joined Clubs -->
      <div class="card mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Joined Clubs</h2>
        
        <div *ngIf="joinedClubs.length === 0" class="text-center py-8 text-gray-500">
          You haven't joined any clubs yet.
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4" *ngIf="joinedClubs.length > 0">
          <div *ngFor="let club of joinedClubs" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">{{ club.name }}</h3>
                <p class="text-sm text-gray-600">{{ club.genre }}</p>
                <div class="flex items-center justify-between mt-2">
                  <span class="text-xs text-gray-500">{{ club.memberCount }} members</span>
                  <a [routerLink]="['/clubs', club.id]" class="text-primary-600 hover:text-primary-700 text-sm">
                    View →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Reviews -->
      <div class="card">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Your Recent Reviews</h2>
        
        <div *ngIf="userReviews.length === 0" class="text-center py-8 text-gray-500">
          You haven't written any reviews yet.
        </div>
        
        <div class="space-y-4" *ngIf="userReviews.length > 0">
          <div *ngFor="let review of userReviews" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-start justify-between mb-2">
              <div>
                <h3 class="font-medium text-gray-900">Review for "{{ getBookTitle(review.bookId) }}"</h3>
                <div class="flex items-center space-x-2 mt-1">
                  <app-star-rating [rating]="review.rating" [readonly]="true" [showRating]="false"></app-star-rating>
                  <span class="text-sm text-gray-500">{{ review.date | date:'short' }}</span>
                </div>
              </div>
            </div>
            <p class="text-gray-700">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  borrowedBooks: Book[] = [];
  joinedClubs: Club[] = [];
  userReviews: Review[] = [];
  allBooks: Book[] = [];

  constructor(
    private userService: UserService,
    private bookService: BookService,
    private clubService: ClubService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.loadUserData();
    });

    this.bookService.getBooks().subscribe(books => {
      this.allBooks = books;
    });
  }

  private loadUserData(): void {
    if (!this.user) return;

    // Load borrowed books
    this.bookService.getBooks().subscribe(books => {
      this.borrowedBooks = books.filter(book => 
        this.user?.borrowedBooks.includes(book.id)
      );
    });

    // Load joined clubs
    this.clubService.getClubs().subscribe(clubs => {
      this.joinedClubs = clubs.filter(club => 
        this.user?.joinedClubs.includes(club.id)
      );
    });

    // Load user reviews (mock data for demonstration)
    this.userReviews = [
      {
        id: 1,
        bookId: 1,
        username: this.user.username,
        rating: 5,
        comment: 'Absolutely brilliant! Fitzgerald\'s prose is mesmerizing.',
        date: new Date('2024-01-15')
      }
    ];
  }

  getBookTitle(bookId: number): string {
    const book = this.allBooks.find(b => b.id === bookId);
    return book ? book.title : 'Unknown Book';
  }
}