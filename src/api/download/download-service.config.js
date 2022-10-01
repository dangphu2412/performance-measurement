import puppeteer from 'puppeteer';

/**
 * @property {import('puppeteer').Browser}
 */
let headlessBrowser;

/**
 * @return {import('puppeteer').Browser}
 */
export function getBrowser() {
  if (!headlessBrowser) {
    throw new Error('Not setup headless browser yet');
  }

  return headlessBrowser;
}

export async function initBrowser() {
  try {
    headlessBrowser = await puppeteer.launch({ headless: true });
  } catch (err) {
    console.log(err);
  }
}

export async function closeBrowser() {
  if (headlessBrowser) {
    try {
      await headlessBrowser.close();
    } catch (err) {
      console.log(err);
      headlessBrowser = undefined;
    }
    headlessBrowser = undefined;
  }
}
