const fs = require('fs-extra');
const path = require('path');
const functions = require('../functions');
let userexist = require("../../lista-users.json");
let varEnv = require('../variables');
//const md5 = require('md5');
let newImg = varEnv.newImg;
const ctrl = {};

const { randomNumber } = require('../helpers/libs');

let objUsers = varEnv.objUsers;

ctrl.index = async (req, res) => {
  res.render('prueba.html',{
    newImg: req.params.image_id
  });
};

ctrl.create = async (req, res) => {
  console.log('Cambiando Imagen');
  if(!req.file || req.file == undefined || req.file == null) {
    let imgPrevious;
    const fotoDefault = '/img/avatar-login3.png';
    const userNameNull = req.body.username;
    for(let i=0; i<objUsers.listusers.length; i++) {
      if(objUsers.listusers[i].user.toUpperCase() == userNameNull) {
        imgPrevious = objUsers.listusers[i].nameFoto;
        objUsers.listusers[i].nameFoto = fotoDefault;
      }
      //console.log(objUsers.listusers[i].user, userName)
    }
    if(imgPrevious) {
      await fs.unlink(path.resolve(`src/public/upload/${imgPrevious}`)).then().catch((err) => console.log(err));
    }
    await functions.guardarUser(objUsers);
    res.send(fotoDefault);
    return;
  }
  const saveImage = async () => {
    const imgUrl = randomNumber();
    let images = [];
    console.log(imgUrl);
    for (var i = 0; i < userexist.listusers.length; i++) {
      if(userexist.listusers[i].nameFoto.replace(path.extname(userexist.listusers[i].nameFoto),'') === imgUrl) {
        images.push(userexist.listusers[i]);
      }
    }
    if (images.length > 0) {
      saveImage()
    } else {
      // Image Location
      const imageTempPath = req.file.path;
      const userName = req.body.username;
      let imgPrevious;
      const ext = path.extname(req.file.originalname).toLowerCase();
      const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
      //console.log(imageTempPath, targetPath,'path');
      // Validate Extension
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        // you wil need the public/temp path or this will throw an error

        await fs.rename(imageTempPath, targetPath);
        for(let i=0; i<objUsers.listusers.length; i++) {
          if(objUsers.listusers[i].user.toUpperCase() == userName) {
            imgPrevious = objUsers.listusers[i].nameFoto;
            objUsers.listusers[i].nameFoto = imgUrl + ext;
          }
          //console.log(objUsers.listusers[i].user, userName)
        }
        //console.log(imageTempPath);
        if(imgPrevious) {
            await fs.unlink(path.resolve(`src/public/upload/${imgPrevious}`)).then().catch((err) => console.log(err));
        }
        //console.log(objUsers.listusers, 'GUARDADO..');
        await functions.guardarUser(objUsers);
        /*const newImg = new Image({
          title: req.body.title,
          filename: imgUrl + ext,
          description: req.body.description
        });
        const imageSaved = await newImg.save();
        */
        /*res.render('index.html', {
          title: 'Chat Web',
          newImg: imgUrl + ext
        });*/
        newImg = imgUrl + ext;
        console.log(newImg, 'image');
        //res.redirect('/');
        res.send(`${imgUrl}${ext}`);
      } else {
        await fs.unlink(imageTempPath);
        res.status(500).json({ error: 'Only Images are allowed' });
      }
    }
  };

  saveImage();
};

module.exports = ctrl;