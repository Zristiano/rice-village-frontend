import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {e} from '@angular/core/src/render3';
import {Url} from '../../Url';
import {Router} from '@angular/router';

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
    console.log("getPosts following->"+followings);
    const followingNum = followings.length+1;
    let followingReqCount = 0;
    this.articles = [];
    for (let i=0; i<followingNum; i++){
      let userId = "";
      if (i<followingNum-1){
        userId = "/"+followings[i].userId;
      }
      console.log("getPosts i->"+i);
      this.http.get(this.Url.Articles + userId,{withCredentials:true}).toPromise().then((value:any) => {
        console.log("value->"+JSON.stringify(value));
        followingReqCount++;
        if (value.errorCode===0){
          value.result.forEach(article=>{
            this.articles.push(article);
          });
          if (followingReqCount===followingNum){
            this.articles.sort((ele1,ele2)=>{
              if (!ele1.date){
                ele1.date = new Date(ele1.timeStamp);
              }
              if (!ele2.date) {
                ele2.date = new Date(ele2.timeStamp);
              }
              return ele2.timeStamp-ele1.timeStamp;
            });
            this.articleObserver(this.articles);
          }
        }
      }).catch(reason => {
        if (reason.status==401){
          this.router.navigate(['../']);
        }
      });
    }
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


  addContent(content):Promise<any>{
    return this.http.post(this.Url.Article,{text:content},{withCredentials:true}).toPromise().then((result:any)=>{
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
}
