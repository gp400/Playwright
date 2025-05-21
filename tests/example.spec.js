// @ts-check
import { test, expect } from '@playwright/test';

test('Log in', async ({ context, page }) => {
  await page.goto('https://landing.unapec.edu.do/banner/');

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByText('Acceso para estudiantes y egresados').click()
  ]);

  await newPage.fill('input[name="loginfmt"]', ''); // Inserte su email

  await newPage.locator('input[type="submit"]').click();

  await newPage.fill('input[name="passwd"]', ''); // Inserte su password

  await newPage.locator('input[type="submit"]').click();

  await newPage.locator('input[id="idBtn_Back"]').click();

  

  // await expect(newPage2).toBeUndefined;
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });