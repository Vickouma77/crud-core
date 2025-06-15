import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">B</span>
              </div>
              <span class="text-xl font-bold text-gray-900">BookIT</span>
            </a>
          </div>
          
          <div class="hidden md:flex items-center space-x-8">
            <a routerLink="/" routerLinkActive="text-primary-600" [routerLinkActiveOptions]="{exact: true}" 
               class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </a>
            <a routerLink="/books" routerLinkActive="text-primary-600" 
               class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Books
            </a>
            <a routerLink="/clubs" routerLinkActive="text-primary-600" 
               class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Clubs
            </a>
            <a routerLink="/profile" routerLinkActive="text-primary-600" 
               class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              Profile
            </a>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button (click)="mobileMenuOpen = !mobileMenuOpen" 
                    class="text-gray-600 hover:text-gray-900 focus:outline-none">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div *ngIf="mobileMenuOpen" class="md:hidden bg-white border-t border-gray-200">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a routerLink="/" (click)="mobileMenuOpen = false" 
             class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900">
            Home
          </a>
          <a routerLink="/books" (click)="mobileMenuOpen = false" 
             class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900">
            Books
          </a>
          <a routerLink="/clubs" (click)="mobileMenuOpen = false" 
             class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900">
            Clubs
          </a>
          <a routerLink="/profile" (click)="mobileMenuOpen = false" 
             class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900">
            Profile
          </a>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  mobileMenuOpen = false;
}