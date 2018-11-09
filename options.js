let blockList = [];
let activeDays;

function sanitizeURL(url) {
  return url.replace(/(https?:\/\/)?(www.)?([^\/]*).*/, "$3");
}

function initializeOptionSelector(elementId, optionName, options) {
  let element = document.getElementById(elementId);
  element.value = options[optionName];
  element.addEventListener("change", function() {
    let setter = {};
    setter[optionName] = element.value;
    chrome.storage.sync.set(setter);
  });
}

function showAlert(message, type = "bad") {
  let messageDiv = document.createElement("div");
  messageDiv.className = `animated fadeInDown alert ${type}`;
  let messageText = document.createTextNode(message);
  messageDiv.appendChild(messageText);
  document.body.appendChild(messageDiv);
  setTimeout(() => document.body.removeChild(messageDiv), 4000);
}

// Load Data
document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.sync.get(
    {
      overrideDuration: 300,
      overrideDelay: 15,
      blockList: [],
      licenseKey: null,
      licenseId: null,
      activeDays: [true, true, true, true, true, true, true],
      activeFrom: "00:00",
      activeTo: "23:59"
    },
    function(options) {
      document.getElementById("licensed").classList.remove("hide");
      document.getElementById("unlicensed").classList.add("hide");

      // Override Duration
      initializeOptionSelector(
        "overrideDurationInput",
        "overrideDuration",
        options
      );
      initializeOptionSelector("overrideDelayInput", "overrideDelay", options);
      initializeOptionSelector("fromSelector", "activeFrom", options);
      initializeOptionSelector("toSelector", "activeTo", options);

      // Block List
      blockList = options.blockList;
      redrawBlockList();

      // Active days
      activeDays = options.activeDays;
      activeDays.forEach((active, index) => {
        let checkbox = document.getElementById(`dayCheckbox-${index}`);
        checkbox.checked = active;
        checkbox.addEventListener("change", function() {
          let day = this.id[this.id.length - 1];
          activeDays[day] = this.checked;
          chrome.storage.sync.set({
            activeDays: activeDays
          });
        });
      });

      // Load active URL
      chrome.tabs.query({ currentWindow: true, active: true }, function(
        tabArray
      ) {
        let input = document.getElementById("addSiteInput");
        let url = sanitizeURL(tabArray[0].url);
        if (url !== "chrome:") {
          input.value = url;
        }
      });
    }
  );
});

function redrawBlockList() {
  let blockListElement = document.getElementById("blockList");
  blockListElement.innerHTML = "";
  if (blockList.length > 0) {
    document.getElementById("empty-state-message").classList.add("hide");
  } else {
    document.getElementById("empty-state-message").classList.remove("hide");
  }
  for (let site of blockList.reverse()) {
    let li = document.createElement("li");
    let icon = document.createElement("i");
    icon.className = "fa fa-globe";

    li.appendChild(icon);
    li.appendChild(document.createTextNode(site));

    let removeButton = document.createElement("i");
    removeButton.className = "fa fa-times";

    removeButton.onclick = function() {
      let index = blockList.indexOf(site);
      blockList.splice(index, 1);
      chrome.storage.sync.set({ blockList: blockList });
      redrawBlockList();
    };
    li.appendChild(removeButton);

    blockListElement.appendChild(li);
  }
}

// Add Site
document.getElementById("addSiteButton").addEventListener("click", function() {
  let newSite = sanitizeURL(document.getElementById("addSiteInput").value);

  if (blockList.includes(newSite)) {
    showAlert("Domain is already on the block list");
  } else if (!/^[^\s]+\.[^\s\.]+$/.test(newSite)) {
    showAlert("Invalid domain");
  } else {
    blockList.push(newSite);
    chrome.storage.sync.set({ blockList: blockList });
    redrawBlockList();
  }
});

// Unlock button
document.getElementById("unlockButton").addEventListener("click", function() {
  let licenceKey = document.getElementById("licenceKeyInput").value;
  var http = new XMLHttpRequest();
  var url = "https://api.gumroad.com/v2/licenses/verify";
  var params = `product_permalink=unhook&license_key=${licenceKey}`;
  http.open("POST", url, true);

  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
    //Call a function when the state changes.
    if (http.readyState == 4) {
      let parsedResponse = JSON.parse(http.responseText);
      let validKey = parsedResponse.success;
      let unusedKey = parsedResponse.uses <= 1;
      if (validKey) {
        let uuid =
          Math.random()
            .toString(36)
            .substring(2) +
          Math.random()
            .toString(36)
            .substring(2) +
          Math.random()
            .toString(36)
            .substring(2) +
          new Date().getTime().toString(36);
        chrome.storage.sync.set(
          { licenseId: uuid, licenseKey: licenceKey },
          function() {
            showAlert(
              "Thank you! Your Unhook extension is now active.",
              "good"
            );
            updateLicenseStatus(true);
          }
        );
      } else {
        showAlert("License key seems to be invalid. Please try again.");
      }
    }
  };
  http.send(params);
});
