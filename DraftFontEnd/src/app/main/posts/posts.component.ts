import { Component, OnInit } from '@angular/core';
import {PostsService} from './posts.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public articles=[];
  public showComments = [];
  public showEditArticles = [];
  public showEditComments = [];
  public edittingComment = [];
  public keyWord:string;
  public selectedFileName:string;
  public selectedFile:File;
  private curUserId:number;


  constructor(private postService:PostsService) {}

  ngOnInit() {
    this.postService.setArticlesCallBack((articles)=>{
      this.articles = articles;
      this.initExpandlayout(this.articles.length);
    });
  }

  onFileSelected(event){
    this.selectedFileName = event.target.files[0].name;
    this.selectedFile = event.target.files[0];
  }

  search(content){
    this.articles = this.postService.filter(content);
    this.initExpandlayout(this.articles.length);
    this.keyWord = content;
  }

  clearPostContent(){
    this.selectedFile = null;
    this.selectedFileName = "";
    return "";
  }

  addPost(content){
    if (content.trim().length===0){
      return;
    }
    const imageFiel = this.selectedFile;
    this.clearPostContent();
    return this.postService.addPost(content,imageFiel);
  }

  updatePost(articleId:number,newContent:string){
    this.postService.updatePost(articleId, newContent).then(result=>{
      for (let i=0; i<this.articles.length; i++){
        if (this.articles[i].articleId===articleId){
          this.showEditArticles[i] = false;
          break;
        }
      }
    });
  }

  private initExpandlayout(len:number){
    this.showComments = [];
    this.showEditArticles = [];
    this.showEditComments = [];
    this.edittingComment = [];
    for (let i=0; i<len;i++){
      this.showComments.push(false);
      this.showEditArticles.push(false);
      this.showEditComments.push(false);
      this.edittingComment.push("");
    }
  }

  showHideComments(idx:number){
    this.showComments[idx] = !this.showComments[idx];
  }

  editArticle(idx:number, newContent: string){
    // if ()
  }

  showEditArticle(idx:number){
    if (this.articles[idx].author.userId!=localStorage.getItem("userId")){
      return;
    }
    this.showEditArticles[idx] = !this.showEditArticles[idx];
  }

  public getCurUserId(){
    if (!this.curUserId){
      this.curUserId = parseInt(localStorage.getItem('userId'));
    }
    return this.curUserId;
  }

  sendComment(articleId:number, content:string){
    if (!content || content.trim().length===0){
      return "";
    }
    this.postService.sendComment(articleId, content);
    return "";
  }

  editComment(articleIdx:number,comment:any){
    this.showEditComments[articleIdx] = true;
    this.edittingComment[articleIdx] = comment;
  }

  closeEditComment(articleIdx:number){
    this.showEditComments[articleIdx] = false;
    this.edittingComment[articleIdx] = null;
  }

  updateComment(newContent:string, articleIdx:number){
    if (this.edittingComment[articleIdx]==null|| newContent.trim().length===0 || newContent===this.edittingComment[articleIdx].content){
      this.closeEditComment(articleIdx);
      return;
    }
    this.postService.updateComment(this.articles[articleIdx].articleId,this.edittingComment[articleIdx].commentId,newContent).then((result)=>{
      this.closeEditComment(articleIdx);
    });
  }
}
