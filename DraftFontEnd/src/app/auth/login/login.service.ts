import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  doLogin(netId:string,psw:string){
    return this.http.get("assets/profile.json").toPromise().then((users:any) => {
       for (let i=0; i<users.length; i++){
         if (users[i].netId===netId ){
           if (users[i].password===psw) {
             localStorage.clear();
             let userString = JSON.stringify(users[i]);
             localStorage.setItem("curUser",userString);
             return Promise.resolve({"errorCode":0});
           }
           return Promise.resolve({"errorCode":1, "errorMsg":"Incorrect Password"})
         }
       }
       return Promise.resolve({"errorCode":2,"errorMsg":"Non-existent User"});
    });
  }
}
