function makeKeyboardEvent(event, key, code) {
  var e = document.createEvent("KeyboardEvent");
  var initMethod = typeof e.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
  e[initMethod](event, true, true, window, false, false, false, false, key.charCodeAt(0), key.charCodeAt(0));

  e._key = key;
  e._code = code;
  document.dispatchEvent(e);
}

// Start socket.io implementation
var sock = io.connect('localhost:3000');

sock.on('connect', () => {
  sock.emit('command', 'connected');

  // Turn each input key into a simulated browser keypress
  sock.on("input", (m) => {
    makeKeyboardEvent(m.event, m.button, m.code);
  })
});
