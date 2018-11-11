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
    this.profileService.getProfile().then(result=>{
      if (result.errorCode===0){
        const birthday = new Date(result.result.dob);
        result.result.birthday = `${birthday.getMonth()+1}/${birthday.getDay()}/${birthday.getFullYear()}`;
        this.profile = result.result;
      }
    });
  }

  update(form:NgForm){
    if(form.value.email||form.value.phone||form.value.zipcode){
      this.profileService.updateProfile(form.value.email,form.value.phone,form.value.zipcode).then(result=>{
        if (result.errorCode===0){
          const birthday = new Date(result.result.dob);
          result.result.birthday = `${birthday.getMonth()+1}/${birthday.getDay()}/${birthday.getFullYear()}`;
          this.profile = result.result;
          form.value.email ='';
          form.value.phone ='';
          form.value.zipcode ='';
        }
      });
    }
    if (form.value.psw || form.value.psw===form.value.confirmpsw) {
      this.profileService.updatePassword(form.value.psw).then(result=>{
        form.value.psw ='';
        form.value.confirmpsw ='';
      });
    }

  }



}
