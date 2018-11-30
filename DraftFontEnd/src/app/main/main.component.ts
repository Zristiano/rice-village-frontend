import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MainService} from './main.service';
import {main} from '@angular/compiler-cli/src/main';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private mainService : MainService, private route:Router, private cookieService:CookieService) { }

  ngOnInit() {
    const prevUserId = localStorage.getItem("userId");
    if (!prevUserId || prevUserId==null){
      localStorage.setItem("userId",this.cookieService.get("userId"))
      localStorage.setItem("userType",this.cookieService.get("userType"));
    }
  }


  logout(){
    this.mainService.logout();
    // this.route.navigate(['../'])
  }
}
