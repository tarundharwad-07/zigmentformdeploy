import { test, expect } from '@playwright/test';

test('form submission test', async ({ page }) => {
  // Go to your form page
  await page.goto('http://localhost:3000');

  // Create an array of the form data to be filled
  const formData = {
    name: 'John Doe',
    email: 'john@example.com',
    company: 'tech'
  };

  // Fill out the form based on the dynamic fields
  await page.fill('input[name="name"]', formData.name);
  await page.fill('input[name="email"]', formData.email);
  await page.selectOption('select[name="company"]', formData.company);

  // Listen for console messages to capture the form submission log
  let consoleMessage = '';
  page.on('console', msg => {
    consoleMessage = msg.text();  // Get the text of the console message
  });

  // Submit the form
  await page.click('button[type="submit"]');

  // Wait for the form submission to complete (you may need to adjust this if the form submission triggers a new page load or state change)
  await page.waitForSelector('form', { state: 'detached' });

  // Check that the console log output is not empty and matches the form data
  expect(consoleMessage).toContain('Form Data:');
  expect(consoleMessage).toContain(formData.name);
  expect(consoleMessage).toContain(formData.email);
  expect(consoleMessage).toContain(formData.company);
});
