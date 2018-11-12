import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MainService} from './main.service';
import {main} from '@angular/compiler-cli/src/main';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private mainService : MainService, private route:Router) { }

  ngOnInit() {
    // this.mainService.getUserProfile(result=>{
    //   console.log("profile->"+JSON.stringify(result))
    // })
  }


  logout(){
    this.mainService.logout();
    // this.route.navigate(['../'])
  }
}
