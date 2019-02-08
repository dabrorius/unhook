import Vue from "vue/dist/vue.js";
import "./blockPage.css";

const unlockDuration = 10 * 1000; // 10 seconds

const countTo = 100;
const countStepDelay = unlockDuration / countTo;

new Vue({
  el: "#app",
  data: { counter: 0, timer: null },
  computed: {
    buttonStyleObject: function() {
      return {
        background: `linear-gradient(to top, #3C6F9466 ${this.counter}%, ${
          this.counter
        }%, #f0f0f0)`
      };
    },
    unlocking: function() {
      return this.counter > 0;
    }
  },
  methods: {
    override: function() {
      const override = new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 5);
      chrome.storage.sync.set({ override });
      window.history.back();
    },
    startCountdown: function() {
      this.count();

      console.log("Mouseover");
    },
    stopCountdown: function() {
      clearTimeout(this.timer);
      this.counter = 0;
      console.log("Mouseout");
    },
    count: function() {
      this.timer = window.setTimeout(() => {
        this.counter += 1;
        if (this.counter >= countTo) {
          this.override();
        } else {
          this.count();
        }
      }, countStepDelay);
    }
  }
});
