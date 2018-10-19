import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class FollowingService {

  private followers;
  private users;
  constructor(private http:HttpClient) {
  }

  getFollowers(){
    return this.http.get("assets/followers.json").toPromise().then((followers:any)=>{
      let curUser = JSON.parse(localStorage.getItem("curUser"));
      let followingId = [];
      for (let i=0; i<followers.length;i++){
        if (followers[i].id===curUser.id){
          followingId = followers[i].following;
          return Promise.resolve({"errorCode":0,"followingId":followingId});
        }
      }
      return Promise.resolve({"errorCode":1});
    }).then((res:any)=>{
      return this.http.get("assets/profile.json").toPromise().then((users:any)=>{
        let followingUsers = [];
        this.users = users;
        if (res.errorCode===0){
          for (let i=0; i<users.length; i++){
            for (let j=0; j<res.followingId.length; j++){
              if (users[i].id === res.followingId[j].id){
                followingUsers[followingUsers.length]= users[i];
              }
            }
          }
          this.followers = followingUsers;
          return Promise.resolve({"errorCode":0, "followingUsers":followingUsers})
        }
        return Promise.resolve({"errorCode":2})
      })
    });
  }

  public follow(accountName:string):any{
    let result = {
      "errorCode":1,
      "errorMsg": "non-existent user",
      "followingUsers":this.followers
    };
    for (let user of this.users){
      if (user.accountName === accountName) {
        this.followers[this.followers.length] = user;
        result.errorCode = 0;
        result.followingUsers = this.followers;
        result.errorMsg = "suc";
        break;
      }
    }
    return result;
  }

  public unFollow(userId:number):Array<any>{
    for (let i=0; i<this.followers.length; i++){
      if (this.followers[i].id===userId){
        this.followers.splice(i,1);
        break;
      }
    }
    return this.followers;
  }

}
