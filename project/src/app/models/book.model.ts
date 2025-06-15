export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  genre: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  coverUrl?: string;
}

export interface Review {
  id: number;
  bookId: number;
  username: string;
  rating: number;
  comment: string;
  date: Date;
}