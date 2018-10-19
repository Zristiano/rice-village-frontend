import { Component, OnInit } from '@angular/core';
import {FollowingService} from './following.service';
import {PostsService} from '../posts/posts.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  public followers:Array<any>;

  public followFail:boolean;

  public warningMsg:string;

  private timeoutId;

  constructor(private followinService:FollowingService, private postsService:PostsService) { }

  ngOnInit() {
    this.followFail = false;
    this.followinService.getFollowers().then((resp:any)=>{
      if (resp.errorCode===0){
        this.followers = resp.followingUsers;
        this.postsService.setFollowers(this.followers);
      }
    });
  }


  follow(newUser:string){
    let curUser = JSON.parse(localStorage.getItem("curUser"));
    if (curUser.accountName === newUser){
      this.showAddUserErrorMsg("You cannot follow yourself");
      return;
    }
    for (let follower of this.followers){
      if (follower.accountName===newUser){
        this.showAddUserErrorMsg("You have already followed the user");
        return;
      }
    }

    let resp =  this.followinService.follow(newUser);
    if (resp.errorCode===0){
      this.followers = resp.followingUsers;
      this.postsService.setFollowers(this.followers);
    } else {
      this.showAddUserErrorMsg(resp.errorMsg);
    }
  }

  private showAddUserErrorMsg(msg:string ){
    clearTimeout(this.timeoutId);
    this.followFail = true;
    this.warningMsg = msg;
    this.timeoutId = setTimeout(()=>this.followFail= false,3000);
  }

  unFollow(id:number){
    this.followers = this.followinService.unFollow(id);
    this.postsService.setFollowers(this.followers);
  }
}
