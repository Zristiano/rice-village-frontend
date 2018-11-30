import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Url} from '../Url';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient, private url:Url) { }

  public getUserState(){
    this.http.get(this.url.UserState ,{withCredentials:true}).toPromise().then((res:any)=>{
      localStorage.setItem('userId',res.result.userId);
      localStorage.setItem('userType',res.result.userType);
    })
  }

  public logout():Promise<any>{
    return this.http.put(this.url.Logout,null,{withCredentials:true}).toPromise().then(res=>{
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
      return Promise.resolve(res);
    }).catch(reason => {
      if (reason.status===401){
        return Promise.resolve({errorCode:0,message:"success"});
      }
      return Promise.resolve({errorCode:1,message:"server error"});
    });
  }
}
