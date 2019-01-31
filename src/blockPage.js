import Vue from "vue/dist/vue.js";
import "./blockPage.css";

new Vue({
  el: "#app",
  data: {},
  methods: {
    override: function() {
      const override = new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 5);
      console.log("Overriding!", override);

      chrome.storage.sync.set({ override });
    }
  }
});
