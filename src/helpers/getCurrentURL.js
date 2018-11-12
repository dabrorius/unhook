export function getCurrentURL() {
  return new Promise(resolve => {
    chrome.tabs.query({ currentWindow: true, active: true }, tabArray => {
      const rawUrl = tabArray[0].url;
      resolve(rawUrl);
    });
  });
}
