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
    this.user = this.headlineService.getLoggedUserInfo();
  }

  updateStatus(newStatus:string){
    if (newStatus.trim().length!=0){
      this.user = this.headlineService.updateUserStatus(newStatus);
    }
  }

}
