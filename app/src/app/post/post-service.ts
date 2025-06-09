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

  findPost(id: number): Observable<Post> {
    return this.http.get<Post>(`/posts/${id}`);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`/posts/${post.id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`/posts/${id}`);
  }
}
