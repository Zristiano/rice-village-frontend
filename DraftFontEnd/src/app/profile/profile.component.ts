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
    this.profile = this.profileService.getProfile();
  }

  update(form:NgForm){
    this.profile = this.profileService.update(form.value.account,form.value.email,form.value.phone,form.value.zipcode);
  }



}
