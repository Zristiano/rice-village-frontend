import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class  Url {
  // public BaseUrl = "http://localhost:5000";
  public BaseUrl = "https://ricebookserver-yuanmengzeng.herokuapp.com";
  public Following = this.BaseUrl+"/following";
  public Login = this.BaseUrl+"/login";
  public Logout = this.BaseUrl+"/logout";
  public Register = this.BaseUrl+"/register";
  public Articles = this.BaseUrl+"/articles";
  public Article = this.BaseUrl+"/article";
  public Profile = this.BaseUrl+"/profile";
  public Password = this.BaseUrl+"/password";
  public Headline = this.BaseUrl+"/headline";
  public Avatar = this.BaseUrl+"/avatar";
  public FacebookLogin = this.Login+"/facebook";
  public LinkAccount = this.BaseUrl+"/linkaccount";
  public UnlinkFacebook = this.BaseUrl+"/unlinkfacebook";
  public LinkFacebook = this.BaseUrl+"/linkfacebook";
  public UserState = this.BaseUrl+"/userstate";

}
