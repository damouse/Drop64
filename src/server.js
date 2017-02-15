const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) { res.sendFile('display.html', { root: 'views' }) })
app.get('/controller', function(req, res) { res.sendFile('controller.html', { root: 'views' }) })

for (var d of["stylesheets", "vendor", "sensors", "src"]) { app.use('/assets', express.static(d)) }

io.on('connection', function(socket) {
  socket.on("controller", function(m) {
    console.log(m);
    io.emit('input', m)
  });
  socket.on("command", function(m) {
    console.log(m);
    io.emit('command', m);
  });
});

const port = process.env.PORT || 3000;
console.log("Server starting on port: ", port);
http.listen(port, '0.0.0.0');
