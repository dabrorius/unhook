var app = new Vue({
  el: "#app",
  data: {
    currentUrl: null,
    message: "Hello Vue!"
  },
  mounted() {
    chrome.tabs.query({ currentWindow: true, active: true }, tabArray => {
      const url = sanitizeURL(tabArray[0].url);
      if (url !== "chrome:") {
        this.currentUrl = url;
      }
    });

    chrome.storage.sync.get({ blockList: [] }, result => {
      const { blockList } = result;
      this.message = blockList.join(",");
      console.log(result);
    });
  }
});

function sanitizeURL(url) {
  return url.replace(/(https?:\/\/)?(www.)?([^\/]*).*/, "$3");
}
