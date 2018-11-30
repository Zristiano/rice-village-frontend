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
  public selectedFileName:string;
  public selectedFile:File;
  public showErrorMsg:boolean = false;

  public errorMessage :string = '';

  constructor(private profileService:ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile().then(result=>{
      if (result.errorCode===0){
        this.setProfile(result.result);
      }
    });
  }

  private setProfile(initProfile){
    const birthday = new Date(initProfile.dob);
    initProfile.birthday = `${birthday.getMonth()+1}/${birthday.getDay()}/${birthday.getFullYear()}`;
    this.profile = initProfile;
  }

  update(form:NgForm){
    if(form.value.email||form.value.phone||form.value.zipcode){
      this.profileService.updateProfile(form.value.email,form.value.phone,form.value.zipcode).then(result=>{
        if (result.errorCode===0){
          this.setProfile(result.result);
        }
      });
    }
    if (form.value.psw || form.value.psw===form.value.confirmpsw) {
      this.profileService.updatePassword(form.value.psw).then(result=>{
      });
    }
  }

  onFileSelected(event){
    this.selectedFileName = event.target.files[0].name;
    this.selectedFile = event.target.files[0];
  }

  updataAvator(){
    this.profileService.updateAvatar(this.selectedFile).then((result:any)=>{
      if (result.errorCode===0){
        this.profile.avatar = result.result.avatar;
      }
      this.selectedFile = null;
      this.selectedFileName = "";
    });
  }

  linkFacebook(){
    this.profileService.linkFacebook();
  }

  unLinkFacebook(){
    this.profileService.unlinkFacebook().then((result:any)=>{
      if (result.errorCode===0){
        this.setProfile(result.result);
      }
    });
  }

  linkAccount(username:string, password:string){
    if (!username||!password||username.trim().length===0 || password.trim().length===0){
      return;
    }
    this.profileService.linkAccount(username,password).then((result:any)=>{
      if (result.errorCode!=0){
        this.errorMessage = result.message;
        this.showErrorMsg = true;
        setTimeout(()=>this.showErrorMsg =false,3000);
      }
    });
  }

  isNormalUser(){
    // return true;
    const userType = localStorage.getItem("userType");
    return !userType || userType==='normal';
  }


}
