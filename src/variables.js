let functions = require('./functions');
let userexist = require('../lista-users.json');

let messages = [];
let usersOnline = [];
let codigoMessage = 0;
let oldMessages = [];
let selectedHistory = [];
oldMessages = functions.actualizarMessages();
let objUsers = {
  listusers: [],
};
for (let i = 0; i < userexist.listusers.length; i++) {
  objUsers.listusers.push(userexist.listusers[i]);
}
module.exports = {
  messages,usersOnline,codigoMessage,oldMessages,selectedHistory, newImg: '', objUsers
}