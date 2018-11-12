import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Url} from '../../Url';

@Injectable({
  providedIn: 'root'
})
export class HeadlineService {

  constructor(private http: HttpClient, private router:Router, private Url:Url) { }


  public getUserProfile():Promise<any>{
    return this.http.get(this.Url.Profile,{withCredentials:true}).toPromise().then((res:any)=>{
      if (res.errorCode===0){
        return Promise.resolve(res.result);
      } else{
        return Promise.resolve( {username:'ERROR',avatar:"http://www.ejdyin.com/data/img/article/2016081514365489415955.jpg",headline:"ERROR"});
      }
    }).catch(reason => {
      if (reason.status==401){
        this.router.navigate(['../']);
      }
      return Promise.resolve( {username:'ERROR',avatar:"http://www.ejdyin.com/data/img/article/2016081514365489415955.jpg",headline:"ERROR"});
    })
  }

  updateUserStatus(newStatus: string):Promise<any>{
    return this.http.put(this.Url.Headline,{headline:newStatus},{withCredentials:true}).toPromise().then((res:any)=>{
      return Promise.resolve(res);
    }).catch(reason => {
      if (reason.status==401){
        this.router.navigate(['../']);
      }
      return Promise.resolve({errorCode:100,message:"Server Error"});
    });
  }
}
