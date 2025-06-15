import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: User = {
    id: 1,
    username: 'bookworm23',
    email: 'bookworm23@example.com',
    borrowedBooks: [2, 6],
    joinedClubs: [1, 3]
  };

  getCurrentUser(): Observable<User> {
    return of(this.currentUser);
  }

  borrowBook(bookId: number): Observable<boolean> {
    if (!this.currentUser.borrowedBooks.includes(bookId)) {
      this.currentUser.borrowedBooks.push(bookId);
    }
    return of(true);
  }
}