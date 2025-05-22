// @ts-check
import { test, expect } from '@playwright/test';
const path = require('path');
const fs = require('fs/promises');

test('Automatizacion APEC', async ({ context, page }) => {
  //Login
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

  //Horario de clase
  const [newPage2] = await Promise.all([
    context.waitForEvent('page'),
    newPage.getByText('Inscripción, horario y planificación').click()
  ]);

  await newPage2.locator('#regHistoryLink').click();

  await newPage2.locator('#s2id_lookupFilter').click();

  await newPage2.locator('text=MAY-AGO 2025 GRADO').nth(1).click();

  const username = await newPage2.locator('#username > span').textContent();
  const tags = '#table1 > tbody > tr';
  await expect(newPage2.locator(`${tags} > td`).first()).toHaveText("INGLES PARA INFORMATICA I");
  const subjectCount = await newPage2.locator(tags).count();

  await newPage2.screenshot({ path: "horario.png", fullPage: true })

  const rutaImagen = path.resolve(__dirname, "..", "horario.png");

  const content = {
    username,
    subjectCount,
    rutaImagen
  };

  await fs.writeFile("log.json", JSON.stringify(content));

  //Logout
  await newPage2.locator("#user").click();

  await newPage2.locator("#signOut").click();
});