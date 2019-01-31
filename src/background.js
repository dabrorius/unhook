chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.command == "close-tab") {
    chrome.tabs.query({ currentWindow: true, active: true }, function(
      tabArray
    ) {
      chrome.tabs.remove(tabArray[0].id);
    });
    sendResponse({ farewell: "tab closed" });
  }
});
