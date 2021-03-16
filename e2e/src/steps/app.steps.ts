const { Before, Given, Then, When } = require('@cucumber/cucumber');
const { expect } = require('chai');

const AppPage = require('../pages/app.po.ts');

let page = AppPage;

Before(() => {
  page = new AppPage();
});

Given(/^I am on the home page$/, async () => {
  await page.navigateTo();
});

When(/^I do nothing$/, () => {});

Then(/^I should see the title$/, async () => {
  expect(await page.getTitleText()).to.equal(
    'Welcome to cucumber-e2e-testing demo!'
  );
});
