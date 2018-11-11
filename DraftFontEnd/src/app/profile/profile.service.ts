import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Url} from '../Url';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private user;

  constructor(private http:HttpClient, private url:Url, private route:Router) { }

  getProfile():Promise<any>{
    return this.http.get(this.url.Profile,{withCredentials:true}).toPromise().then(result=>{
      return Promise.resolve(result);
    }).catch(reason => {
      if (reason.status==401){
        this.route.navigate(['../']);
        return Promise.resolve({"errorCode":100,"message":"fail"})
      }
    });
  }

  updateProfile( newEmail:string, newPhone:string, newZip:string):Promise<any>{
    return this.http.put(this.url.Profile,{email:newEmail,phone:newPhone,zipcode:newZip},{withCredentials:true}).toPromise().catch(reason => {
      if (reason.status==401){
        this.route.navigate(['../']);
        return Promise.resolve({"errorCode":100,"message":"fail"})
      }
    });
  }

  updatePassword(newPassword:string){
    return this.http.put(this.url.Password,{password:newPassword},{withCredentials:true}).toPromise().catch(reason => {
      if (reason.status==401){
        this.route.navigate(['../']);
        return Promise.resolve({"errorCode":100,"message":"fail"})
      }
    });
  }
}
