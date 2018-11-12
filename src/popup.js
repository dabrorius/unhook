const stemUrl = url => url.replace(/(https?:\/\/)?(www.)?([^\/]*).*/, "$3");

function getCurrentURL() {
  return new Promise(resolve => {
    chrome.tabs.query({ currentWindow: true, active: true }, tabArray => {
      const rawUrl = tabArray[0].url;
      resolve(rawUrl);
    });
  });
}

var app = new Vue({
  el: "#app",
  data: {
    currentUrl: null,
    isBlocked: false
  },
  methods: {
    toggleUrlBlocking: function() {
      getCurrentURL().then(rawUrl => {
        const url = stemUrl(rawUrl);
        chrome.storage.sync.get({ blockList: [] }, result => {
          let { blockList } = result;

          const isBlocked = blockList.includes(url);
          if (isBlocked) {
            blockList = blockList.filter(item => item !== url);
          } else {
            blockList.push(url);
          }

          this.isBlocked = !isBlocked;
          chrome.storage.sync.set({ blockList });
        });
      });
    }
  },
  mounted() {
    getCurrentURL().then(rawUrl => {
      const url = stemUrl(rawUrl);
      if (url !== "chrome:") {
        this.currentUrl = url;
      }
      chrome.storage.sync.get({ blockList: [] }, result => {
        const { blockList } = result;
        this.isBlocked = blockList.includes(url);
        console.log(result);
      });
    });
  }
});
