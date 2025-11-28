import { test, expect } from '@playwright/test';

test.describe('Strapi E2E Tests (refatorados)', () => {

  // Login antes de teste
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:1337/admin');
    await page.fill('input[name="email"]', 'admin@satc.edu.br');
    await page.fill('input[name="password"]', 'welcomeToStrapi123');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Welcome')).toBeVisible({ timeout: 2000 });
  });

  test('Cria e verifica nova Categoria (nome único)', async ({ page }) => {
    const name = `DevOps Test Category ${Date.now()}`;

    await page.click('text=Content Manager');
    await page.click('a[href*="api::category.category"]');
    await page.waitForSelector('text=Create new entry');
    await page.click('text=Create new entry');

    // Preenche o nome da categoria
    await page.fill('input[name="name"]', name);

    // Salva e espera confirmação
    await page.click('button:has-text("Save")');
    await expect(page.locator('text=Saved')).toBeVisible({ timeout: 1000 });

    // Volta para a lista e verifica se o item criado aparece
    await page.click('text=Back');
    await page.fill('input[placeholder*="Search"]', name);
    await expect(page.locator(`text=${name}`)).toBeVisible({ timeout: 1000 });
  });

  test('Cria e valida novo Autor (nome e email únicos)', async ({ page }) => {
    const timestamp = Date.now();
    const name = `Aluno SATC ${timestamp}`;
    const email = `aluno+${timestamp}@satc.edu.br`;

    await page.click('text=Content Manager');
    await page.click('a[href*="api::author.author"]');
    await page.waitForSelector('text=Create new entry');
    await page.click('text=Create new entry');

    // Preenche campos do autor
    await page.fill('input[name="name"]', name);

    const emailInput = page.locator('input[name="email"]');
    if (await emailInput.count() > 0) {
      await emailInput.fill(email);
    }

    await page.click('button:has-text("Save")');
    await expect(page.locator('text=Saved')).toBeVisible({ timeout: 5000 });

    // Verifica se o autor foi criado
    await page.click('text=Back');
    await page.fill('input[placeholder*="Search"]', name);
    await expect(page.locator(`text=${name}`)).toBeVisible({ timeout: 1000 });
  });
});
