export interface User {
  id: number;
  username: string;
  email: string;
  borrowedBooks: number[];
  joinedClubs: number[];
}