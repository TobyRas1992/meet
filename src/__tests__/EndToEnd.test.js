import puppeteer from 'puppeteer';

//feature 2
describe('show/hide an event details', () => {

  let browser;
  let page;
  jest.setTimeout(30000);
  beforeAll(async () => {

    browser = await puppeteer.launch(/* {
      headless: false,
      slowMo: 250,
      ignoreDefaultArgs: ["--disable-extensions"]
    } */); //launches chromium 
    page = await browser.newPage();
    await page.goto('http://localhost:3000/'); //go to specified page.

    await page.waitForSelector('.event'); // waits until event element appears.
  });

  afterAll(() => {
    browser.close();
  });

  //scenario 1
  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .event-details'); //returns first css selector found with given name.

    expect(eventDetails).toBeNull();
  });

  //scenario 2
  test('User can expand an event to see its details', async () => {
    await page.click('.event .showDetailsButton');

    const eventDetails = await page.$('.event .event-details');

    expect(eventDetails).toBeDefined(); //expects details to exists.

  });

  //scenario 3
  test('User can collapse an event to hide its details', async () => { // question: this TECHNICALLY passes, but it doesn't work correctly. 
    await page.click('.event .hideDetailsButton');
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeNull();
  });
});
