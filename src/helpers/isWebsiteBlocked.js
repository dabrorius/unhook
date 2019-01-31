export function isWebsiteBlocked(callback) {
  chrome.storage.sync.get(
    {
      blockList: [],
      override: null
    },
    function(options) {
      console.log("OPTIONS", options);
      let currentUrl = window.location.toString();
      let blockList = options.blockList;
      let isBlocked = false;
      for (let site of blockList) {
        var regex = new RegExp(`.*${site}.*`);
        isBlocked = isBlocked || regex.test(currentUrl);
      }
      let override = options.override;
      const isBlockingOverriden = override && new Date(override) > Date.now();
      console.log(isBlocked, isBlockingOverriden, override, Date.now());
      callback(isBlocked && !isBlockingOverriden);
    }
  );
}
