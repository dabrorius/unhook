import { isWebsiteBlocked } from "./helpers/isWebsiteBlocked";

var root = document.getElementsByTagName("html")[0];

isWebsiteBlocked(isBlocked => {
  console.log("Is blocked?", isBlocked);
  if (isBlocked) {
    document.location.replace(browser.extension.getURL("blockPage.html"));
  }
});
