import { browser, element, by } from 'protractor';

export class SvgAnimatorPage {
  navigateTo() {
    return browser.get('/svg-animator');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
