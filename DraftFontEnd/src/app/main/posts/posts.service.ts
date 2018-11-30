import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {e} from '@angular/core/src/render3';
import {Url} from '../../Url';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {text} from '@angular/core/src/render3/instructions';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private articles : Array<any>;

  private followers;

  private articleObserver;

  constructor(private http:HttpClient, private Url:Url, private router:Router) {
    this.articles  = [];
  }

  getPosts(followings:Array<any>){
    this.articles = [];
    let userIds:string = localStorage.getItem("userId")+",";
    followings.forEach(following=>{
      userIds+=following.userId+","
    });

    userIds = userIds.substring(0,userIds.length-1);
    this.http.get(this.Url.Articles +"/"+ userIds,{withCredentials:true}).toPromise().then((value:any) => {
      if (value.errorCode===0){
        value.result.forEach(article=>{
          article.date = new Date(article.timeStamp);
          this.articles.push(article);
        });
        this.articleObserver(this.articles);
      }
    }).catch(reason => {
      if (reason.status==401){
        this.router.navigate(['../']);
      }
    });
  }


  filter(content){
    let filterArticles = [];
    this.articles.forEach((article)=>{
      if (article.author.username===content){
        filterArticles[filterArticles.length] = article;
      }else if (article.content.indexOf(content)>=0){
        filterArticles[filterArticles.length] = article;
      }
    });
    return filterArticles.length==0? this.articles:filterArticles;
  }

  public setFollowers(followers:Array<any>){
    this.followers = followers;
    return this.getPosts(followers)
  }


  addPost(content, imageFile):Promise<any>{
    const formData = new FormData();
    formData.append("image",imageFile);
    formData.append("text",content);
    return this.http.post(this.Url.Article,formData,{withCredentials:true}).toPromise().then((result:any)=>{
      if (result.errorCode===0){
        result.result.date = new Date(result.result.timeStamp);
        this.articles.splice(0,0,result.result);
        this.articleObserver(this.articles);
      }
      return Promise.resolve(result);
    }).catch(reason => {
      if (reason.status==401){
        this.router.navigate(['../']);
      }
      return Promise.resolve({errorCode:1,message:"fail"});
    });
  }

  setArticlesCallBack(observer){
    this.articleObserver = observer;
  }

  updatePost(articleId:number,newContent:string):Promise<any>{
    const promise = this.http.put(this.Url.Articles+"/"+articleId,{text:newContent},{withCredentials:true}).toPromise();
    return this.updateCertainArticle(promise);
  }

  sendComment(articleId:number, content:string){
    const promise = this.http.put(this.Url.Articles+"/"+articleId,{text:content,commentId:-1},{withCredentials:true}).toPromise();
    return this.updateCertainArticle(promise);
  }

  updateComment(articleId:number, commentId:number, newContent:string){
    const promise = this.http.put(this.Url.Articles+"/"+articleId,{text:newContent,commentId:commentId},{withCredentials:true}).toPromise();
    return this.updateCertainArticle(promise);
  }

  private updateCertainArticle(promise:Promise<any>):Promise<any>{
    return promise.then((result:any)=>{
      if (result.errorCode===0){
        result.result[0].date = new Date(result.result[0].timeStamp);
        for (let i=0; i<this.articles.length; i++){
          if (this.articles[i].articleId===result.result[0].articleId){
            this.articles[i] = result.result[0];
            break;
          }
        }
      }
      return result;
    }).catch(reason => {
      if (reason.status==401){
        this.router.navigate(['../']);
      }
      return Promise.resolve({errorCode:1,message:"fail"});
    });
  }
}
