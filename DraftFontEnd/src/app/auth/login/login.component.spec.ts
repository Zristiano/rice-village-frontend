import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule, NgForm} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {LoginService} from './login.service';
import {RouterTestingModule} from '@angular/router/testing';
import {RegisterationComponent} from '../registeration/registeration.component';
import {Url} from '../../Url';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        LoginService,
        Url
      ],
      declarations: [LoginComponent,RegisterationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('login as test user', function () {
    let form = <NgForm>{
      value: {
        username: 'Zristiano',
        password: '1234'
      }
    };
    component.login(form).then((data: any) => {
      console.log("test component->"+JSON.stringify(data));
      expect(data.errorCode).toBe(0);
    });
  });


  it('logout as test user', function () {
    setTimeout(()=>{
      component.logout().then((data: any) => {
        expect(data.errorCode).toBe(0);
      });
    },1000);
  });

  //
  // it('should log out a user (login state should be cleared)', function () {
  //   let form = <NgForm>{
  //     value: {
  //       netId:'yz143',
  //       psw:'yz143yz143'
  //     }
  //   };
  //   component.login(form).then((data: any) => {
  //     expect(data.errorCode).toBe(0);
  //     component.logout();
  //     let userProfile = localStorage.getItem("curUser");
  //     expect(userProfile).not.toBe("null");
  //   }).catch((error)=>{console.log("error->"+error)});
  // });
  //
  //
  //
  // it('should not log in an invalid user', () => {
  //   component.logout();
  //   let form = <NgForm>{
  //     value: {
  //       netId:'123',
  //       psw:'12222'
  //     }
  //   };
  //   component.login(form).then((data: any) => {
  //     expect(data.errorCode!=0).toBeTruthy();
  //   }).catch((error)=>{console.log("error->"+error)});
  // });
  //
  // it('should update error message (for displaying login error mesage to user)', function () {
  //   setTimeout(function () {
  //     let form = <NgForm>{
  //       value: {
  //         netId:'yz1',
  //         psw:'yz143yz143'
  //       }
  //     };
  //     let failDivBefore = document.getElementById('loginFailMsg');
  //     expect(failDivBefore).toBe(null);
  //     component.login(form).then((data: any) => {
  //       let failDiv = document.getElementById('loginFailMsg');
  //       expect(failDiv).not.toBe(null);
  //     }).catch((error)=>{console.log("error->"+error)});
  //   },3000);
  // });
  //
  // it('should log in a previously registered user (not new users)\n', () => {
  //   let form = <NgForm>{
  //     value: {
  //       netId:'yz143',
  //       psw:'yz143yz143'
  //     }
  //   };
  //   component.login(form).then((data: any) => {
  //     expect(data.errorCode).toBe(0);
  //   }).catch((error)=>{console.log("error->"+error)});
  // });
  //
  // it('should update success message (for displaying login success message to user)', function () {
  //   setTimeout(function () {
  //     let form = <NgForm>{
  //       value: {
  //         netId:'yz143',
  //         psw:'yz143yz143'
  //       }
  //     };
  //     let sucDivBefore = document.getElementById('loginSucMsg');
  //     expect(sucDivBefore).toBe(null);
  //     component.login(form).then((data: any) => {
  //       let sucDiv = document.getElementById('loginSucMsg');
  //       expect(sucDiv!=null).toBeTruthy();
  //     }).catch((error)=>{console.log("error->"+error)});
  //   },4000);
  // });
});
