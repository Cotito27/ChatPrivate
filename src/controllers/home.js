const uuid = require('uuid');
const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');
let varEnv = require('../variables');
const { response } = require('express');


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
async function listarAudiosExist(RUTA_FOLDER) {
  let response = [];
  await fsPromise.readdir(RUTA_FOLDER, function (err, archivos) {}).then((val) => response = val).catch((err) => console.log(err));
  return response;
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
  let RUTA_FOLDER = path.resolve(`src/public/upload`);
  let calcAudios = await listarAudiosExist(RUTA_FOLDER);
  let audiosInitial = [];
  for(let i=0; i<calcAudios.length; i++) {
    if(calcAudios[i].includes('.webm')) {
      audiosInitial.push(calcAudios[i]);
    }
  }
  console.log(audiosInitial.length);
  let responseAudio = "";
  let portUrl = process.env.PORT || 3000;
  let urlOrigin = 'http://' + req.hostname+ ':' + portUrl;
  let urlOrigin2 = 'https://' + req.hostname+ ':' + portUrl;
  let urlOrigin3 = 'https://' + req.hostname;
  let urlOrigin6 = 'http://' + req.hostname;
  let urlOrigin4 = 'http://' + req.hostname+ ':' + portUrl + '/';
  let urlOrigin5 = 'https://' + req.hostname+ ':' + portUrl + '/';
  let contVeriAudio = 0;
  let veriCheck = {};
  let varNoRepit = {};
  let elementsExist = [];
  oldMessages.forEach((oldM) => {
    audiosInitial.forEach((audI) => {
      if(oldM.message.includes('<video width="340" height="50" controls>')) {
        contVeriAudio++;
        /*responseAudio = oldM.message.replace(oldM.message.substr(oldM.message.length-37,oldM.message.length-1),'');
        responseAudio = responseAudio.split('<source src="');
        responseAudio[1] = responseAudio[1].replace(urlOrigin5, '').replace(urlOrigin4, '').replace(urlOrigin2,'').replace(urlOrigin,'').replace(urlOrigin3,'').replace(urlOrigin6,'').replace('upload/','');
        console.log(responseAudio[1], audI);
        console.log(audI, oldM);*/
        if(!oldM.message.includes(audI)) {
          if(veriCheck[audI] != true) {
            veriCheck[audI] = false;
          }
          //fs.unlink(path.resolve(`src/public/upload/${audI}`));;
          //console.log(audI, false);
        }
        if(oldM.message.includes(audI)) {
          veriCheck[audI] = true;
          //console.log(audI, true);
        } 
        
      }
    })
  })
  //let rr = false;
  audiosInitial.forEach((audI) => {
    if(!veriCheck[audI]) {
      fs.unlink(path.resolve(`src/public/upload/${audI}`));
    }
  })
  //console.log(veriCheck);
  if(contVeriAudio <= 0 && audiosInitial.length >= 1) {
    for(let i=0; i<audiosInitial.length; i++) {
      fs.unlink(path.resolve(`src/public/upload/${audiosInitial[i]}`));
    }
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
