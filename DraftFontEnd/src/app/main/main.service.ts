import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  public getUserProfile(callback){
    this.http.get('http://localhost:13240/profile',{withCredentials:true}).toPromise().then((res:any)=>{
      callback(res);
    })
  }
}
