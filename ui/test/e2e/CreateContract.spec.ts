import { expect } from 'chai';
import puppeteer, { ElementHandle, Page, Browser } from 'puppeteer';
import { getUrl, waitUntil, takeScreenshot } from './util';

async function waitForNextButtonEnabled(page: Page): Promise<any> {
   // Validation is async, so that it needs to wait until the button gets enabled
   await page.waitForSelector('.step-actions .next-step-btn:not([disabled])');
   await waitUntil(200); // wait for the css transition in the button background
}

async function nextStep(page: Page): Promise<boolean> {
  const nextButton: ElementHandle | null = await page.$('.step-actions .next-step-btn');

  if (!nextButton) {
    return false;
  }

  await nextButton.click();
  await waitUntil(200);

  return true;
}

describe('During the contract creation,', () => {
  let browser: Browser;
  let page: Page;

  before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(getUrl('/contracts/new'));
    await page.waitForSelector('.app-menu');
  });

  it('Should see the identity step', async () => {
    const identityForm: ElementHandle | null = await page.$('.identity-form');
    expect(identityForm).to.exist;
    await takeScreenshot(page, 'create-contract-step-1');
  });

  it('Should be able to fill the identity form', async () => {
    await page.type('.identity-form input[name="user.name"]', 'Maycon');
    await page.type('.identity-form input[name="user.email"]', 'maycon.mello@gmail.com');
    await page.type('.identity-form input[name="user.surname"]', 'Mello');
    await waitForNextButtonEnabled(page);
    await takeScreenshot(page, 'create-contract-step-1-filled');
  });

  it('When user click\'s on next button should display the "contract type" step', async () => {
    const nextStepSuccess = await nextStep(page);
    expect(nextStepSuccess).to.be.true;
    await page.waitForSelector('.contract-type');
    await takeScreenshot(page, 'create-contract-step-2');
  });

  it('Should be able to selected a contract type', async () => {
    const donationCard: ElementHandle | null = await page.$('.contract-card-donation');

    expect(donationCard).to.exist;

    if (!donationCard) {
      return;
    }
    
    await donationCard.click();
    await waitForNextButtonEnabled(page);
    await takeScreenshot(page, 'create-contract-step-2-filled');
  });

  it('When user click\'s on next button should display the "contract config" step', async () => {
    const nextStepSuccess = await nextStep(page);
    expect(nextStepSuccess).to.be.true;
    await page.waitForSelector('.contract-config-form');
    await takeScreenshot(page, 'create-contract-step-3');
  });

  it('Should be able to fill the contract config form', async () => {
    await page.type('.contract-config-form input[name="config.minValue"]', '2');
    await waitForNextButtonEnabled(page);
    await takeScreenshot(page, 'create-contract-step-3-filled');
  });

  it('When user click\'s on next button must display the confirmation step', async () => {
    const nextStepSuccess = await nextStep(page);
    expect(nextStepSuccess).to.be.true;
    await page.waitForSelector('.contract-confirmation');
    await takeScreenshot(page, 'create-contract-step-4');
  });

  it('When user click\'s on confirm button should display the "contract created" step', async () => {
    const nextStepSuccess = await nextStep(page);
    expect(nextStepSuccess).to.be.true;
    await page.waitForSelector('.contract-created');
    await takeScreenshot(page, 'create-contract-step-5');
  });

  after(async () => {
    await page.close();
    await browser.close();
  });
});

