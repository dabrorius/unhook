import { isWebsiteBlocked } from "./helpers/isWebsiteBlocked";

var root = document.getElementsByTagName("html")[0];
root.classList.add("unhook-blockedContent");

isWebsiteBlocked(isBlocked => {
  if (!isBlocked) {
    root.classList.remove("unhook-blockedContent");
  } else {
    window.location = browser.extension.getURL("blockPage.html");
  }
});
