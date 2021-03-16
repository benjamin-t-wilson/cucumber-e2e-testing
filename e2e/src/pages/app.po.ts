const { browser, by, element } = require('protractor');

module.exports = class AppPage {
  constructor() {}
  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }
};
