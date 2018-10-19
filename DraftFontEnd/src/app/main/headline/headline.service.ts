import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeadlineService {

  constructor() { }

  getLoggedUserInfo():any{
    return JSON.parse(localStorage.getItem("curUser"));
  }

  updateUserStatus(newStatus: string):any{
    let user = JSON.parse(localStorage.getItem("curUser"));
    user.status = newStatus;
    localStorage.setItem("curUser",JSON.stringify(user));
    return user;
  }
}
