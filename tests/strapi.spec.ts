import { test, expect } from '@playwright/test';

test.describe('Strapi E2E Tests', () => {
  
  // Login antes de cada teste
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:1337/admin');

    await page.fill('input[name="email"]', 'admin@satc.edu.br');
    await page.fill('input[name="password"]', 'welcomeToStrapi123');
    await page.click('button[type="submit"]');

    await expect(page.getByText('Welcome')).toBeVisible({ timeout: 1500 });
  });

  test('Criar nova Categoria', async ({ page }) => {
    await page.getByText('Content Manager').click();
    await page.locator('a[href*="api::category.category"]').click();
    await page.getByText('Create new entry').click();

    await page.fill('input[name="name"]', 'Projeto DevOps A3');

    await page.getByRole('button', { name: /save/i }).click();
    await expect(page.getByText('Saved')).toBeVisible();
  });

  test('Criar novo Autor', async ({ page }) => {
    await page.getByText('Content Manager').click();
    await page.locator('a[href*="api::author.author"]').click();
    await page.getByText('Create new entry').click();

    await page.fill('input[name="name"]', 'Aluno SATC');
    await page.fill('input[name="email"]', 'aluno@satc.edu.br');

    await page.getByRole('button', { name: /save/i }).click();
    await expect(page.getByText('Saved')).toBeVisible();
  });

});
