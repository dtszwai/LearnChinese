export default (
  formData: any,
  fetchURL = 'https://script.google.com/macros/s/AKfycbw-hLu-3lgOLKAcSm44vW027eHjUSN_kM6u8kRot0H_BSlIlPgp4Mu_zPPk0FS5uYaB/exec',
) => {
  formData.append('Page', decodeURI(location.pathname));
  formData.append('User', document.cookie);
  return fetch(fetchURL, { method: 'POST', body: formData }).then(
    (res) => res.ok,
  );
};
