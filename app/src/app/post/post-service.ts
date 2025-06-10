import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Post } from './post'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('/posts');
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>('/posts', post);
  }

  findPost(id: string): Observable<Post> {
    return this.http.get<Post>(`/posts/${id}`);
  }

  updatePost(id: string, data: Post): Observable<Post> {
    return this.http.put<Post>(`/posts/${data.id}`, data);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`/posts/${id}`);
  }
}
