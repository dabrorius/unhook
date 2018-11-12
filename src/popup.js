import Vue from "vue/dist/vue.js";
import { getCurrentURL } from "./helpers/getCurrentURL";
import { stemURL } from "./helpers/stemURL";

var app = new Vue({
  el: "#app",
  data: {
    currentUrl: null,
    isBlocked: false
  },
  methods: {
    toggleUrlBlocking: function() {
      getCurrentURL().then(rawUrl => {
        const url = stemURL(rawUrl);
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
      const url = stemURL(rawUrl);
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
