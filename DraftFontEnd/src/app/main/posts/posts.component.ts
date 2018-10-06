import { Component, OnInit } from '@angular/core';
import {PostsService} from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public articles;

  constructor(private postService:PostsService) { }

  ngOnInit() {
    this.postService.getPosts((posts)=>this.articles = posts)
  }

  search(content){
    this.articles = this.postService.filter(content)
  }

  addPost(content){
    if (content.trim().length===0){
      return;
    }
    this.articles = this.postService.addContent(content);
  }
}
