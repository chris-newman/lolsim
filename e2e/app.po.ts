import { browser, by, element } from 'protractor';

export class LolsimPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('a.navbar-brand')).getText();
  }
}
