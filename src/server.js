const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => { res.sendFile('display.html', { root: 'views' }) })
app.get('/controller', (req, res) => { res.sendFile('controller.html', { root: 'views' }) })

for (var d of["stylesheets", "vendor", "sensors", "src"]) {
  app.use('/assets', express.static(d));
}

io.on('connection', (socket) => {
  socket.on("controller", (m) => {
    console.log(m)
    io.emit('input', m)
  })
  socket.on("command", (m) => io.emit('command', m))
});

const port = process.env.PORT || 3000;
console.log("Server starting on port: ", port);
http.listen(port, '0.0.0.0');
