import {browser, by, element, protractor} from 'protractor';

export class AppPage {
  navigateToLogin() {
    return browser.get('/');
  }

  register(username:string,email:string,phone:string,password:string,zipCode:string){
    element(by.name('account')).sendKeys(username);
    element(by.name('email')).sendKeys(email);
    element(by.name('phone')).sendKeys(phone);
    element(by.name('psw')).sendKeys(password);
    element(by.name('confirmpsw')).sendKeys(password);
    element(by.name('zipcode')).sendKeys(zipCode);
    element(by.name('birthday')).sendKeys("1996");
    element(by.name('birthday')).sendKeys(protractor.Key.TAB);
    element(by.name('birthday')).sendKeys("1111");


    return element(by.id('registerSubmit')).click();
  }

  getRegisterSuccessMsg(){
    return element(by.id('registerSuccessMsg')).getText();
  }

  login(username:string, password:string){
    element(by.name('username')).sendKeys(username);
    element(by.name('password')).sendKeys(password);
    return element(by.id('loginSubmit')).click()
  }

  postNewArticle(content:string){
    element(by.id('postTextArea')).sendKeys(content);
    return element(by.id('postNewArticle')).click();
  }

  getPostCotent(){
    return element.all(by.id('articleContent')).get(0).getText();
  }

  sendNewHeadline(content:string){
    element(by.id('newHeadline')).sendKeys(content);
    return element(by.id('updateHeadline')).click();
  }

  searchArticle(content:string){
    element(by.id("searchInputContent")).sendKeys(content);
    element(by.id("searchButton")).click();
  }

  logout(){
    element(by.id('logout')).click();
  }

  getLoginSucMsg(){
    return element(by.id('loginSucMsg')).getText();
  }
}

