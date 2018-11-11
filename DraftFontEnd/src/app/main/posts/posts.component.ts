import { Component, OnInit } from '@angular/core';
import {PostsService} from './posts.service';
import {e} from '@angular/core/src/render3';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public articles=[];
  public showComments = [];
  public keyWord:string;


  constructor(private postService:PostsService) {}

  ngOnInit() {
    this.postService.setArticlesCallBack((articles)=>{
      this.articles = articles;
      // console.log("articles->"+JSON.stringify(articles))
    });
  }

  search(content){
    this.articles = this.postService.filter(content);
    this.showComments = [];
    this.keyWord = content;
  }

  addPost(content){
    if (content.trim().length===0){
      return;
    }
    return this.postService.addContent(content);
  }

  showHideComments(idx:number){
    if (this.showComments[idx]){
      this.showComments[idx]=false;
    } else{
      this.showComments[idx]=true;
    }
  }
}
