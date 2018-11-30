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
      // console.log("http login catch :"+JSON.stringify(reason));
      return Promise.resolve(result);
    });
  }

  public logout():Promise<any>{
    return this.http.put(this.url.Logout,null,{withCredentials:true}).toPromise().then(res=>{
      return Promise.resolve(res);
    }).catch(reason => {
      if (reason.status===401){
        localStorage.removeItem("userId");
        return Promise.resolve({errorCode:0,message:"success"});
      }
      return Promise.resolve({errorCode:1,message:"server error"});
    });
  }

  public loginWithFacebook(){
    window.location.href = this.url.FacebookLogin
    // this.http.get(this.url.FacebookLogin,{withCredentials:true}).toPromise().then((result:any)=>{
    //   console.log(result);
    // });
  }
}
