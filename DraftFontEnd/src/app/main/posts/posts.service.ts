import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {e} from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private articles;

  private followers;

  private articleObserver;

  constructor(private http:HttpClient) {
    this.articles = [];
  }

  getPosts(){
    this.articles = [];
    let articleUserId = this.followers.concat();

    let curUser = JSON.parse(localStorage.getItem("curUser"));
    articleUserId.push({"id":curUser.id});
    return this.http.get("assets/articles.json").toPromise().then((userArticles:any)=>{
      for(let userArticle of userArticles){
        for (let id of articleUserId){
          if (id.id===userArticle.id){
            for (let article of userArticle.articles){
              this.articles.push(article);
            }
            break;
          }
        }
      }
      console.log("articles->"+JSON.stringify(this.articles));
      this.articleObserver(this.articles);
      return Promise.resolve({"errorCode":0,"articles":this.articles});
    });

    // return this.http.get("assets/followers.json").toPromise().then((followers:any)=>{
    //   let curUser = JSON.parse(localStorage.getItem("curUser"));
    //   let articleUserId = [];
    //   for (let i=0; i<followers.length;i++){
    //     if (followers[i].id===curUser.id){
    //       articleUserId = followers[i].following;
    //       articleUserId.push({"id":curUser.id});
    //       console.log("articleUserId->"+JSON.stringify(articleUserId))
    //       return Promise.resolve({"errorCode":0,"followingId":articleUserId});
    //     }
    //   }
    //   return Promise.resolve({"errorCode":1});
    // }).then((resp:any)=>{
    //   if (resp.errorCode===0){
    //     return this.http.get("assets/articles.json").toPromise().then((userArticles:any)=>{
    //       for(let userArticle of userArticles){
    //         console.log("userArticle.id->"+userArticle.id);
    //         for (let id of resp.followingId){
    //           console.log("followingId.id->"+id.id);
    //           if (id.id===userArticle.id){
    //             for (let article of userArticle.articles){
    //               console.log("articles number->"+this.articles.length);
    //               this.articles.push(article);
    //             }
    //             break;
    //           }
    //         }
    //       }
    //       return Promise.resolve({"errorCode":0,"articles":this.articles})
    //     });
    //   }
    //   return Promise.resolve(resp);
    // });
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

  public setFollowers(followers:Array<any>){
    this.followers = followers;
    return this.getPosts()
  }


  addContent(content){
    let curUser = JSON.parse(localStorage.getItem("curUser"));
    let newArticle = {
      "author":curUser.accountName,
      "date":new Date(),
      "image":"",
      "content":content
    };
    this.articles.splice(0,0,newArticle);
    return this.articles;
  }

  setArticlesCallBack(observer){
    this.articleObserver = observer;
  }
}
