import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private user;

  constructor(private http:HttpClient) { }

  getProfile():any{

    this.user = JSON.parse(localStorage.getItem("curUser"));
    return this.user;
  }

  update(newName:string,newEmail:string,newPhone:string,newZip:string):any{
    if (newName.length!=0){
      this.user.accountName = newName;
    }
    if (newEmail.length!=0){
      this.user.emailAddr = newEmail;
    }
    if (newPhone.length!=0){
      this.user.phoneNum = newPhone;
    }
    if (newZip.length!=0){
      this.user.zipCod = newZip;
    }
    return this.user;
  }
}
