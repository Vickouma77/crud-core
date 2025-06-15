export interface Club {
  id: number;
  name: string;
  description: string;
  genre: string;
  memberCount: number;
  isJoined: boolean;
}

export interface ClubEvent {
  id: number;
  clubId: number;
  title: string;
  date: Date;
  description: string;
}

export interface Discussion {
  id: number;
  clubId: number;
  username: string;
  message: string;
  date: Date;
}