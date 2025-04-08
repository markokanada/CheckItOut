const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function basicTaskRecordingTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://frontend.vm1.test/task-recording');

    await driver.wait(until.elementLocated(By.id('title')), 10000);

    console.log('The page has loaded successfully and the "title" field is found.');
    
    // Fill in the "Task name" field
    await driver.findElement(By.id('title')).sendKeys('Teszt');

     // Fill in the "Description" field
     await driver.findElement(By.id('descreption')).sendKeys('Description, Lorem...');


  } catch (err) {
    console.error('Hiba:', err);
  } finally {
    await driver.quit(); 
  }
})();
