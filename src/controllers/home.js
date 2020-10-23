const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
let varEnv = require('../variables');


let usersOnline = varEnv.usersOnline;
let messages = varEnv.messages;
let selectedHistory = varEnv.selectedHistory;
let oldMessages = [];
let newImg = varEnv.newImg;
let objUsers = varEnv.objUsers;
function fileExists(path) {
  try {
    return fs.statSync(path).isFile();
  } catch (e) {
    return false;
  }
}
const ctrl = {};

ctrl.index = async (req, res) => {
  oldMessages = await varEnv.oldMessages
    .then()
    .catch((err) => {
      console.log(err);
    }) || [];
  if (messages.length != undefined) {
    if (messages.length >= 1) {
      oldMessages = messages;
    }
  }
  if(oldMessages.length == undefined) {
    console.log('Error de conexion');
  }
  for(let i=0; i<oldMessages.length; i++) {
    for(let j=0; j<objUsers.listusers.length; j++) {
        if(oldMessages[i].username.toUpperCase() == objUsers.listusers[j].user.toUpperCase()) {
         
          if(oldMessages[i].foto != '/img/avatar-login3.png' && !oldMessages[i].foto.includes('upload')) {
            oldMessages[i].foto = `/upload/${objUsers.listusers[j].nameFoto}`;
          }
          
          oldMessages[i].foto = `/upload/${objUsers.listusers[j].nameFoto}`;
          //console.log(path.resolve(`src/public/${oldMessages[i].foto}`));
          //console.log(oldMessages[i].foto, oldMessages[i].username);
          if(!fileExists(path.resolve(`src/public/${oldMessages[i].foto}`)) || !oldMessages[i].foto.includes('upload')) {
            oldMessages[i].foto = '/img/avatar-login3.png';
          }
      }
      
    }
    
  }
  
  console.log(newImg, 'image');
  if(!newImg || newImg.length) {
    newImg = '/img/avatar-login3.png';
  }
  if (oldMessages) {
    res.render("index.html", {
      title: "Chat Web",
      content: "page-message",
      validado: req.body,
      redirect: "page-login",
      dataMessages: oldMessages,
      dataUsers: usersOnline,
      userDefault: uuid,
      userHistory: oldMessages[oldMessages.length - 1],
      selectedHistory,
      newImg
    });
  } else {
    res.render("index.html", {
      title: "Chat Web",
      content: "page-message",
      validado: req.body,
      redirect: "page-login",
      dataMessages: oldMessages,
      dataUsers: usersOnline,
      userDefault: uuid,
      userHistory: [],
      selectedHistory,
      newImg
    });
  }
};

ctrl.register = async (req, res) => {
  if(!newImg || newImg.length) {
    newImg = '/img/avatar-login3.png';
  }
  if (oldMessages) {
    res.render("index.html", {
      title: "Chat Web",
      content: "page-message",
      validado: req.body,
      redirect: "page-register",
      dataMessages: oldMessages,
      dataUsers: usersOnline,
      userDefault: uuid,
      userHistory: oldMessages[oldMessages.length - 1],
      selectedHistory,
      newImg
    });
    //console.log(req.body);
  } else {
    res.render("index.html", {
      title: "Chat Web",
      content: "page-message",
      validado: req.body,
      redirect: "page-register",
      dataMessages: oldMessages,
      dataUsers: usersOnline,
      userDefault: uuid,
      userHistory: [],
      selectedHistory,
      newImg
    });
    //console.log(req.body);
  }
};

module.exports = ctrl;
