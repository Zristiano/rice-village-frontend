import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {e} from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private articles;

  constructor(private http:HttpClient) { }

  getPosts(callback){
    this.http.get("assets/articles.json").subscribe((data)=>{
      callback(data);
      this.articles = data;
    });
  }


  filter(content){
    let filterArticles = [];
    this.articles.forEach((article)=>{
      if (article.author===content){
        filterArticles[filterArticles.length] = article;
      }else if (article.content.indexOf(content)>=0){
        filterArticles[filterArticles.length] = article;
      }
    });
    return filterArticles.length==0? this.articles:filterArticles;
  }


  addContent(content){
    let newArticle = {
      "author":"Zristiano",
      "date":new Date(),
      "image":"",
      "content":content
    };
    this.articles.splice(0,0,newArticle);
    return this.articles;
  }
}
