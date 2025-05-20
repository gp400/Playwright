// @ts-check
import { test, expect } from '@playwright/test';

test('Log in', async ({ context, page }) => {
  await page.goto('https://landing.unapec.edu.do/banner/');

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByText('Acceso para estudiantes y egresados').click()
  ]);

  await newPage.fill('input[name="loginfmt"]', 'g.pena52@unapec.edu.do');

  await newPage.locator('input[type="submit"]').click()

  await newPage.fill('input[name="loginfmt"]', 'GABYgaby123@unapec');

  await newPage.locator('input[type="submit"]').click()

  await newPage.getByText('No').click()

  // const [newPage2] = await Promise.all([
  //   newPage.waitForURL("https://login.microsoftonline.com/d00470c1-2144-4ee6-88fe-6732519fc163"),
  //   newPage.locator('input[id="idBtn_Back"]').click()
  // ]);

  // await expect(newPage2).toBeUndefined;
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });