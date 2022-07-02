// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allMusic = void 0;
var allMusic = [{
  name: ' Anatolian Rock Vol. 1',
  artist: 'Sonido Solar',
  img: 'music-1',
  src: 'music-1'
}, {
  name: ' Brazilian Bossa Nova',
  artist: 'Sonido Solar',
  img: 'music-2',
  src: 'music-2'
}, {
  name: ' Female Turkish Mix',
  artist: 'Sonido Solar',
  img: 'music-3',
  src: 'music-3'
}, {
  name: ' Japan Mix Vol. 1',
  artist: 'Sonido Solar',
  img: 'music-4',
  src: 'music-4'
}];
exports.allMusic = allMusic;
},{}],"script.js":[function(require,module,exports) {
"use strict";

var _main = require("./main.js");

var wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector(".img-area img"),
    musicName = wrapper.querySelector(".song-details .name"),
    musicArtist = wrapper.querySelector(".song-details .artist"),
    playPauseBtn = document.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    mainAudio = wrapper.querySelector("#main-audio"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    musicList = wrapper.querySelector(".music-list"),
    moreMusicBtn = wrapper.querySelector("#more-music"),
    closemoreMusic = musicList.querySelector("#close");
var musicIndex = Math.floor(Math.random() * _main.allMusic.length + 1);
window.addEventListener("load", function () {
  loadMusic(musicIndex);
  playingSong();
});

function loadMusic(indexNumb) {
  musicName.innerText = _main.allMusic[indexNumb - 1].name;
  musicArtist.innerText = _main.allMusic[indexNumb - 1].artist;
  musicImg.src = "./images/".concat(_main.allMusic[indexNumb - 1].img, ".jpg");
  mainAudio.src = "Music/".concat(_main.allMusic[indexNumb - 1].src, ".mp3");
  console.log(musicImg.src);
} //play music function


function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
} //pause music function


function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
} //prev music function


function prevMusic() {
  musicIndex--; //decrement of musicIndex by 1
  //if musicIndex is less than 1 then musicIndex will be the array length so the last music play

  musicIndex < 1 ? musicIndex = _main.allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong();
} //next music function


function nextMusic() {
  musicIndex++; //increment of musicIndex by 1
  //if musicIndex is greater than array length then musicIndex will be 1 so the first music play

  musicIndex > _main.allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong();
} // play or pause button event


playPauseBtn.addEventListener("click", function () {
  var isMusicPlay = wrapper.classList.contains("paused"); //if isPlayMusic is true then call pauseMusic else call playMusic

  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
}); //prev music button event

prevBtn.addEventListener("click", function () {
  prevMusic();
}); //next music button event

nextBtn.addEventListener("click", function () {
  nextMusic();
}); // update progress bar width according to music current time

mainAudio.addEventListener("timeupdate", function (e) {
  var currentTime = e.target.currentTime; //getting playing song currentTime

  var duration = e.target.duration; //getting playing song total duration

  var progressWidth = currentTime / duration * 100;
  progressBar.style.width = "".concat(progressWidth, "%");
  var musicCurrentTime = wrapper.querySelector(".current-time"),
      musicDuration = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", function () {
    // update song total duration
    var mainAdDuration = mainAudio.duration;
    var totalMin = Math.floor(mainAdDuration / 60);
    var totalSec = Math.floor(mainAdDuration % 60);

    if (totalSec < 10) {
      //if sec is less than 10 then add 0 before it
      totalSec = "0".concat(totalSec);
    }

    musicDuration.innerText = "".concat(totalMin, ":").concat(totalSec);
  }); // update playing song current time

  var currentMin = Math.floor(currentTime / 60);
  var currentSec = Math.floor(currentTime % 60);

  if (currentSec < 10) {
    //if sec is less than 10 then add 0 before it
    currentSec = "0".concat(currentSec);
  }

  musicCurrentTime.innerText = "".concat(currentMin, ":").concat(currentSec);
}); // update playing song currentTime on according to the progress bar width

progressArea.addEventListener("click", function (e) {
  var progressWidth = progressArea.clientWidth; //getting width of progress bar

  var clickedOffsetX = e.offsetX; //getting offset x value

  var songDuration = mainAudio.duration; //getting song total duration

  console.log(songDuration);
  mainAudio.currentTime = clickedOffsetX / progressWidth * songDuration;
  playMusic(); //calling playMusic function

  playingSong();
}); //change loop, shuffle, repeat icon onclick

var repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", function () {
  var getText = repeatBtn.innerText; //getting this tag innerText

  switch (getText) {
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;

    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;

    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
}); //code for what to do after song ended

mainAudio.addEventListener("ended", function () {
  // we'll do according to the icon means if user has set icon to
  // loop song then we'll repeat the current song and will do accordingly
  var getText = repeatBtn.innerText; //getting this tag innerText

  switch (getText) {
    case "repeat":
      nextMusic(); //calling nextMusic function

      break;

    case "repeat_one":
      mainAudio.currentTime = 0; //setting audio current time to 0

      loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song

      playMusic(); //calling playMusic function

      break;

    case "shuffle":
      var randIndex = Math.floor(Math.random() * _main.allMusic.length + 1); //genereting random index/numb with max range of array length

      do {
        randIndex = Math.floor(Math.random() * _main.allMusic.length + 1);
      } while (musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex


      musicIndex = randIndex; //passing randomIndex to musicIndex

      loadMusic(musicIndex);
      playMusic();
      playingSong();
      break;
  }
}); //show music list onclick of music icon

moreMusicBtn.addEventListener("click", function () {
  musicList.classList.toggle("show");
  console.log('clicked');
});
closemoreMusic.addEventListener("click", function () {
  moreMusicBtn.click();
});
var ulTag = wrapper.querySelector("ul"); // let create li tags according to array length for list

var _loop = function _loop(i) {
  //let's pass the song name, artist from the array
  var liTag = "<li li-index=\"".concat(i + 1, "\">\n                <div class=\"row\">\n                  <span>").concat(_main.allMusic[i].name, "</span>\n                  <p>").concat(_main.allMusic[i].artist, "</p>\n                </div>\n                <span id=\"").concat(_main.allMusic[i].src, "\" class=\"audio-duration\"></span>\n                <audio class=\"").concat(_main.allMusic[i].src, "\" src=\"Music/").concat(_main.allMusic[i].src, ".mp3\"></audio>\n              </li>");
  console.log(liTag);
  ulTag.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag

  var liAudioDurationTag = ulTag.querySelector("#".concat(_main.allMusic[i].src));
  console.log(ulTag);
  var liAudioTag = ulTag.querySelector("#".concat(_main.allMusic[i].src));
  console.log(liAudioTag);
  liAudioTag.addEventListener("loadeddata", function () {
    var duration = liAudioTag.duration;
    var totalMin = Math.floor(duration / 60);
    var totalSec = Math.floor(duration % 60);

    if (totalSec < 10) {
      //if sec is less than 10 then add 0 before it
      totalSec = "0".concat(totalSec);
    }

    ;
    liAudioDurationTag.innerText = "".concat(totalMin, ":").concat(totalSec); //passing total duation of song

    liAudioDurationTag.setAttribute("t-duration", "".concat(totalMin, ":").concat(totalSec)); //adding t-duration attribute with total duration value

    console.log(liAudioDurationTag);
  });
};

for (var i = 0; i < _main.allMusic.length; i++) {
  _loop(i);
} //play particular song from the list onclick of li tag


function playingSong() {
  var allLiTag = ulTag.querySelectorAll("li");

  for (var j = 0; j < allLiTag.length; j++) {
    var audioTag = allLiTag[j].querySelector(".audio-duration");

    if (allLiTag[j].classList.contains("playing")) {
      allLiTag[j].classList.remove("playing");
      var adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    } //if the li tag index is equal to the musicIndex then add playing class in it


    if (allLiTag[j].getAttribute("li-index") == musicIndex) {
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
} //particular li clicked function


function clicked(element) {
  var getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; //updating current song index with clicked li index

  loadMusic(musicIndex);
  playMusic();
  playingSong();
}
},{"./main.js":"main.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "35421" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map