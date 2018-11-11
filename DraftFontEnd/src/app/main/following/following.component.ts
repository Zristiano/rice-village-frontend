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

  constructor(private followingService:FollowingService, private postsService:PostsService) { }

  ngOnInit() {
    this.followFail = false;
    this.followingService.getFollowers().then((resp:any)=>{
      if (resp.errorCode===0){
        this.followers = resp.result;
        this.postsService.setFollowers(this.followers);
      }
    });
  }


  follow(newUser:string){
    this.followingService.follow(newUser).then((res:any)=>{
      if (res.errorCode!=0){
        this.showAddUserErrorMsg(res.message);
        return;
      }
      this.followers = res.result.following;
      this.postsService.setFollowers(this.followers);
    });
  }

  private showAddUserErrorMsg(msg:string ){
    clearTimeout(this.timeoutId);
    this.followFail = true;
    this.warningMsg = msg;
    this.timeoutId = setTimeout(()=>this.followFail= false,3000);
  }

  unFollow(id:number){
    this.followingService.unFollow(id).then((res:any)=>{
      if (res.errorCode===0){
        this.followers = res.result.following;
        this.postsService.setFollowers(this.followers);
      }
    });
  }
}
