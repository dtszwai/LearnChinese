import { test, expect, type Page } from '@playwright/test';

// Do not send test ratings, analytics or video traffic to external services.
test.beforeEach(async ({ page }) => {
  await page.route(/https:\/\/(www\.)?(google-analytics|googletagmanager|youtube-nocookie)\.com\//, (route) =>
    route.fulfill({ body: '' }),
  );
  await page.route('https://script.google.com/**', (route) => route.fulfill({ body: 'ok' }));
});

function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (/hydration|onRecoverableError|Minified React error|Warning:.*(React|render|prop|Hook)/i.test(message.text())) {
      errors.push(message.text());
    }
  });
  return errors;
}

for (const path of [
  '/',
  '/learn',
  '/learn/rhetoric',
  '/contents/S1',
  '/contents/S1/景物描寫（一）',
  '/contents/S3/詞曲欣賞',
  '/passages/背影',
  '/cheatsheet',
]) {
  test(`production direct load and reload: ${path}`, async ({ page }) => {
    const errors = watchErrors(page);
    for (let attempt = 0; attempt < 2; attempt++) {
      if (attempt === 0) await page.goto(path);
      else await page.reload();
      await expect(page.locator('.navbar')).toBeVisible();
      await expect(page.getByRole('searchbox').or(page.locator('.navbar__search-input'))).toBeVisible();
      await page.waitForTimeout(300);
      expect(errors).toEqual([]);
    }
    await expect(page.locator('.theme-announcement-bar')).toHaveCSS('background-color', 'rgb(127, 127, 240)');
  });
}

test('only rhetoric is published; search and legacy redirect work', async ({ page }) => {
  await page.goto('/learn');
  await expect(page.locator('main a[href^="/learn/"]')).toHaveCount(1);
  await expect(page.locator('main a[href="/learn/rhetoric"]')).toBeVisible();
  for (const slug of ['description', 'lyricism', 'narrative', 'argumentation', 'classical-chinese']) {
    await page.goto('/learn/' + slug);
    await expect(page.locator('main')).not.toContainText('正在載入課程');
    await expect(page.getByRole('button', { name: '下一題', exact: true })).toHaveCount(0);
  }
  await page.goto('/');
  await page.keyboard.press('Control+k');
  const search = page.locator('.navbar__search-input');
  await expect(search).toBeFocused();
  await search.fill('背影');
  const result = page.locator('[class*="suggestion"]').filter({ hasText: '背影' }).first();
  await expect(result).toBeVisible();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/背影|%E8%83%8C%E5%BD%B1/);
  await page.goto('/S1/單元二：敘事寫人/背影');
  await expect(page).toHaveURL(/\/passages\//);
});

test('Learn answer lock, hint keyboard, IME, simplified answer and edited demonstration', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/learn/rhetoric');
  const next = page.getByRole('button', { name: '下一題', exact: true });
  const answer = page.getByRole('textbox', { name: '你的答案' });
  await expect(page.getByRole('button', { name: '展開課程進度' })).toHaveAttribute('aria-expanded', 'false');
  await next.click();
  await expect(answer).toBeVisible();
  await answer.fill('.*');
  await expect(next).toHaveAttribute('aria-disabled', 'true');
  await answer.fill('秘密');
  await expect(next).toHaveAttribute('aria-disabled', 'false');
  await answer.dispatchEvent('keypress', { key: 'Enter', code: 'Enter', isComposing: true, bubbles: true });
  await expect(page.getByRole('heading', { name: '比喻', exact: true })).toBeVisible();
  await page.keyboard.press('Alt+h');
  await expect(page.getByRole('tooltip')).toContainText('秘密');
  await page.getByRole('button', { name: /顯示答案/ }).press('Enter');
  await expect(page.getByRole('heading', { name: '比喻', exact: true })).toBeVisible();
  await next.click();
  await page.getByRole('button', { name: '上一題', exact: true }).click();
  await expect(answer).toHaveValue('秘密');
  await answer.fill('錯');
  await expect(next).toHaveAttribute('aria-disabled', 'true');
  await answer.fill('');
  await expect(next).toHaveAttribute('aria-disabled', 'true');
  await page.evaluate(() => localStorage.setItem('learn.rhetoric', JSON.stringify({ currentStep: 5, lastStep: 5 })));
  await page.reload();
  await answer.fill('过量的酒');
  await expect(next).toHaveAttribute('aria-disabled', 'false');
  expect(errors).toEqual([]);
});

for (const mode of ['malformed', 'denied', 'quota'] as const) {
  test(`Learn continues with ${mode} storage`, async ({ page }) => {
    await page.addInitScript((mode) => {
      if (mode === 'malformed') localStorage.setItem('learn.rhetoric', '{bad');
      if (mode === 'denied')
        Object.defineProperty(window, 'localStorage', {
          get() {
            throw new DOMException('Denied', 'SecurityError');
          },
        });
      if (mode === 'quota')
        Storage.prototype.setItem = () => {
          throw new DOMException('Full', 'QuotaExceededError');
        };
    }, mode);
    const errors = watchErrors(page);
    await page.goto('/learn/rhetoric');
    await page.getByRole('button', { name: '下一題', exact: true }).click();
    await page.getByRole('textbox', { name: '你的答案' }).fill('秘密');
    await page.getByRole('button', { name: '下一題', exact: true }).click();
    await expect(page.getByRole('heading', { name: '暗喻', exact: true })).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test('Review validates old data without rewriting it, and rating does not submit feedback', async ({ page }) => {
  const stored = {
    'contents/S1/景物描寫（一）': { checked: true, response: 999 },
    other: { response: 1, extra: 'keep' },
  };
  await page.addInitScript((value) => {
    if (!localStorage.getItem('Points')) localStorage.setItem('Points', JSON.stringify(value));
  }, stored);
  await page.goto('/contents/S1/景物描寫（一）');
  const review = page.locator('[id="鞏固知識"]');
  await expect(review).toContainText('朔風蕭條');
  await expect(review.getByRole('button')).toHaveCount(4);
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('Points') || '{}'))).toEqual(stored);
  await review.getByRole('button', { name: /B\./ }).click();
  await expect(review).toContainText('答對了，做得不錯');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('Points') || '{}').other)).toEqual(stored.other);
  await page.reload();
  await expect(review.getByRole('button').first()).toBeDisabled();
  await expect(review).toContainText('答對了，做得不錯');
  const requests: string[] = [];
  await page.route('https://script.google.com/**', (route) => {
    requests.push(route.request().postData() || '');
    return route.fulfill({ body: 'ok' });
  });
  await page.getByRole('button', { name: '有幫助', exact: true }).click();
  await expect(page.getByRole('textbox', { name: '意見回饋' })).toBeEnabled();
  await expect(page.getByRole('button', { name: '提交', exact: true })).toBeDisabled();
  await expect.poll(() => requests.length).toBe(1);
  expect(requests[0]).toContain('Rating');
});

test('responsive progress, scrolling and deep links', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/learn/rhetoric');
  await page.getByRole('button', { name: '展開課程進度' }).click();
  await expect(page.getByRole('button', { name: '收合課程進度' })).toHaveAttribute('aria-expanded', 'true');
  await page.setViewportSize({ width: 1099, height: 800 });
  await expect(page.getByRole('complementary', { name: '課程進度' })).toBeHidden();
  await page.setViewportSize({ width: 390, height: 700 });
  await page.getByRole('button', { name: '下一題', exact: true }).click();
  await expect(page.getByRole('textbox', { name: '你的答案' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/cheatsheet#說明手法-舉例');
  await expect(page.locator('[id="說明手法-舉例"]')).toBeVisible();
  await expect(page.locator('[id="說明手法-舉例"]').locator('..')).toHaveAttribute('aria-expanded', 'true');
  expect(errors).toEqual([]);
});

test('existing Learn progress is read without writes and restored after refresh', async ({ page }) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem('learn.rhetoric')) {
      localStorage.setItem('learn.rhetoric', JSON.stringify({ currentStep: 5, lastStep: 12 }));
    }
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === 'learn.rhetoric') throw new Error('Loading must not rewrite saved progress');
      original.call(this, key, value);
    };
  });
  const errors = watchErrors(page);
  await page.goto('/learn/rhetoric');
  await expect(page.getByRole('textbox', { name: '你的答案' })).toHaveValue('過量的酒');
  await page.reload();
  await expect(page.getByRole('textbox', { name: '你的答案' })).toHaveValue('過量的酒');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('learn.rhetoric') || '{}'))).toEqual({
    currentStep: 5,
    lastStep: 12,
  });
  expect(errors).toEqual([]);
});

test('Review still works when storage is unavailable', async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Denied', 'SecurityError');
      },
    }),
  );
  const errors = watchErrors(page);
  await page.goto('/contents/S3/詞曲欣賞');
  const review = page.locator('[id="鞏固知識"]');
  await review.getByRole('button').nth(1).click();
  await expect(review).toContainText('答對了，做得不錯');
  expect(errors).toEqual([]);
});

test('MUI collapse preserves keyboard toggling, controlled hash opening and content', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/cheatsheet');
  const heading = page.locator('[id="說明手法-舉例"]');
  const trigger = heading.locator('..');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const contentId = await trigger.getAttribute('aria-controls');
  const content = page.locator(`[id="${contentId}"]`);
  await expect(content).toBeVisible();
  await expect(content).toContainText('例子');
  await page.keyboard.press('Space');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(content).toBeHidden();
  await page.evaluate(() => {
    window.location.hash = '說明手法-舉例';
  });
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(errors).toEqual([]);
});

test('TypeIt core preserves the cursor edits and restarts cleanly after navigation', async ({ page }) => {
  test.setTimeout(60000);
  const errors = watchErrors(page);
  await page.goto('/');
  const typer = page.locator('[data-home-typewriter]');
  await expect(typer).toContainText('鳥宿', { timeout: 10000 });
  await expect(typer).toContainText('陰陰', { timeout: 40000 });
  await expect(typer).toContainText('鳥宿池邊樹，僧敲月下門。');
  await expect(typer).toContainText('漠漠水田飛白鷺，陰陰夏木囀黃鸝。');
  await expect(typer.locator('strong').filter({ hasText: '敲' })).toHaveCSS('color', 'rgb(135, 131, 209)');
  await expect(typer.locator('strong').filter({ hasText: '漠漠' })).toHaveCSS('color', 'rgb(226, 115, 150)');
  await expect(typer.locator('.ti-cursor')).toHaveCount(1);
  await page.getByRole('link', { name: '學習', exact: true }).click();
  await expect(typer).toHaveCount(0);
  await page.getByRole('link', { name: '書目引得', exact: true }).click();
  await expect(typer).toContainText('鳥宿', { timeout: 10000 });
  await expect(typer.locator('.ti-cursor')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('typed MDX challenge and commentary components preserve their interactions', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/passages/背影');
  await expect(page.getByText('第 1/10 題', { exact: true })).toBeVisible();
  await page.goto('/settext/出師表');
  const toggle = page.getByRole('button', { name: '顯示語譯' });
  await toggle.click();
  await expect(page.getByRole('button', { name: '隱藏語譯' })).toBeVisible();
  await page.getByRole('button', { name: '隱藏語譯' }).click();
  await expect(toggle).toBeVisible();
  expect(errors).toEqual([]);
});
