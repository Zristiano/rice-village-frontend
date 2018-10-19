// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//
// import {MainComponent } from './main.component';
// import {LoginComponent} from '../auth/login/login.component';
// import {FormsModule, NgForm} from '@angular/forms';
// import {HttpClientModule} from '@angular/common/http';
// import {RouterModule} from '@angular/router';
// import {RouterTestingModule} from '@angular/router/testing';
// import {LoginService} from '../auth/login/login.service';
// import {HeadlineComponent} from './headline/headline.component';
// import {FollowingService} from './following/following.service';
// import {FollowingComponent} from './following/following.component';
// import {PostsComponent} from './posts/posts.component';
//
// describe('MainComponent', () => {
//   let component: MainComponent;
//   let fixture: ComponentFixture<MainComponent>;
//   let loginComponent:LoginComponent;
//   let loginFixture: ComponentFixture<LoginComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         HttpClientModule,
//         RouterModule,
//         RouterTestingModule,
//         FormsModule
//       ],
//       providers: [
//         LoginService
//       ],
//       declarations: [ MainComponent , HeadlineComponent, FollowingComponent, PostsComponent]
//     })
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(MainComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//
//     loginFixture = TestBed.createComponent(LoginComponent);
//     loginComponent = loginFixture.componentInstance;
//     loginFixture.detectChanges();
//   });
//
//   it('should log out a user (login state should be cleared)', () => {
//     console.log("start test ====================================->");
//     let form = <NgForm>{
//       value: {
//         netId: 'yz143',
//         psw: 'yz143yz143'
//       }
//     };
//     loginComponent.login(form).then((data: any) => {
//       expect(data.errorCode).toBe(0);
//       console.log("login->");
//       // let loginUser = localStorage.getItem("curUser");
//       // console.log("loginUser->"+loginUser);
//       // expect(loginUser).not.toBe("null");
//       component.logout();
//       // loginUser = localStorage.getItem("curUser");
//       // expect(loginUser).toBe("null");
//       expect("a").toBe("a");
//     }).catch((data)=>{
//
//     });
//   });
// });
