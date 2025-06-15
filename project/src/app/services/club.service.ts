import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Club, ClubEvent, Discussion } from '../models/club.model';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private clubs: Club[] = [
    {
      id: 1,
      name: 'Classic Literature Society',
      description: 'Exploring timeless works of literature and their impact on modern society.',
      genre: 'Classic Literature',
      memberCount: 45,
      isJoined: true
    },
    {
      id: 2,
      name: 'Sci-Fi Explorers',
      description: 'Diving into the worlds of science fiction and speculative futures.',
      genre: 'Science Fiction',
      memberCount: 67,
      isJoined: false
    },
    {
      id: 3,
      name: 'Fantasy Realm',
      description: 'Journey through magical worlds and epic adventures.',
      genre: 'Fantasy',
      memberCount: 89,
      isJoined: true
    },
    {
      id: 4,
      name: 'Mystery & Thriller Club',
      description: 'Unraveling mysteries and discussing plot twists.',
      genre: 'Mystery',
      memberCount: 34,
      isJoined: false
    }
  ];

  private events: ClubEvent[] = [
    {
      id: 1,
      clubId: 1,
      title: 'Discussion: The Great Gatsby',
      date: new Date('2024-02-15'),
      description: 'Join us for an in-depth discussion of Fitzgerald\'s masterpiece.'
    },
    {
      id: 2,
      clubId: 3,
      title: 'Author Spotlight: Brandon Sanderson',
      date: new Date('2024-02-20'),
      description: 'Exploring the works and world-building of Brandon Sanderson.'
    }
  ];

  private discussions: Discussion[] = [
    {
      id: 1,
      clubId: 1,
      username: 'bookworm23',
      message: 'What did everyone think about the symbolism of the green light?',
      date: new Date('2024-01-25')
    },
    {
      id: 2,
      clubId: 1,
      username: 'literaturelover',
      message: 'I found it fascinating how Fitzgerald used it to represent hope and longing.',
      date: new Date('2024-01-25')
    },
    {
      id: 3,
      clubId: 3,
      username: 'fantasyfan',
      message: 'Has anyone read the new Stormlight Archive book yet?',
      date: new Date('2024-01-28')
    }
  ];

  getClubs(): Observable<Club[]> {
    return of(this.clubs);
  }

  getClub(id: number): Observable<Club | undefined> {
    return of(this.clubs.find(club => club.id === id));
  }

  getClubEvents(clubId: number): Observable<ClubEvent[]> {
    return of(this.events.filter(event => event.clubId === clubId));
  }

  getClubDiscussions(clubId: number): Observable<Discussion[]> {
    return of(this.discussions.filter(discussion => discussion.clubId === clubId));
  }

  toggleClubMembership(clubId: number): Observable<boolean> {
    const club = this.clubs.find(c => c.id === clubId);
    if (club) {
      club.isJoined = !club.isJoined;
      club.memberCount += club.isJoined ? 1 : -1;
    }
    return of(club?.isJoined || false);
  }

  addDiscussion(clubId: number, message: string, username: string): Observable<Discussion> {
    const newDiscussion: Discussion = {
      id: this.discussions.length + 1,
      clubId,
      username,
      message,
      date: new Date()
    };
    this.discussions.push(newDiscussion);
    return of(newDiscussion);
  }
}