import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {RegisterationService} from './registeration.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  public birthday;
  isRegisterSuc:boolean;
  isRegisterFail:boolean;
  registerFailMsg:string;
  constructor(private regService : RegisterationService) { }

  ngOnInit() {
    this.isRegisterSuc = false;
    this.isRegisterFail = false;
  }

  isChild()
  {

    let birth = new Date(this.birthday).getTime();
    let today = new Date(Date.now()).getTime();
    let d = today-birth;
    return d<567993600000;
  }

  registerSuc(){
    return this.isRegisterSuc;
  }

  registerFail(){
    return this.isRegisterFail;
  }

  regSubmit(form:NgForm){
    let birth = new Date(this.birthday).getTime();
    let registerUser = {
      username:form.value.account,
      email:form.value.email,
      phone:form.value.phone,
      dob:birth,
      zipCode:form.value.zipcode,
      password:form.value.psw
    };
    this.regService.register(registerUser).then((res:any)=>{
      if (res.errorCode===0){
        this.isRegisterSuc = true;
        setTimeout(()=>this.isRegisterSuc = false,4000);
      }else {
        this.registerFailMsg = res.message;
        this.isRegisterFail = true;
        setTimeout(()=>this.isRegisterFail = false,4000);
      }
    })
    // this.app.registerUser(form.value.account,form.value.email,form.value.phone,form.value.birthday,form.value.zipcode,form.value.password)
    // if(this.app.login(form.value.account,form.value.password)){
    //   this.router.navigate(['../main']);
    // }
  }


}
