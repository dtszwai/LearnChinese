import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  workers: 2,
  retries: 0,
  timeout: 30000,
  use: {
    baseURL: 'http://127.0.0.1:4174',
    viewport: { width: 1440, height: 1000 },
    colorScheme: 'light',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run serve -- --host 127.0.0.1 --port 4174 --no-open',
    url: 'http://127.0.0.1:4174',
    reuseExistingServer: false,
    timeout: 60000,
  },
});
