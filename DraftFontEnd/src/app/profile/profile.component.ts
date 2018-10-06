import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProfileService} from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profile;

  constructor(private profileService:ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile((data)=>this.profile = data);
  }

  update(form:NgForm){
    if (form.value.account.length!=0){
      this.profile.accountName = form.value.account;
    }
    if (form.value.email.length!=0){
      this.profile.emailAddr = form.value.email;
    }
    if (form.value.phone.length!=0){
      this.profile.phoneNum = form.value.phone;
    }
    if (form.value.zipcode.length!=0){
      this.profile.zipCod = form.value.zipcode;
    }
  }



}
