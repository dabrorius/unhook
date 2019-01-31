/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/onDocumentIdle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/onDocumentIdle.js":
/*!*******************************!*\
  !*** ./src/onDocumentIdle.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function getTime() {\n  return new Date().getTime() / 1000;\n}\nlet localStorage = window.localStorage;\nvar root = document.getElementsByTagName(\"html\")[0];\n\nconsole.log(\"Running now!\");\nrunCheck(true);\n\nfunction runCheck(initialCheck) {\n  // Hide all content\n  // root.classList.add(\"unhook-blockedContent\");\n\n  // Load Options\n  chrome.storage.sync.get(\n    {\n      overrideDuration: 300,\n      overrideDelay: 15,\n      blockList: [],\n      licenseKey: null,\n      licenseId: null,\n      activeDays: [true, true, true, true, true, true, true],\n      activeFrom: \"00:00\",\n      activeTo: \"23:59\",\n      lastOverriden: null\n    },\n    function(options) {\n      console.log(\"Got storage!\");\n      let currentUrl = window.location.toString();\n      console.log(currentUrl);\n      // debugger;\n\n      let blockList = options.blockList;\n      let isBlocked = false;\n      console.log(\"Block list:\", blockList);\n      for (let site of blockList) {\n        var regex = new RegExp(`.*${site}.*`);\n        isBlocked = isBlocked || regex.test(currentUrl);\n      }\n      console.log(\"Is blocked\", isBlocked);\n      console.log(\"Document?\", document);\n\n      if (isBlocked) {\n        document.title = \"Blocked\";\n        document.onreadystatechange = () => {\n          if (document.readyState === \"complete\") {\n            console.log(\"Complete!\");\n          }\n        };\n\n        // showPopup(300, 15);\n        // window.location = \"http://www.duckduckgo.com\";\n        setInterval(() => {\n          console.log(\"Call!\");\n          // window.location = \"http://www.duckduckgo.com\";\n        }, 1000);\n        // window.addEventListener(\"load\", () => console.log(\"LOADED!\"), false);\n        window.onload = function() {\n          document.title = \"Blocked\";\n\n          showPopup(300, 15);\n        };\n      } else {\n        root.classList.remove(\"unhook-blockedContent\");\n      }\n\n      // let overrideDuration = options[\"overrideDuration\"];\n      // let overrideDelay = options[\"overrideDelay\"];\n      // let lastOverriden = localStorage.getItem(\"lastOverriden\");\n      // let isOverriden =\n      //   lastOverriden && getTime() - lastOverriden < overrideDuration;\n      // let isActiveToday = options.activeDays[new Date().getDay()];\n\n      // let d = new Date();\n      // let activeFrom = options.activeFrom.split(\":\");\n      // let activeTo = options.activeTo.split(\":\");\n      // let fromDate = new Date(\n      //   d.getFullYear(),\n      //   d.getMonth(),\n      //   d.getDate(),\n      //   activeFrom[0],\n      //   activeFrom[1]\n      // );\n      // let toDate = new Date(\n      //   d.getFullYear(),\n      //   d.getMonth(),\n      //   d.getDate(),\n      //   activeTo[0],\n      //   activeTo[1]\n      // );\n      // let isActiveAtThisTime = fromDate < d && d < toDate;\n\n      // Check if site is blacklisted\n\n      // if (isBlocked && isActiveToday && isActiveAtThisTime) {\n      //   if (isOverriden) {\n      //     let untilOverrideOver =\n      //       overrideDuration - (getTime() - lastOverriden);\n      //     window.setTimeout(function() {\n      //       runCheck(false);\n      //     }, 1000 * untilOverrideOver);\n      //   } else {\n      //     if (initialCheck) {\n      //       window.onload = function() {\n      //         showPopup(overrideDuration, overrideDelay);\n      //       };\n      //     } else {\n      //       showPopup(overrideDuration, overrideDelay);\n      //     }\n      //   }\n      // }\n    }\n  );\n}\n\nfunction showPopup(overrideDuration, overrideDelay) {\n  // Create overlay\n  let overlay = document.createElement(\"div\");\n  console.log(\"Creating popup\");\n  let logo = document.createElement(\"img\");\n  logo.src = chrome.extension.getURL(\"images/logo.svg\");\n  logo.className = \"unhook-logo\";\n  logo.onclick = function() {\n    window.open(\"https://unhook.io\");\n  };\n  overlay.appendChild(logo);\n\n  var message = document.createTextNode(\"Getting pulled in again?\");\n  overlay.appendChild(message);\n  overlay.className = \"unhook-overlay\";\n  document.body.appendChild(overlay);\n\n  let image = document.createElement(\"img\");\n  image.src = chrome.extension.getURL(\"images/octopus.svg\");\n  image.className = \"unhook-splash-image\";\n  overlay.appendChild(image);\n\n  let closeButton = document.createElement(\"button\");\n  closeButton.className = \"unhook-closeButton\";\n  closeButton.textContent = \"I've got better things to do\";\n  closeButton.onclick = function() {\n    chrome.runtime.sendMessage({ command: \"close-tab\" }, function(response) {\n      console.log(\"response\", response);\n    });\n  };\n  overlay.appendChild(closeButton);\n\n  let overrideInstructions = document.createElement(\"div\");\n\n  let overrideButton = document.createElement(\"button\");\n  overrideButton.textContent = \"It's really important! Let me in.\";\n  overrideButton.className = \"unhook-overrideButton\";\n  overlay.appendChild(overrideButton);\n  overrideButton.onclick = function() {\n    overlay.removeChild(overrideButton);\n\n    var overrideInstructionsText = document.createTextNode(\n      `You will have to wait out the delay time first.`\n    );\n    overrideInstructions.className = \"unhook-overrideInstructions\";\n    overrideInstructions.appendChild(overrideInstructionsText);\n    overlay.appendChild(overrideInstructions);\n\n    // Progress bar\n    let progressBarBg = document.createElement(\"div\");\n    progressBarBg.className = \"unhook-progressBg\";\n\n    let progressBar = document.createElement(\"div\");\n    progressBar.className = \"unhook-progress\";\n\n    progressBarBg.appendChild(progressBar);\n    overlay.appendChild(progressBarBg);\n\n    let startTime = new Date().getTime();\n    let interval = setInterval(function() {\n      let currentTime = new Date().getTime();\n      let difference = currentTime - startTime;\n      let percentage = (difference / overrideDelay / 1000) * 100;\n      progressBar.style = `width: ${percentage}%`;\n      if (percentage >= 100) {\n        localStorage.setItem(\"lastOverriden\", getTime());\n        document.body.removeChild(overlay);\n        window.setTimeout(function() {\n          runCheck(false);\n        }, 1000 * overrideDuration);\n        clearInterval(interval);\n      }\n    }, 50);\n  };\n\n  // Display content\n  root.classList.remove(\"unhook-blockedContent\");\n}\n\n\n//# sourceURL=webpack:///./src/onDocumentIdle.js?");

/***/ })

/******/ });