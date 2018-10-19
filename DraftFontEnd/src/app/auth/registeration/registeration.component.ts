import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  public birthday;
  isRegisterSuc:boolean;
  constructor() { }

  ngOnInit() {
    this.isRegisterSuc = false;
  }

  isChild()
  {
    let birth = new Date(this.birthday).getTime();
    let today = new Date(Date.now()).getTime();
    let d = today-birth;
    return d<567993600000;
  }

  formSubmit(){
    this.isRegisterSuc = true;
    setTimeout(()=>this.isRegisterSuc = false,4000);
    // this.router.navigate(['../main']);
  }

  registerSuc(){
    return this.isRegisterSuc;
  }

  regSubmit(form:NgForm){
    // this.app.registerUser(form.value.account,form.value.email,form.value.phone,form.value.birthday,form.value.zipcode,form.value.password)
    // if(this.app.login(form.value.account,form.value.password)){
    //   this.router.navigate(['../main']);
    // }
  }


}
