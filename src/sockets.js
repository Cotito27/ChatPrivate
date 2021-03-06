const jsonfile = require("jsonfile");
let codigoglobal = require("../codigo.json");
let userexist = require("../lista-users.json");
let varEnv = require("./variables");
let db = require("./database");
const functions = require("./functions");

let codigoUsers;

let contobj = 0;
let users = [];
let codigoMessage = varEnv.codigoMessage;
let usersOnline = varEnv.usersOnline;
let messages = varEnv.messages;
let selectedHistory = varEnv.selectedHistory;
let codigoIdUser = 0;

let indiceglobal = 0;
let oldMessages = [];
let objUsers = varEnv.objUsers;
//Database Connect

codigoUsers = codigoglobal.codigo.id;

contobj = objUsers.listusers.length;
//await client.empty();
/*let key = await client.get("producto");
    for(var i=0; i<key.length; i++) {
      console.log('\n');
      console.log('Producto '+parseInt(i+1));
      console.log('Codigo: ',key[i].codigo);
      console.log('Nombre: ',key[i].nombre);
      console.log('Marca: ',key[i].marca);
    }*/
//codigoMessage = functions.obtenerTodos();
async function actualizarMessages() {
  let valor = await db.get("messages")
  .then((value) => {
    codigoMessage = value[value.length-1].id+1;
    console.log(codigoMessage);
  })
  .catch((err) => {
    console.log(err);
  });;
}
//obtenerTodos();
actualizarMessages();
//functions.borrarKeys();
module.exports = [
  (io) => {
    io.on("connection", async (socket) => {
      //console.log(objUsers.listusers);
      console.log("conectado");
      socket.emit("obtenerLista", objUsers.listusers);
      socket.on("userConnect", function (data) {
        
        //socket.join(data.username);
        //socket.destino = data.username;
        
        var respuesta = true;
        for (let i = 0; i < usersOnline.length; i++) {
          if (usersOnline[i].username == data.username) {
            respuesta = false;
          }
        }
        if (respuesta) {
          socket.username = data.username;
          data.id = codigoIdUser;
          codigoIdUser++;
          usersOnline.push(data);
        }

        io.emit("userConnect", usersOnline, messages);
        console.log("conectando");
      });
      socket.on("obtenerUsers", function () {
        socket.emit("obtenerUsers", objUsers.listusers);
        console.log("Obtenido");
      });

      socket.on("addUser", async function (data) {
        //console.log(data);
        users.push(data);
        codigoUsers++;
        codigoglobal.codigo.id = codigoUsers;
        contobj++;
        console.log("registrando...");
        objUsers.listusers.push({
          id: contobj,
          user: data.username,
          password: data.password,
          nombres: data.nombre,
          nameFoto: data.nameFoto
        });
        await functions.guardarUser(objUsers);
        socket.emit("success");
        console.log("Registrado");
      });

      socket.on("actualizarCod", function () {});

      socket.on("sendMessage", async function (data) {
        //console.log(codigoMessage);
        data.id = codigoMessage || 0;
        codigoMessage++;
        //console.log(codigoMessage);
        console.log("Enviado ....",socket.destino,data.destino);        
        console.log(data.destino,"destino");
        
          messages.push(data);
          if(messages.length >= 60) {
            messages.splice(0,1);
          }
          console.log(messages.length);
          /*if (messages.length >= 60) {
            messages = messages.slice(messages.length - 60);
          }*/
          //console.log(messages[messages.length-1]);
          io.emit("previousMessage", data);
          if(data.destino == "Todos") {
            await functions
            .guardarMessages(messages)
            .then(()=> console.log('Recibido el mensaje'))
            .catch((err) => {
              console.log(err);
            });   
          }
          
          io.emit("sendMessage", data);   
        //generarCodigoNuevo();
      });

      socket.on("updateMessages", async function () {
        //oldMessages = await functions.actualizarMessages();
        //console.log(oldMessages);
        //console.log(oldMessages);
        oldMessages = varEnv.oldMessages;
        //console.log(oldMessages);
        //console.log(oldMessages);
        const promise1 = Promise.resolve(oldMessages);
        promise1.then((value) => {
          if (value) {
            messages = value;
            oldMessages = value;
            
          }
          /*console.log(oldMessages);
          console.log(messages);
          console.log(value);*/
          if (value != [] && value != undefined) {
            socket.emit("updateMessages", oldMessages);
          } else {
            socket.emit("updateMessages", messages);
          }
        });
        //console.log(messages);
      });

      

      socket.on("disconnect", function () {
        let userdisconnect;
        let prueba;
        if (socket.username) {
          //socket.emit("disconnectUser", userdisconnect);
          for(let i=0; i<usersOnline.length; i++) {
            if(usersOnline[i].username == socket.username) {
              userdisconnect = usersOnline[i];
              usersOnline.splice(i, 1)
            }
          }
          console.log(prueba, 'prueba');
          console.log(socket.username, "se ha desconectado");
        }

        if(userdisconnect!=undefined&&userdisconnect!=null){
          //console.log(userdisconnect);
          io.emit('userDisconnect',userdisconnect);
          socket.emit("redirectUser", userdisconnect);
        }
        io.emit("userConnect", usersOnline);
      });
      socket.on("buscarUser", function (user) {
        let respuesta = [];
        for (var i = 0; i < usersOnline.length; i++) {
          var valor = "" + usersOnline[i].nombre;
          //console.log(valor);
          //console.log(valor.includes(data));//true
          if (valor.toUpperCase().includes(user.toUpperCase())) {
            respuesta.push(usersOnline[i]);
          }
        }
        socket.emit("buscarUser", respuesta);
      });

      socket.on("selectedHistory", function(data) {
        selectedHistory.length = 0;
        selectedHistory.push(data);
        //console.log(selectedHistory);
        
      });
      socket.on("cambiarFoto", function(data) {
        io.emit("cambiarFoto", data);
      });
      socket.on("focusHistory", function() {
        socket.emit("focusHistory");
      });
      socket.on("focusAll", function() {
        socket.emit("focusAll");
      });
      socket.on("cambiarApodo", function(data) {
        io.emit("cambiarApodo", data);
      });
    });
  },
];
