import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default async function postData(
  data: Record<string, string | number>,
  URL = 'https://script.google.com/macros/s/AKfycbw-hLu-3lgOLKAcSm44vW027eHjUSN_kM6u8kRot0H_BSlIlPgp4Mu_zPPk0FS5uYaB/exec',
  { signal, timeoutMs = 10000 }: { signal?: AbortSignal; timeoutMs?: number } = {},
): Promise<boolean> {
  if (!ExecutionEnvironment.canUseDOM) return false;

  const fetchData: Record<string, string | number> = {
    ...data,
    Page: decodeURI(location.pathname),
    User: document.cookie.match(/(?:^|;)\s*_ga\s*=\s*([^;]+)/)?.[1] ?? '',
  };

  const formData = new FormData();

  for (const [key, value] of Object.entries(fetchData)) {
    formData.append(key, String(value));
  }

  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener('abort', abort, { once: true });
  if (signal?.aborted) abort();
  const timeout = setTimeout(abort, timeoutMs);
  try {
    return (await fetch(URL, { method: 'POST', body: formData, signal: controller.signal })).ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abort);
  }
}
