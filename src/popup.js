const stemUrl = url => url.replace(/(https?:\/\/)?(www.)?([^\/]*).*/, "$3");

var app = new Vue({
  el: "#app",
  data: {
    currentUrl: null,
    isBlocked: false
  },
  methods: {
    toggleUrlBlocking: function() {
      console.log("Toggle blocking called");
      chrome.tabs.query({ currentWindow: true, active: true }, tabArray => {
        const rawUrl = tabArray[0].url;
        console.log(`Raw url: ${rawUrl}`);
        const url = stemUrl(rawUrl);
        chrome.storage.sync.get({ blockList: [] }, result => {
          let { blockList } = result;
          console.log(`:: ${url} -> ${blockList}`);

          const isBlocked = blockList.includes(url);
          if (isBlocked) {
            blockList = blockList.filter(item => item !== url);
          } else {
            blockList.push(url);
          }
          console.log(`:: ${url} -> ${blockList}`);
          this.isBlocked = !isBlocked;
          chrome.storage.sync.set({ blockList });
        });
      });
    }
  },
  mounted() {
    chrome.tabs.query({ currentWindow: true, active: true }, tabArray => {
      const url = stemUrl(tabArray[0].url);
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
