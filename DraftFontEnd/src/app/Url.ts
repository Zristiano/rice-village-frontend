import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class  Url {
  public BaseUrl = "http://localhost:13240";
  public Following = this.BaseUrl+"/following";
  public Login = this.BaseUrl+"/login";
  public Register = this.BaseUrl+"/register";
  public Articles = this.BaseUrl+"/articles";
  public Article = this.BaseUrl+"/article";
}
