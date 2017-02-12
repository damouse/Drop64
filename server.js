const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/assets', express.static('./app'));
app.get('/', (req, res) => { res.sendFile('index.html', { root: './app' }) })

io.on('connection', (socket) => {
  socket.on("input", (m) => {
    console.log(m);
  })
});

http.listen(port, '0.0.0.0');;
