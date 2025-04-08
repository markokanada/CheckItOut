const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function basicTaskRecordingTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://frontend.vm1.test/task-recording');

    await driver.wait(until.elementLocated(By.id('title')), 10000);

    console.log('Az oldal sikeresen betöltődött és a "title" mező megtalálható.');

 
  } catch (err) {
    console.error('Hiba:', err);
  } finally {
    await driver.quit(); 
  }
})();
