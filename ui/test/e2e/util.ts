import { Page } from "puppeteer";

export function getUrl(path: string = ''): string {
  return `http://localhost:3000/#${path}`
}

export const waitUntil = (time: number) => new Promise((resolve: () => void) => setTimeout(resolve, time));

export function takeScreenshot(page: Page, specName: string): Promise<any> {
  // TODO: Save the date within the file name
  return page.screenshot({
    path: `${__dirname}/screenshots/${specName}.png`,
  });
}