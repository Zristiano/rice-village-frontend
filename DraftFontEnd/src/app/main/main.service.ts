import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Url} from '../Url';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient, private url:Url) { }

  public getUserProfile(callback){
    this.http.get('http://localhost:13240/profile',{withCredentials:true}).toPromise().then((res:any)=>{
      callback(res);
    })
  }

  public logout():Promise<any>{
    return this.http.put(this.url.Logout,null,{withCredentials:true}).toPromise().then(res=>{
      return Promise.resolve(res);
    }).catch(reason => {
      if (reason.status===401){
        return Promise.resolve({errorCode:0,message:"success"});
      }
      return Promise.resolve({errorCode:1,message:"server error"});
    });
  }
}
