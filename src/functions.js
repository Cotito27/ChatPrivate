const db = require("./database");
const jsonfile = require("jsonfile");
let varEnv = require('./variables');
let codigoMessage = varEnv.codigoMessage;

module.exports = {
  listarUsersExist: function (userexist, objUsers) {
    for (var i = 0; i < userexist.listusers.length; i++) {
      objUsers.listusers.push(userexist.listusers[i]);
    }
    //console.log(objUsers.listusers[0]);
    return objUsers.listusers.length;
  },

  borrarKeys: async function () {
    await db.empty();
  },

  //borrarKeys();
  guardarMessages: async function (data) {
    await db
      .set("messages", data)
      .then(() => console.log("Mensaje enviado"))
      .catch((err) => {
        console.log(err);
      });
  },

  actualizarMessages: async function () {
    let object;
    let key = await db
      .get("messages")
      .then()
      .catch((err) => {
        console.log(err);
      });
    /*for(var i=0; i<key.length; i++) {
      oldMessages.push(key[i]);
    }*/
    return key;
  },

  obtenerTodos: async function () {
    let valor = await db.getAll();
    let size = Promise.resolve(valor.messages.length).then((value) => {
      console.log(value);
      if(value != undefined){
        return size;
      } else {
        return 0;
      }
    }).catch((err) => {console.log(err)});
  },

  generarCodigoNuevo: async function (codigoglobal) {
    await jsonfile
      .writeFile("./codigo.json", codigoglobal, { spaces: 2 })
      .then(() => console.log("Codigo Exitoso"))
      .catch((err) => {
        console.log(err);
      });
  },

  guardarUser: async function (objUsers) {
    await jsonfile
      .writeFile("lista-users.json", objUsers, { spaces: 2 })
      .then(() => console.log("Usuario Exitoso"))
      .catch((err) => {
        console.log(err);
      });
  },
};
