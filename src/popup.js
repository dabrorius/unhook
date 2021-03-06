import Vue from "vue/dist/vue.js";
import { getCurrentURL } from "./helpers/getCurrentURL";
import { stemURL } from "./helpers/stemURL";

import "./style.css";
import "./icons/icon16.png";
import "./icons/icon24.png";
import "./icons/icon32.png";
import "./icons/icon128.png";
import "./images/email.svg";
import "./images/logo.svg";
import "./images/meditate.svg";
import "./images/octopus.svg";
import "./manifest.json";

var app = new Vue({
  el: "#app",
  data: {
    currentUrl: null,
    isBlocked: false,
    override: false
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
      chrome.storage.sync.get({ blockList: [], override: false }, result => {
        const { blockList, override } = result;
        this.isBlocked = blockList.includes(url);
        this.override = override;
        console.log(result);
      });
    });
  }
});
