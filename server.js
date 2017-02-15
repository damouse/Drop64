const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/assets', express.static('./app'));
app.get('/', (req, res) => { res.sendFile('index.html', { root: './app' }) })

io.on('connection', (socket) => {
  socket.on("controller", (m) => io.emit('input', m))
  socket.on("command", (m) => io.emit('command', m))
});

const port = process.env.PORT || 3000;
console.log("Server starting on port: ", port);
http.listen(port, '0.0.0.0');
