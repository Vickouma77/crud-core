import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { StarRatingComponent } from '../../shared/components/star-rating/star-rating.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, RouterModule, StarRatingComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Browse Books</h1>
        <p class="text-gray-600">Discover your next great read from our collection</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let book of books" class="card hover:shadow-md transition-shadow">
          <div class="flex flex-col h-full">
            <div class="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 mb-1">{{ book.title }}</h3>
              <p class="text-sm text-gray-600 mb-2">by {{ book.author }}</p>
              <p class="text-xs text-gray-500 mb-3">{{ book.genre }}</p>
              
              <div class="flex items-center space-x-2 mb-3">
                <app-star-rating [rating]="book.rating" [readonly]="true"></app-star-rating>
                <span class="text-xs text-gray-500">({{ book.reviewCount }})</span>
              </div>
              
              <p class="text-sm text-gray-700 mb-4 line-clamp-3">{{ book.description }}</p>
            </div>
            
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    [class.bg-green-100]="book.available"
                    [class.text-green-800]="book.available"
                    [class.bg-red-100]="!book.available"
                    [class.text-red-800]="!book.available">
                {{ book.available ? 'Available' : 'Borrowed' }}
              </span>
              <a [routerLink]="['/books', book.id]" class="btn-primary text-sm">
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }
}