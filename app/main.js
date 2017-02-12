var statusElement = document.getElementById('status');
var progressElement = document.getElementById('progress');
var spinnerElement = document.getElementById('spinner');

var Module = {
  preRun: (function() {
    document.getElementById('filechooser').style.visibility = 'visible';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('status').style.display = 'none';
  })(),
  postRun: [],
  noInitialRun: true,
  print: (function() {
    var element = document.getElementById('output');
    if (element) element.value = ''; // clear browser cache
    return function(text) {
      text = Array.prototype.slice.call(arguments).join(' ');
      // These replacements are necessary if you render to raw HTML
      //text = text.replace(/&/g, "&amp;");
      //text = text.replace(/</g, "&lt;");
      //text = text.replace(/>/g, "&gt;");
      //text = text.replace('\n', '<br>', 'g');
      // console.log(text);
      if (element) {
        element.value += text + "\n";
        element.scrollTop = element.scrollHeight; // focus on bottom
      }
    };
  })(),
  printErr: function(text) {
    text = Array.prototype.slice.call(arguments).join(' ');
    if (0) { // XXX disabled for safety typeof dump == 'function') {
      dump(text + '\n'); // fast, straight to the real console
    } else {
      console.error(text);
    }
  },
  canvas: document.getElementById('canvas'),
  setStatus: function(text) {
    if (!Module.setStatus.last) Module.setStatus.last = {
      time: Date.now(),
      text: ''
    };
    if (text === Module.setStatus.text) return;
    var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
    var now = Date.now();
    if (m && now - Date.now() < 30) return; // if this is a progress update, skip it if too soon
    if (m) {
      text = m[1];
      progressElement.value = parseInt(m[2]) * 100;
      progressElement.max = parseInt(m[4]) * 100;
      progressElement.hidden = false;
      spinnerElement.hidden = false;
    } else {
      progressElement.value = null;
      progressElement.max = null;
      progressElement.hidden = true;
      if (!text) spinnerElement.style.display = 'none';
    }
    statusElement.innerHTML = text;
  },
  totalDependencies: 0,
  monitorRunDependencies: function(left) {
    this.totalDependencies = Math.max(this.totalDependencies, left);
    Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies - left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
  }
};

Module.setStatus('Downloading...');

var socket = io.connect('localhost:3000');

function makeKeyboardEvent(event, key) {
  var e = document.createEvent("KeyboardEvent");
  var initMethod = typeof e.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

  e[initMethod](event, true, true, window, false, false, false, false, key.charCodeAt(0), key.charCodeAt(0));
  e._key = key;
  e._code = 13;

  document.dispatchEvent(e);
}

function mycode() {
  makeKeyboardEvent("keydown", 'Enter');

  setTimeout(function() {
    makeKeyboardEvent("keyup", 'Enter');
  }, 100);

  // console.log("Emitting")
  // socket.emit("input", "Hello");
}


var tid = setInterval(mycode, 1000);

function abortTimer() { // to be called when you want to stop the timer
  clearInterval(tid);
}

// Ending fun stuff

/*
Todo: 
  - Ionic setup
  - Frontend Setup
  - Websocket command proxying
  - Basic sensors
  - Is multiplayer possible?
*/
