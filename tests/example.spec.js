// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test.skip('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);

  await page.pause();
});

// This will run in parallel a second page from Chrome
test.skip('2: ', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  //Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  //Create a Locator 
  const getStarted = page.getByRole('link', { name: 'Get started'});
  
  //Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // Click the get started link.
  await getStarted.click();  //await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);

  await page.pause();
});
