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

    // Enter the future deadline
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 16); 
    await driver.findElement(By.id('due_date')).sendKeys(tomorrow);

    // Select a category 
    await driver.findElement(By.id('category')).click();
    const categoryOption = await driver.findElement(By.css('#category .MuiMenuItem-root'));
    await categoryOption.click();

    // Enter the priority 
    await driver.findElement(By.id('priority')).sendKeys('5');

    //Submit the form
    await driver.findElement(By.css('button[type="submit"]')).click();



  } catch (err) {
    console.error('Hiba:', err);
  } finally {
    await driver.quit(); 
  }
})();
