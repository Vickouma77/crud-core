import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book, Review } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
      genre: 'Classic Literature',
      rating: 4.2,
      reviewCount: 156,
      available: true
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
      genre: 'Classic Literature',
      rating: 4.5,
      reviewCount: 203,
      available: false
    },
    {
      id: 3,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      description: 'A coming-of-age story following Holden Caulfield through New York City.',
      genre: 'Classic Literature',
      rating: 3.8,
      reviewCount: 89,
      available: true
    },
    {
      id: 4,
      title: 'Dune',
      author: 'Frank Herbert',
      description: 'An epic science fiction novel set on the desert planet Arrakis.',
      genre: 'Science Fiction',
      rating: 4.6,
      reviewCount: 312,
      available: true
    },
    {
      id: 5,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      description: 'A fantasy adventure following Bilbo Baggins on an unexpected journey.',
      genre: 'Fantasy',
      rating: 4.7,
      reviewCount: 445,
      available: true
    },
    {
      id: 6,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      description: 'A romantic novel exploring themes of love, reputation, and class in Georgian England.',
      genre: 'Romance',
      rating: 4.3,
      reviewCount: 278,
      available: false
    }
  ];

  private reviews: Review[] = [
    {
      id: 1,
      bookId: 1,
      username: 'bookworm23',
      rating: 5,
      comment: 'Absolutely brilliant! Fitzgerald\'s prose is mesmerizing.',
      date: new Date('2024-01-15')
    },
    {
      id: 2,
      bookId: 1,
      username: 'literaturelover',
      rating: 4,
      comment: 'A timeless classic that still resonates today.',
      date: new Date('2024-01-10')
    },
    {
      id: 3,
      bookId: 4,
      username: 'scifireader',
      rating: 5,
      comment: 'Herbert created an incredible universe. A must-read for sci-fi fans!',
      date: new Date('2024-01-20')
    }
  ];

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }

  getBook(id: number): Observable<Book | undefined> {
    return of(this.books.find(book => book.id === id));
  }

  getFeaturedBooks(): Observable<Book[]> {
    return of(this.books.slice(0, 3));
  }

  getBookReviews(bookId: number): Observable<Review[]> {
    return of(this.reviews.filter(review => review.bookId === bookId));
  }

  addReview(review: Omit<Review, 'id' | 'date'>): Observable<Review> {
    const newReview: Review = {
      ...review,
      id: this.reviews.length + 1,
      date: new Date()
    };
    this.reviews.push(newReview);
    return of(newReview);
  }

  searchBooks(query: string): Observable<Book[]> {
    const filtered = this.books.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered);
  }
}