import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../post-service';
import { Post } from '../post';

@Component({
  selector: 'app-show',
  imports: [RouterModule],
  templateUrl: './show.html',
  styleUrl: './show.css'
})
export class Show {
  id = '';
  title = '';
  body = '';

  constructor(private postService: PostService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.findPost(this.id).subscribe((post: Post) => {
        this.title = post.title;
        this.body = post.body;
    })
  }
}
