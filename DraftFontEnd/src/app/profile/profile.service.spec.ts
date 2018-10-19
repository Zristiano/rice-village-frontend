import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { ProfileService } from './profile.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginComponent} from '../auth/login/login.component';
import {FormsModule, NgForm} from '@angular/forms';
import {LoginService} from '../auth/login/login.service';
import {RegisterationComponent} from '../auth/registeration/registeration.component';

describe('ProfileService', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [
  //       HttpClientModule,
  //       RouterModule,
  //       RouterTestingModule,
  //     ],
  //     providers: [
  //       PostsService
  //     ],
  //     declarations: [ PostsComponent,FollowingComponent]
  //   })
  //     .compileComponents();
  // }));

  beforeEach(() =>{ TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        LoginService
      ],
      declarations: [LoginComponent,RegisterationComponent]
  });
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  }
  );

  it('should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });

  it('should fetch the logged in user\'s profile information', function () {

    const service: ProfileService = TestBed.get(ProfileService);
    let form = <NgForm>{
      value: {
        netId: 'yz143',
        psw: 'yz143yz143'
      }
    };
    component.login(form).then((data: any) => {
      expect(data.errorCode).toBe(0);
      expect(service.getProfile().netId).toBe('yz143');
    });


  });
});
