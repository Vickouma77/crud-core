import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { UserService } from '../../services/user.service';
import { Book, Review } from '../../models/book.model';
import { StarRatingComponent } from '../../shared/components/star-rating/star-rating.component';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, StarRatingComponent],
  template: `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" *ngIf="book">
      <!-- Back Button -->
      <div class="mb-6">
        <a routerLink="/books" class="inline-flex items-center text-primary-600 hover:text-primary-700">
          <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Books
        </a>
      </div>

      <!-- Book Details -->
      <div class="card mb-8">
        <div class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
          <div class="w-full md:w-64 h-80 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-24 h-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ book.title }}</h1>
            <p class="text-xl text-gray-600 mb-4">by {{ book.author }}</p>
            <p class="text-sm text-gray-500 mb-4">{{ book.genre }}</p>
            
            <div class="flex items-center space-x-4 mb-6">
              <app-star-rating [rating]="book.rating" [readonly]="true"></app-star-rating>
              <span class="text-sm text-gray-600">{{ book.reviewCount }} reviews</span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                    [class.bg-green-100]="book.available"
                    [class.text-green-800]="book.available"
                    [class.bg-red-100]="!book.available"
                    [class.text-red-800]="!book.available">
                {{ book.available ? 'Available' : 'Currently Borrowed' }}
              </span>
            </div>
            
            <p class="text-gray-700 mb-6 leading-relaxed">{{ book.description }}</p>
            
            <button 
              (click)="requestBorrow()"
              [disabled]="!book.available || borrowRequested"
              class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
              {{ borrowRequested ? 'Request Sent!' : (book.available ? 'Request to Borrow' : 'Not Available') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Add Review Section -->
      <div class="card mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Add Your Review</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
            <app-star-rating 
              [rating]="newReview.rating" 
              [readonly]="false" 
              [showRating]="false"
              (ratingChange)="newReview.rating = $event">
            </app-star-rating>
          </div>
          <div>
            <label for="review-comment" class="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              id="review-comment"
              [(ngModel)]="newReview.comment"
              rows="4"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Share your thoughts about this book...">
            </textarea>
          </div>
          <button 
            (click)="submitReview()"
            [disabled]="!newReview.rating || !newReview.comment.trim()"
            class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
            Submit Review
          </button>
        </div>
      </div>

      <!-- Reviews Section -->
      <div class="card">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Reviews</h2>
        
        <div *ngIf="reviews.length === 0" class="text-center py-8 text-gray-500">
          No reviews yet. Be the first to review this book!
        </div>
        
        <div class="space-y-6" *ngIf="reviews.length > 0">
          <div *ngFor="let review of reviews" class="border-b border-gray-100 pb-6 last:border-b-0">
            <div class="flex items-start space-x-4">
              <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-primary-600 font-medium text-sm">
                  {{ review.username.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-2">
                  <span class="font-medium text-gray-900">{{ review.username }}</span>
                  <app-star-rating [rating]="review.rating" [readonly]="true" [showRating]="false"></app-star-rating>
                  <span class="text-sm text-gray-500">{{ review.date | date:'short' }}</span>
                </div>
                <p class="text-gray-700">{{ review.comment }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BookDetailComponent implements OnInit {
  book: Book | null = null;
  reviews: Review[] = [];
  borrowRequested = false;
  newReview = {
    rating: 0,
    comment: ''
  };

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.bookService.getBook(bookId).subscribe(book => {
      this.book = book || null;
    });

    this.bookService.getBookReviews(bookId).subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  requestBorrow(): void {
    if (this.book && this.book.available) {
      this.userService.borrowBook(this.book.id).subscribe(() => {
        this.borrowRequested = true;
      });
    }
  }

  submitReview(): void {
    if (this.book && this.newReview.rating && this.newReview.comment.trim()) {
      this.bookService.addReview({
        bookId: this.book.id,
        username: 'bookworm23', // In a real app, this would come from auth
        rating: this.newReview.rating,
        comment: this.newReview.comment
      }).subscribe(review => {
        this.reviews.unshift(review);
        this.newReview = { rating: 0, comment: '' };
      });
    }
  }
}