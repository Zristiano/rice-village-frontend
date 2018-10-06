import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  getProfile(callback){
    this.http.get("assets/profile.json").subscribe(data=>{callback(data)});
  }
}
