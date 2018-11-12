import { AppPage } from './app.po';
import {browser, by, element} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  let newUser:string;

  beforeEach(() => {
    page = new AppPage();
    newUser = "Zristiano11";
  });

  it('should register a new user', () => {
    page.navigateToLogin();
    page.register(newUser,"yz143@163.com","222-333-3333","1234","12345").then(res=>{
      expect(page.getRegisterSuccessMsg()).toEqual('Well done! You successfully register.');
    });
  });

  it('log in as test user ', function () {
    page.navigateToLogin();
    page.login(newUser,"1234");
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+'/#/main');
  });

  it('Create new article and validate article appears in feed ', function () {
    const newPost = "this is a new post";
    page.postNewArticle(newPost);
    expect(page.getPostCotent()).toEqual(newPost);
    console.log('post content->'+ page.getPostCotent());
  });

  it('Update headline headline and verify change ', function () {
    const newHeadline = "new headline";
    page.sendNewHeadline(newHeadline);
    const expectContent =  element(by.id('headline')).getText();

    expect(expectContent).toEqual(newHeadline);
    console.log('post content->'+ page.getPostCotent());
  });

  it('log out new user ', function () {
    // browser.sleep(1000);
    page.logout();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+'/#/');
  });


  it('log in test user ', function () {
    page.navigateToLogin();
    page.login("Zristiano","1234");
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+'/#/main');
  });

  it("Search for a keyword that matches only one of test user's articles and verify only one article shows, and verify the author", function () {
    // page.navigateToLogin();
    page.searchArticle("ddddddddd");
    expect(element.all(by.id('articleContent')).count()).toBe(1);
    expect(element.all(by.id('articleAuthor')).get(0).getText()).toEqual("Author:Zristiano");

    // expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+'/#/main');
  });

  it('log out test user ', function () {
    setTimeout(()=>{
      page.logout();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+'/#/');
    },1500);

  });



});
