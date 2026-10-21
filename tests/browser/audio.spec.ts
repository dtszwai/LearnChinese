import { test, expect } from '@playwright/test';

type AudioState = { created: number; played: number; released: number; rejected: boolean };
declare global {
  interface Window {
    __audioTest: AudioState;
  }
}

test('AudioCard reuses one player per track, handles blocked play and releases on navigation', async ({ page }) => {
  await page.route(/https:\/\/(www\.)?(google-analytics|googletagmanager|youtube-nocookie)\.com\//, (route) =>
    route.fulfill({ body: '' }),
  );
  await page.route('https://script.google.com/**', (route) => route.fulfill({ body: 'ok' }));
  await page.addInitScript(() => {
    const state = { created: 0, played: 0, released: 0, rejected: false };
    Object.defineProperty(window, '__audioTest', { value: state });
    class TestAudio extends EventTarget {
      duration = 120;
      currentTime = 0;
      paused = true;
      constructor() {
        super();
        state.created++;
        queueMicrotask(() => this.dispatchEvent(new Event('loadedmetadata')));
      }
      play() {
        state.played++;
        if (state.rejected) return Promise.reject(new DOMException('blocked', 'NotAllowedError'));
        this.paused = false;
        this.dispatchEvent(new Event('play'));
        return Promise.resolve();
      }
      pause() {
        this.paused = true;
        this.dispatchEvent(new Event('pause'));
      }
      removeAttribute(name: string) {
        if (name === 'src') state.released++;
      }
      load() {}
    }
    Object.defineProperty(window, 'Audio', { value: TestAudio });
  });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/passages/背影');
  const toggle = page.getByRole('button', { name: 'Play/Pause toggle' }).first();
  await expect(toggle).toBeVisible();
  const initial = await page.evaluate(() => (window as Window & { __audioTest: AudioState }).__audioTest.created);
  for (let i = 0; i < 4; i++) await toggle.click();
  expect(await page.evaluate(() => (window as Window & { __audioTest: AudioState }).__audioTest.created)).toBe(initial);
  await page.evaluate(() => {
    (window as Window & { __audioTest: AudioState }).__audioTest.rejected = true;
  });
  await toggle.click();
  await page.getByRole('link', { name: '學習', exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => (window as Window & { __audioTest: AudioState }).__audioTest.released))
    .toBe(initial);
  expect(errors).toEqual([]);
});
