function getTime() {
  return new Date().getTime() / 1000;
}
let localStorage = window.localStorage;
var root = document.getElementsByTagName("html")[0];

console.log("Running now!");
runCheck(true);

function runCheck(initialCheck) {
  // Hide all content
  // root.classList.add("unhook-blockedContent");

  // Load Options
  chrome.storage.sync.get(
    {
      overrideDuration: 300,
      overrideDelay: 15,
      blockList: [],
      licenseKey: null,
      licenseId: null,
      activeDays: [true, true, true, true, true, true, true],
      activeFrom: "00:00",
      activeTo: "23:59",
      lastOverriden: null
    },
    function(options) {
      console.log("Got storage!");
      let currentUrl = window.location.toString();
      console.log(currentUrl);
      // debugger;

      let blockList = options.blockList;
      let isBlocked = false;
      console.log("Block list:", blockList);
      for (let site of blockList) {
        var regex = new RegExp(`.*${site}.*`);
        isBlocked = isBlocked || regex.test(currentUrl);
      }
      console.log("Is blocked", isBlocked);
      console.log("Document?", document);

      if (isBlocked) {
        document.title = "Blocked";
        document.onreadystatechange = () => {
          if (document.readyState === "complete") {
            console.log("Complete!");
          }
        };

        // showPopup(300, 15);
        // window.location = "http://www.duckduckgo.com";
        setInterval(() => {
          console.log("Call!");
          // window.location = "http://www.duckduckgo.com";
        }, 1000);
        // window.addEventListener("load", () => console.log("LOADED!"), false);
        window.onload = function() {
          document.title = "Blocked";

          showPopup(300, 15);
        };
      } else {
        root.classList.remove("unhook-blockedContent");
      }

      // let overrideDuration = options["overrideDuration"];
      // let overrideDelay = options["overrideDelay"];
      // let lastOverriden = localStorage.getItem("lastOverriden");
      // let isOverriden =
      //   lastOverriden && getTime() - lastOverriden < overrideDuration;
      // let isActiveToday = options.activeDays[new Date().getDay()];

      // let d = new Date();
      // let activeFrom = options.activeFrom.split(":");
      // let activeTo = options.activeTo.split(":");
      // let fromDate = new Date(
      //   d.getFullYear(),
      //   d.getMonth(),
      //   d.getDate(),
      //   activeFrom[0],
      //   activeFrom[1]
      // );
      // let toDate = new Date(
      //   d.getFullYear(),
      //   d.getMonth(),
      //   d.getDate(),
      //   activeTo[0],
      //   activeTo[1]
      // );
      // let isActiveAtThisTime = fromDate < d && d < toDate;

      // Check if site is blacklisted

      // if (isBlocked && isActiveToday && isActiveAtThisTime) {
      //   if (isOverriden) {
      //     let untilOverrideOver =
      //       overrideDuration - (getTime() - lastOverriden);
      //     window.setTimeout(function() {
      //       runCheck(false);
      //     }, 1000 * untilOverrideOver);
      //   } else {
      //     if (initialCheck) {
      //       window.onload = function() {
      //         showPopup(overrideDuration, overrideDelay);
      //       };
      //     } else {
      //       showPopup(overrideDuration, overrideDelay);
      //     }
      //   }
      // }
    }
  );
}

function showPopup(overrideDuration, overrideDelay) {
  // Create overlay
  let overlay = document.createElement("div");
  console.log("Creating popup");
  let logo = document.createElement("img");
  logo.src = chrome.extension.getURL("images/logo.svg");
  logo.className = "unhook-logo";
  logo.onclick = function() {
    window.open("https://unhook.io");
  };
  overlay.appendChild(logo);

  var message = document.createTextNode("Getting pulled in again?");
  overlay.appendChild(message);
  overlay.className = "unhook-overlay";
  document.body.appendChild(overlay);

  let image = document.createElement("img");
  image.src = chrome.extension.getURL("images/octopus.svg");
  image.className = "unhook-splash-image";
  overlay.appendChild(image);

  let closeButton = document.createElement("button");
  closeButton.className = "unhook-closeButton";
  closeButton.textContent = "I've got better things to do";
  closeButton.onclick = function() {
    chrome.runtime.sendMessage({ command: "close-tab" }, function(response) {
      console.log("response", response);
    });
  };
  overlay.appendChild(closeButton);

  let overrideInstructions = document.createElement("div");

  let overrideButton = document.createElement("button");
  overrideButton.textContent = "It's really important! Let me in.";
  overrideButton.className = "unhook-overrideButton";
  overlay.appendChild(overrideButton);
  overrideButton.onclick = function() {
    overlay.removeChild(overrideButton);

    var overrideInstructionsText = document.createTextNode(
      `You will have to wait out the delay time first.`
    );
    overrideInstructions.className = "unhook-overrideInstructions";
    overrideInstructions.appendChild(overrideInstructionsText);
    overlay.appendChild(overrideInstructions);

    // Progress bar
    let progressBarBg = document.createElement("div");
    progressBarBg.className = "unhook-progressBg";

    let progressBar = document.createElement("div");
    progressBar.className = "unhook-progress";

    progressBarBg.appendChild(progressBar);
    overlay.appendChild(progressBarBg);

    let startTime = new Date().getTime();
    let interval = setInterval(function() {
      let currentTime = new Date().getTime();
      let difference = currentTime - startTime;
      let percentage = (difference / overrideDelay / 1000) * 100;
      progressBar.style = `width: ${percentage}%`;
      if (percentage >= 100) {
        localStorage.setItem("lastOverriden", getTime());
        document.body.removeChild(overlay);
        window.setTimeout(function() {
          runCheck(false);
        }, 1000 * overrideDuration);
        clearInterval(interval);
      }
    }, 50);
  };

  // Display content
  root.classList.remove("unhook-blockedContent");
}
