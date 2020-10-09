let functions = require('./functions');

let messages = [];
let usersOnline = [];
let codigoMessage = 0;
let oldMessages = [];
let selectedHistory = [];
oldMessages = functions.actualizarMessages();
module.exports = {
  messages,usersOnline,codigoMessage,oldMessages,selectedHistory
}