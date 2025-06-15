import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClubService } from '../../services/club.service';
import { Club, ClubEvent, Discussion } from '../../models/club.model';

@Component({
  selector: 'app-club-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" *ngIf="club">
      <!-- Back Button -->
      <div class="mb-6">
        <a routerLink="/clubs" class="inline-flex items-center text-primary-600 hover:text-primary-700">
          <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Clubs
        </a>
      </div>

      <!-- Club Header -->
      <div class="card mb-8">
        <div class="flex items-start justify-between">
          <div class="flex items-start space-x-4">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ club.name }}</h1>
              <p class="text-sm text-gray-500 mb-2">{{ club.genre }}</p>
              <p class="text-gray-700 mb-4">{{ club.description }}</p>
              <div class="flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
                {{ club.memberCount }} members
              </div>
            </div>
          </div>
          <button 
            (click)="toggleMembership()"
            [class.btn-primary]="!club.isJoined"
            [class.btn-secondary]="club.isJoined"
            class="flex-shrink-0">
            {{ club.isJoined ? 'Leave Club' : 'Join Club' }}
          </button>
        </div>
      </div>

      <!-- Upcoming Events -->
      <div class="card mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
        
        <div *ngIf="events.length === 0" class="text-center py-8 text-gray-500">
          No upcoming events scheduled.
        </div>
        
        <div class="space-y-4" *ngIf="events.length > 0">
          <div *ngFor="let event of events" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-medium text-gray-900 mb-1">{{ event.title }}</h3>
                <p class="text-sm text-gray-600 mb-2">{{ event.description }}</p>
                <div class="flex items-center text-sm text-gray-500">
                  <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  {{ event.date | date:'medium' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Discussion Section -->
      <div class="card">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Discussion</h2>
        
        <!-- Add Discussion -->
        <div class="mb-6 p-4 bg-gray-50 rounded-lg">
          <div class="flex space-x-3">
            <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-primary-600 font-medium text-sm">B</span>
            </div>
            <div class="flex-1">
              <textarea
                [(ngModel)]="newMessage"
                rows="3"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="Share your thoughts with the club...">
              </textarea>
              <div class="mt-2 flex justify-end">
                <button 
                  (click)="addDiscussion()"
                  [disabled]="!newMessage.trim()"
                  class="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  Post Message
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Discussion Messages -->
        <div *ngIf="discussions.length === 0" class="text-center py-8 text-gray-500">
          No discussions yet. Start the conversation!
        </div>
        
        <div class="space-y-4" *ngIf="discussions.length > 0">
          <div *ngFor="let discussion of discussions" class="flex space-x-3">
            <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-primary-600 font-medium text-sm">
                {{ discussion.username.charAt(0).toUpperCase() }}
              </span>
            </div>
            <div class="flex-1">
              <div class="flex items-center space-x-2 mb-1">
                <span class="font-medium text-gray-900">{{ discussion.username }}</span>
                <span class="text-sm text-gray-500">{{ discussion.date | date:'short' }}</span>
              </div>
              <p class="text-gray-700">{{ discussion.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ClubDetailComponent implements OnInit {
  club: Club | null = null;
  events: ClubEvent[] = [];
  discussions: Discussion[] = [];
  newMessage = '';

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService
  ) {}

  ngOnInit(): void {
    const clubId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.clubService.getClub(clubId).subscribe(club => {
      this.club = club || null;
    });

    this.clubService.getClubEvents(clubId).subscribe(events => {
      this.events = events;
    });

    this.clubService.getClubDiscussions(clubId).subscribe(discussions => {
      this.discussions = discussions;
    });
  }

  toggleMembership(): void {
    if (this.club) {
      this.clubService.toggleClubMembership(this.club.id).subscribe(isJoined => {
        if (this.club) {
          this.club.isJoined = isJoined;
        }
      });
    }
  }

  addDiscussion(): void {
    if (this.club && this.newMessage.trim()) {
      this.clubService.addDiscussion(this.club.id, this.newMessage, 'bookworm23').subscribe(discussion => {
        this.discussions.unshift(discussion);
        this.newMessage = '';
      });
    }
  }
}