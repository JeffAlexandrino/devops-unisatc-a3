import { test, expect } from "@playwright/test";

test('teste proposital que falha', async () => {
  // Esta asserção vai falhar propositalmente
  expect(true).toBe(false);
});
