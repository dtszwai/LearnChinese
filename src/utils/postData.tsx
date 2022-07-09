import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default (
  data: {},
  URL = 'https://script.google.com/macros/s/AKfycbw-hLu-3lgOLKAcSm44vW027eHjUSN_kM6u8kRot0H_BSlIlPgp4Mu_zPPk0FS5uYaB/exec',
) => {
  if (!ExecutionEnvironment.canUseDOM) return false;

  const fetchData = {
    ...data,
    Page: decodeURI(location.pathname),
    User: document.cookie.match('(^|;)\\s*_ga\\s*=\\s*([^;]+)')?.pop() || document.cookie,
  };

  const formData = new FormData();

  for (const key in fetchData) {
    formData.append(key, fetchData[key]);
  }

  return fetch(URL, { method: 'POST', body: formData })
    .then(() => true)
    .catch(() => false);
};
