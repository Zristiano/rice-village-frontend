import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterationComponent } from './auth/registeration/registeration.component';
import {Routes} from '@angular/router';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { MainComponent } from './main/main.component';
import { HeadlineComponent } from './main/headline/headline.component';
import { FollowingComponent } from './main/following/following.component';
import { HttpClientModule} from '@angular/common/http';
import { PostsComponent } from './main/posts/posts.component';
import { ProfileComponent } from './profile/profile.component';


export const routes: Routes = [{path: '', component: AuthComponent, pathMatch: 'full'},
  {path: 'main', component: MainComponent, pathMatch: 'full'}
  /*{path: 'profile', component: ProfileComponent, pathMatch: 'full'}*/];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterationComponent,
    MainComponent,
    HeadlineComponent,
    FollowingComponent,
    PostsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
