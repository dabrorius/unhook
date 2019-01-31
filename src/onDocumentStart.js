var root = document.getElementsByTagName("html")[0];
root.classList.add("unhook-blockedContent");
console.log("Hide content called compiled!");
console.log("Rogiinal title", document.title);

chrome.storage.sync.get(
  {
    blockList: []
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

    if (!isBlocked) {
      root.classList.remove("unhook-blockedContent");
    }
  }
);
