import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center space-x-1">
      <button
        *ngFor="let star of stars; let i = index"
        (click)="onStarClick(i + 1)"
        [disabled]="readonly"
        class="focus:outline-none"
        [class.cursor-pointer]="!readonly"
        [class.cursor-default]="readonly"
      >
        <svg
          class="w-5 h-5 transition-colors"
          [class.text-yellow-400]="i < rating"
          [class.text-gray-300]="i >= rating"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      </button>
      <span *ngIf="showRating" class="text-sm text-gray-600 ml-2">
        {{ rating.toFixed(1) }}
      </span>
    </div>
  `
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() readonly: boolean = true;
  @Input() showRating: boolean = true;
  @Output() ratingChange = new EventEmitter<number>();

  stars = Array(5).fill(0);

  onStarClick(rating: number): void {
    if (!this.readonly) {
      this.rating = rating;
      this.ratingChange.emit(rating);
    }
  }
}