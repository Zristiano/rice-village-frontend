import { Component, OnInit } from '@angular/core';
import {HeadlineService} from './headline.service';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {

  public user:any;

  constructor(private headlineService: HeadlineService) {
  }

  ngOnInit() {
    this.headlineService.getUserProfile().then((res:any)=>{
      this.user = res;
    });
  }

  updateStatus(newStatus:string){
    if (newStatus.trim().length!=0){
      this.headlineService.updateUserStatus(newStatus).then((res:any)=>{
        if (res.errorCode===0){
          this.user.headline = res.result.headline;
        }
      });
    }
  }

}
