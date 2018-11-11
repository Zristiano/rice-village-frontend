import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Url} from '../../Url';

@Injectable({
  providedIn: 'root'
})
export class RegisterationService {

  constructor(private http:HttpClient, private url:Url) { }

  register(regUser:any):Promise<any>{
    return this.http.post(this.url.Register,regUser).toPromise().then((res:any)=>{
      return　Promise.resolve(res)
    }).catch((reason:any)=>{
      return Promise.resolve({"errorCode":100, "message":"request fail"});
    });
  }

}
