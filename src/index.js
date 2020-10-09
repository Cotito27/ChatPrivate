require('dotenv').config();

const app = require('./app');
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio.listen(server);

require('./sockets')[0](io);

// listening the server
async function main() {
  await server.listen(app.get('port'));
  console.log(`server on port ${app.get('port')}`);
}

main();
module.exports = {
  io
}