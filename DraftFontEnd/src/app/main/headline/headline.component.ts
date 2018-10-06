import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {

  public status;

  constructor() {
  }

  ngOnInit() {
    this.status = 'hello, world!';
  }

  updateStatus(newStatus){
    if (newStatus.trim().length!=0){
      this.status = newStatus;
    }
  }

}
