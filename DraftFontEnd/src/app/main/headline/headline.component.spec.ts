import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadlineComponent } from './headline.component';
import {RegisterationService} from '../../auth/registeration/registeration.service';
import {LoginService} from '../../auth/login/login.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Url} from '../../Url';
import {HeadlineService} from './headline.service';

describe('HeadlineComponent', () => {
  let component: HeadlineComponent;
  let fixture: ComponentFixture<HeadlineComponent>;
  let service:LoginService;
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
        HeadlineService,
        Url
      ],
      declarations: [ HeadlineComponent ]
    }).compileComponents();
    service = TestBed.get(LoginService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('Update headline headline and verify change', () => {
    service.doLogin("Zristiano","1234").then(result=>{
      expect(result.errorCode).toBe(0);
      const newStatue = "update status: "+Date.now();
      component.updateStatus(newStatue).then((result:any)=>{
        expect(result.errorCode).toBe(0);
        expect(result.result.headline).toBe(newStatue);
      })
    })
  });

});
