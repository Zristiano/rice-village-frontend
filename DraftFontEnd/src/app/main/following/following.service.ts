import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router';
import {Url} from '../../Url';
@Injectable({
  providedIn: 'root'
})
export class FollowingService {

  constructor(private http:HttpClient, private route:Router, private url:Url) {
  }

  getFollowers():Promise<any>{
    return this.http.get(this.url.Following,{withCredentials:true}).toPromise().then((result:any)=>{
      if (result.errorCode==0){
        return Promise.resolve(result);
      }
      return Promise.resolve({"errorCode":2});}
    ).catch(reason => {
      if (reason.status==401){
        this.route.navigate(['../']);
        return Promise.resolve({"errorCode":100,"message":"fail"})
      }
    });
    }


  public follow(accountName:string):Promise<any>{
    return this.http.put(this.url.Following+`/${accountName}`,null,{withCredentials:true}).toPromise().then((result:any)=>{
      return Promise.resolve(result);
    }).catch(reason => {
      if (reason.status==401){
        this.route.navigate(['../']);
        return Promise.resolve({"errorCode":100,"message":"fail"})
      }
    });
  }

  public unFollow(userId:number):Promise<any>{
    return this.http.delete(this.url.Following+`/${userId}`,{withCredentials:true}).toPromise().then((result:any)=>{
      return Promise.resolve(result);
    }).catch(reason => {
      if (reason.status==401){
        this.route.navigate(['../']);
        return Promise.resolve({"errorCode":100,"message":"fail"})
      }
    });
  }

}
