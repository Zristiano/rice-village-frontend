import { Component, OnInit } from '@angular/core';
import {FollowingService} from './following.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  private newImg;

  public followers;

  constructor(private followinService:FollowingService) { }

  ngOnInit() {
    this.newImg="http://pic.qiantucdn.com/58pic/12/25/72/49i58PICNrv.jpg!qt324";
    this.followinService.getFollowers().subscribe(data=>{this.followers = data});
  }

  add(newUser){
    if (newUser.trim().length!=0){
      let index = this.followers.length;
      this.followers[index] = {
        "id":index,
        "name":newUser,
        "status":"I am "+ newUser,
        "avatar": this.newImg
      };
    }
  }

  unFollow(idx){
    this.followers.splice(idx,1);
  }
}
