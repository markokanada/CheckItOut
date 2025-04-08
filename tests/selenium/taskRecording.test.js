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
    await driver.sleep(500); 
    const categories = await driver.findElements(By.css('li.MuiMenuItem-root'));
    if (categories.length > 0) {
      await categories[0].click(); 
    } else {
      console.log('There is no category available');
    }

    // Enter the priority 
    await driver.findElement(By.id('priority')).sendKeys('5');

    //Submit the form
    await driver.findElement(By.css('button[type="submit"]')).click();


    // Check if it is successful
    await driver.wait(until.alertIsPresent(), 5000);
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();

    if (alertText.includes('Successfully created')) {
      console.log('Successfull');
    } else {
      console.error('Error:', alertText);
    }

    await alert.accept();



  } catch (err) {
    console.error('Error:', err);
  } finally {
    await driver.quit(); 
  }
})();
