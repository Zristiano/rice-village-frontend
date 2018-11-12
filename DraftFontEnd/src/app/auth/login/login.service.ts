import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Url} from '../../Url';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private url:Url) { }

  doLogin(netId:string,psw:string){

    return this.http.post(this.url.Login,{'username':netId,'password':psw},{withCredentials:true}).toPromise().then((result:any) => {
      return Promise.resolve(result);
    }).catch((reason:any)=>{
      let result = {"errorCode":100, "message":"request fail"};
      console.log("http login catch :"+JSON.stringify(reason));
      return Promise.resolve(result);
    });

    /**
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
  */
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
