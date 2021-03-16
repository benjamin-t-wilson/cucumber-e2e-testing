Check out the [full article](https://www.amadousall.com/angular-e2e-with-cucumber/) by Amadou Sall

## 1. Install the needed dependencies

```
npm install --save-dev @types/{chai,cucumber} chai cucumber protractor-cucumber-framework
```

### Chai

Cucumber is a testing framework which doesn't come with an assertion library like Jasmine does, so we need to install one–chai in this article.

### Protractor Cucumber Framework

The protractor-cucumber-framework package is a plugin that does the glue between Protractor and Cucumber. It's what makes possible running Cucumber tests using Protractor.

### Type definitions for Chai and Cucumber

The @types/chai and @types/cucumber Type definitions allow TypeScript to perform the necessary type checking.

## 2. Setup Cucumber and Chai's type definition files

Open the e2e/tsconfig.json file.

Replace:
`"types": ["jasmine", "jasminewd2", "node"]`

By:
`"types": ["chai", "cucumber", "node"]`

## 3. Update the Protractor configuration to use Cucumber

Open Protractor's configuration file located at e2e/protractor.conf.js and do the following modifications:

### 1. Update the test files to be used by Protractor:

```
specs: ['./src/features/**/*.feature']
```

Our feature files will reside in the e2e/src/features folder.

### 2. Tell Protractor that you want to use Cucumber as the testing framework.

```
framework: 'custom',
frameworkPath: require.resolve('protractor-cucumber-framework')
```

### 3. Configure Cucumber Options

```
cucumberOpts: {
require: ['./src/steps/**/*.steps.ts'],
},
```

cucumberOpts defines the actual command line options that are passed to Cucumber.js. Here we are telling Cucumber that our step definitions files reside in the e2e/src/steps folder.

### 4. Remove any Jasmine specific code from e2e/protractor.conf.js

```
const { SpecReporter } = require('jasmine-spec-reporter');
....
framework: 'jasmine',
jasmineNodeOpts: {
showColors: true,
defaultTimeoutInterval: 30000,
print: function() {}
},
...
onPrepare() {
...
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
}
```

## 4. Write the actual tests

The feature file - `e2e/src/features/app.feature`

```
Feature: Go to the home
    Display the title

Scenario: Home Page
    Given I am on the home page
    When I do nothing
    Then I should see the title
```

The page object - `e2e/src/pages/app.po.ts`

```
import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    getTitleText() {
        return element(by.css('app-root h1')).getText() as Promise<string>;
    }
}
```

The step definition - `e2e/src/steps/app.steps.ts`

```
import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';

import { AppPage } from '../pages/app.po';

let page: AppPage;

Before(() => {
    page = new AppPage();
});

Given(/^I am on the home page$/, async () => {
    await page.navigateTo();
});

When(/^I do nothing$/, () => {});

Then(/^I should see the title$/, async () => {
    expect(await page.getTitleText()).to.equal('Welcome to angular-cli-cucumber-demo!');
});
```

## 5. Launch the tests

To launch the tests, simply run the following command:

```
ng e2e
```
