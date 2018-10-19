import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import {FollowingComponent} from '../following/following.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {PostsService} from './posts.service';

describe('PostsComponent', () => {
  let postsComponent: PostsComponent;
  let postsFixture: ComponentFixture<PostsComponent>;

  let followingComponent:FollowingComponent;
  let followingFixture:ComponentFixture<FollowingComponent>;

  let postsService : PostsService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterModule,
        RouterTestingModule,
      ],
      providers: [
        PostsService
      ],
      declarations: [ PostsComponent,FollowingComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem("curUser","{\"id\":1,\"accountName\":\"Zristiano\",\"avatar\":\"http://www.gx8899.com/uploads/allimg/2018042010/enei40gszt1.jpg\",\"netId\":\"yz143\",\"password\":\"yz143yz143\",\"emailAddr\":\"yz143@rice.edu\",\"phoneNum\":\"832-708-7275\",\"status\":\"I am Zristiano\",\"zipCod\":\"77050\",\"birthDay\":\"1992-01-01\"}");
    postsService = TestBed.get(PostsService);
    postsService.setFollowers([{"id":2},{"id":3}])
    followingFixture = TestBed.createComponent(FollowingComponent);
    followingComponent = followingFixture.componentInstance;
    followingFixture.detectChanges();

    postsFixture = TestBed.createComponent(PostsComponent);
    postsComponent = postsFixture.componentInstance;
    postsFixture.detectChanges();
  });

  it('should fetch articles for current logged in user', () => {
    setTimeout(function () {
      postsService.getPosts().then((data:any)=>{
        console.log("data.length->"+data.length);
        expect(postsComponent.articles.length).toBe(6);
      })
    },500);
  });

  it('should add articles when adding a follower', function () {
    setTimeout(function () {
      console.log("2");
      postsService.getPosts().then((data:any)=>{
        console.log("22");
        expect(postsComponent.articles.length).toBe(6);
        followingComponent.follow("Ozil");
        postsService.getPosts().then((data:any)=>{
          expect(postsComponent.articles.length).toBe(8);
        })
      })
    },1000);
  });

  it('should remove articles when removing a follower', function () {
   setTimeout(function () {
     console.log("3");
     postsService.getPosts().then((data:any)=>{
       console.log("33");
       expect(postsComponent.articles.length).toBe(6);
       followingComponent.unFollow(2);
       postsService.getPosts().then((data:any)=>{
         expect(postsComponent.articles.length).toBe(4);
       })
     })
   },2000);
  });

  it('should filter displayed articles by the search keyword ', function () {
    setTimeout(function () {
      console.log("4");
      postsService.getPosts().then((data:any)=>{
        console.log("44");
        postsComponent.search("Zristiano");
        expect(postsComponent.articles.length).toBe(2);
      });
    },3000);
  });

  it('should update the search keyword', function () {
    let keyWord = "hello";
    postsComponent.search(keyWord);
    expect(postsComponent.keyWord).toBe(keyWord);
  });





});
