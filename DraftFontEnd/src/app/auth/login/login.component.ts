import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginStateFail : boolean;
  public loginStateSuc : boolean;
  public errorMsg:string;

  constructor(private router:Router, private loginService:LoginService) { }

  ngOnInit() {
    this.loginStateFail = false;
    this.loginStateSuc = false;
  }

  login(form:NgForm){
    // this.loginStateSuc = true;
    let promise =  this.loginService.doLogin(form.value.username,form.value.password);
    return promise.then((data:any)=>{
      if (data.errorCode===0){
        this.loginStateFail = false;
        this.loginStateSuc = true;
        this.router.navigate(['../main']);
        return Promise.resolve(data);
      } else {
        this.loginStateFail = true;
        this.errorMsg = data.message;
        setTimeout(()=>this.loginStateFail =false,3000);
        return Promise.resolve(data);
      }
    });
  }

  loginWithFacebook(){
    this.loginService.loginWithFacebook();
  }

  logout():Promise<any>{
    return this.loginService.logout();
  }
}
