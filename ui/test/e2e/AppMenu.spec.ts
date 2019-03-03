import puppeteer, { Browser, Page } from 'puppeteer';
import { getUrl, takeScreenshot } from './util';

describe('Using the app navigation,', () => {
  describe('should be able to navigate to the', () => {
    let browser: Browser;
    let page: Page;

    before(async () => {
      browser = await puppeteer.launch();
      page = await browser.newPage();
      await page.goto(getUrl());
      await page.waitForSelector('.app-menu');
    });

    it('home page', async () => {
      await page.click('a.menu-option-home');
      await page.waitForSelector('.home-page');
      await takeScreenshot(page, 'navigation-home');
    });

    it('contracts page',async () => {
      await page.click('a.menu-option-contracts');
      await page.waitForSelector('.contract-list-page');
      await takeScreenshot(page, 'navigation-contract-list');
    });

    it('settings page', async () => {
      await page.click('a.menu-option-settings');
      await page.waitForSelector('.settings-page');
      await takeScreenshot(page, 'navigation-settings');
    });

    after(async () => {
      await page.close();
      await browser.close();
    });
  });
});

