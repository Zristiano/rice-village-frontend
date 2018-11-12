import { TestBed } from '@angular/core/testing';

import {RegisterationService } from './registeration.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {RegisterationComponent} from './registeration.component';
import {Url} from '../../Url';
import {LoginService} from '../login/login.service';

describe('RegisterationService', () => {

  let service:RegisterationService;
  let loginService:LoginService;
  let newUsername;
  let newPassword;

  beforeEach(() =>{ TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterModule,
        RouterTestingModule,
        FormsModule,
      ],
      providers: [
        RegisterationService,
        Url
      ],
      declarations: [RegisterationComponent]
    });
    service = TestBed.get(RegisterationService);
    loginService = TestBed.get(LoginService);
    // when test this module, please change the value of newUsername
    newUsername = "Zristiano7";
    newPassword = "1234";
    }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a new user', function () {
    //username field,email field,zipCode field,dob field,phone field and password field
    service.register({username:newUsername,email:"233434@Qwe.com",zipCode:"34567",dob:Date.now(),phone:"456-789-4567",password:newPassword}).then(value => {
      expect(value.errorCode).toBe(0);
    });
  });

  it('login as new user', function () {
    setTimeout(()=>{
      loginService.doLogin(newUsername,newPassword).then(result=>{
        expect(result.errorCode).toBe(0);
      })
    },1000);
  });

  it('logout new user', function () {
    setTimeout(()=>{loginService.logout().then(result=>{
      expect(result.errorCode).toBe(0);
    })},1500);
  });

});
