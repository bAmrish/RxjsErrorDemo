import { Component, OnInit } from "@angular/core";
import { PostService } from "../services/post.service";
import { Post } from "../models/post.model";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(
      posts => {
        console.log("HTTP Data received!");
        this.posts = posts;
      },
      error => {
        console.log("HTTP Error Occoured!", error);
      },
      () => {
        console.log("HTTP Request Completed!");
      }
    );
  }
}
