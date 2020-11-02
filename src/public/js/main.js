/*if(location.href == location.origin|| location.href == location.origin+'/') {
  if(sessionStorage.username){
    location.href = '/'+sessionStorage.username;
  } 
} else {
  location.href = location.origin;
}*/

//const { usersOnline } = require("../../variables");

/*if(sessionStorage.username) {
  if(!location.href.includes(sessionStorage.username)){
    location.href = '/'+sessionStorage.username;
  }
} else {
  if(location.href.includes(sessionStorage.username)){
    location.href = '/';
  }
}*/

$(document).ready(function () {
  //alert(location.origin + " " +location.href);
  const socket = io();
  
  function resizePage() {
    if ($(window).width() <= 550) {
      $(".card-message").css("height", $(window).height() - 202 + "px");
      $(".card-message").css("max-height", $(window).height() - 202 + "px");
      $(".card-users").css("height", $(window).height() - 127 + "px");
      $(".card-users").css("max-height", $(window).height() - 127 + "px");
      $(".card-config").css("height", $(window).height() - 129 + "px");
      $(".card-config").css("max-height", $(window).height() - 129 + "px");
      $(".card-history").css("height", $(window).height() - 62 + "px");
      $(".card-history").css("max-height", $(window).height() - 62 + "px");
    } else {
      $(".card-message").css("height", $(window).height() - 238 + "px");
      $(".card-message").css("max-height", $(window).height() - 238 + "px");
      $(".card-users").css("height", $(window).height() - 163 + "px");
      $(".card-users").css("max-height", $(window).height() - 163 + "px");
      $(".card-config").css("height", $(window).height() - 165 + "px");
      $(".card-config").css("max-height", $(window).height() - 165 + "px");
      $(".card-history").css("height", $(window).height() - 98 + "px");
      $(".card-history").css("max-height", $(window).height() - 98 + "px");
    }
  }
  const fotoDefault = "/img/avatar-login3.png";
  sessionStorage.foto = fotoDefault;
  const fotoToastDefault = '/img/avatar-login4.png';
  let destinoOrigin = $(".title-destino").html();
  let redirec = ["config", "history", "users", "message", "history"];
  function statusSelected() {
    if(!sessionStorage.selected) {
      changeBackground($(".btnmessage"));
      changeColor($(".btnmessage").find(".iconmessage,.iconusers,.iconconfig"));
      for (let i = 0; i < redirec.length; i++) {
        if (redirec[i] == "message") {
          //$('.row').hide();
          $(`#content-${redirec[i]}`).show();
          sessionStorage.selected = redirec[i];
          
          $(`#content-${redirec[i]}`).addClass('selectedItem');
        } else {
          $(`#content-${redirec[i]}`).hide();
        }
      }
    }
    if (
      sessionStorage.selected == "message" ||
      sessionStorage.selected == "history" || sessionStorage.selected == undefined
    ) {
      changeBackground($(".btnmessage"));
      changeColor($(".btnmessage").find(".iconmessage,.iconusers,.iconconfig"));
      for (let i = 0; i < redirec.length; i++) {
        if (redirec[i] == sessionStorage.selected) {
          //$('.row').hide();
          $(`#content-${redirec[i]}`).show();
          sessionStorage.selected = redirec[i];
          
          $(`#content-${redirec[i]}`).addClass('selectedItem');
        } else {
          $(`#content-${redirec[i]}`).hide();
        }
      }
    } else if (sessionStorage.selected == "users") {
      changeBackground($(".btnusers"));
      changeColor($(".btnusers").find(".iconmessage,.iconusers,.iconconfig"));
      for (let i = 0; i < redirec.length; i++) {
        if (redirec[i] == sessionStorage.selected) {
          $(`#content-${redirec[i]}`).show();
          sessionStorage.selected = redirec[i];
        } else {
          $(`#content-${redirec[i]}`).hide();
        }
      }
    } else if (sessionStorage.selected == "config") {
      changeBackground($(".btnconfig"));
      changeColor($(".btnconfig").find(".iconmessage,.iconusers,.iconconfig"));
      for (let i = 0; i < redirec.length; i++) {
        if (redirec[i] == sessionStorage.selected) {
          $(`#content-${redirec[i]}`).show();
          sessionStorage.selected = redirec[i];
        } else {
          $(`#content-${redirec[i]}`).hide();
        }
      }
    }
  }
  console.log(sessionStorage.selected);
  statusSelected();
  if(!sessionStorage.sonido) {
    sessionStorage.sonido = "sound";
  }
  if(sessionStorage.sonido=="nosound"){
    $('#defaultCheck1').prop('checked', false);
  }else{
    $('#defaultCheck1').prop('checked', true);
  }
  
  /*if(sessionStorage.username && sessionStorage.nombre) {
    socket.emit("userConnect", {
      username: sessionStorage.username,
      nombre: sessionStorage.nombre,
      foto: sessionStorage.foto || fotoDefault,
    });
  }*/
  function optionsToast() {
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": true,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "4000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  }
  optionsToast();
  //verificarSonido();
  let varDestino;
  function estadoMenu() {
    if (
      location.href == location.origin + "/" ||
      location.href == location.origin ||
      location.href == location.origin + "/page-message"
    ) {
      changeBackground($(".btnmessage"));
      changeColor($(".btnmessage").find(".iconmessage,.iconusers,.iconconfig"));
    } else if (location.href == location.origin + "/page-users") {
      changeBackground($(".btnusers"));
      changeColor($(".btnusers").find(".iconmessage,.iconusers,.iconconfig"));
    } else if (location.href == location.origin + "/page-config") {
      changeBackground($(".btnconfig"));
      changeColor($(".btnconfig").find(".iconmessage,.iconusers,.iconconfig"));
    }
  }
  resizePage();
  //estadoMenu();
  $(window).resize(function () {
    resizePage();
  });
  $(window).scroll(function() {
    resizePage();
  });
  
  function changeBackground(element) {
    $(".btnsmenu").css("background", "#343a40");
    $(element).css("background", "purple");
  }
  function changeColor(element) {
    $(".iconsform1").addClass("text-white");
    $(element).removeClass("text-white");
    $(element).addClass("selectedOption");
  }
  $(".btnmessage,.btnusers,.btnconfig").click(function () {
    changeBackground(this);
    changeColor($(this).find(".iconmessage,.iconusers,.iconconfig"));
  });

  $(".btnmessage").click(function () {
    //location.href = 'page-message';
    if($('#content-message').hasClass('selectedItem')) {
      $('.row').hide();
      $('#content-message').show();
      sessionStorage.selected = "message";
      actualizarSelectMenu();
      return;
    } else if($('#content-history').hasClass('selectedItem')) {
      $('.row').hide();
      $('#content-history').show();
      sessionStorage.selected = "history";
      actualizarSelectMenu();
      return;
    }
    for (let i = 0; i < redirec.length; i++) {
      if (redirec[i] == "message") {
        $(`#content-${redirec[i]}`).show();
        sessionStorage.selected = redirec[i];
        
      } else {
        $(`#content-${redirec[i]}`).hide();
      }
    }
    actualizarSelectMenu();
    bajarScroll();
  });
  function actualizarSelectMenu() {
    socket.emit('selectedHistory', sessionStorage.selected);
  }
  $(".btnusers").click(function () {
    //location.href = 'page-users';
    
    for (let i = 0; i < redirec.length; i++) {
      if (redirec[i] == "users") {
        $(`#content-${redirec[i]}`).show();
        sessionStorage.selected = redirec[i];
      } else {
        $(`#content-${redirec[i]}`).hide();
      }
    }
    actualizarSelectMenu();
  });
  $(".btnconfig").click(function () {
    //location.href = 'page-config';
    for (let i = 0; i < redirec.length; i++) {
      if (redirec[i] == "config") {
        $(`#content-${redirec[i]}`).show();
        sessionStorage.selected = redirec[i];
      } else {
        $(`#content-${redirec[i]}`).hide();
      }
    }
    actualizarSelectMenu();
  });
  function backPanelMessages(data) {
    $(".btn-prepanel").click(function () {
      if(data) {
        $('.panel-message').hide();
      }
      for (let i = 0; i < redirec.length; i++) {
        if (redirec[i] == "history") {
          $(`#content-${redirec[i]}`).show();
          sessionStorage.selected = redirec[i];
          sessionStorage.selectedItem = redirec[i];
          $(`#content-${redirec[i]}`).addClass('selectedItem');
          $('#content-message').removeClass('selectedItem');
        } else {
          $(`#content-${redirec[i]}`).hide();
        }
      }
      actualizarSelectMenu();
    });
  }
  backPanelMessages(false);
  function nextPanelMessages(data) {
    $(".messageschatnoti").each(function(){
    $(this).click(function () {
      if(data) {
        for (let i = 0; i < redirec.length; i++) {
          if (redirec[i] == "message") {
            $(`#content-${redirec[i]}`).show();
            sessionStorage.selected = redirec[i];
            $(`#content-${redirec[i]}`).addClass('selectedItem');
            $('#content-history').removeClass('selectedItem');
          } else {
            $(`#content-${redirec[i]}`).hide();
          }
        }
      } else {
        
        $('#content-history').hide();
        let userVar = $(this).find(".contenidochatmessages").find(".name-user-history").html();
        let destino = $('.panel-message').find('.container-destino').find('.selectorUser').val();
        var idHistory = this.id.replace('userhistory','');
        if(idHistory == -1 || idHistory == "-1") {
          $('.panel-message').hide();
          $('#panelM').show();
        } else {
          $('.panel-message').hide();
          $(`#destinoM${idHistory}`).text(userVar);
          let $panelScroll = $(`#panelM${idHistory}`).find('.card-message');
          $panelScroll.scrollTop($panelScroll.prop('scrollHeight'));
          $(`#panelM${idHistory}`).show();
        }
        //$('.panel-message').hide();
        $('#content-message').show();
        console.log(idHistory, 'panelM');
        let $msgNewNumber = $(this).find('.contenidochatmessages').find('.messagenofocus').find('.myNumberNoti');
        
        if($msgNewNumber) {
            $msgNewNumber.hide();
            numberNoti-=parseInt($msgNewNumber.text());
            $msgNewNumber.text('0');
            
            if($(this).attr('id') == "userhistory-1") {
              if(varHistoryAll > 0) {
                varHistoryAll = 0;
              } else {
                varHistoryAll = varHistoryAll;
              }
              
              //alert(varHistoryAll);
            } else {
              numberUnic = 0;
            }
            
        if(numberNoti > 0) {
              $('.numberNoti').text(numberNoti);
        } else {
              $('.numberNoti').hide();
        }
      }
        
        $(this).removeClass('newMessage');
      }
      bajarScroll();
      focusMessage();
      destinoOrigin = $(`#destinoM${idHistory}`).html();
      /*for(let i=0; i<data.length; i++) {
        if(data[i].nombre == destinoOrigin) {
          destinoOrigin = data[i].username;
        }
      }*/
      sessionStorage.selected = "message";
      $(`#content-message`).addClass('selectedItem');
      $('#content-history').removeClass('selectedItem');
      actualizarSelectMenu();
      //numberNoti = 0;
      //$('.numberNoti').hide();
    });
  });
  }
  nextPanelMessages(true);
  if (
    !sessionStorage.username ||
    sessionStorage.username == "" ||
    sessionStorage.username == null ||
    sessionStorage.username == undefined
  ) {
    $("#myModal").modal("show");
  }
  $("#formLogin").submit(function (e) {
    e.preventDefault();
    validarUsuario($("#user").val(), $("#pass").val());
  });
  $("#formRegister").submit(function (e) {
    e.preventDefault();
    if ($("#passuser").val() == $("#passuser2").val()) {
      registrarUsuario(
        $("#nomuser").val(),
        $("#correouser").val(),
        $("#passuser").val()
      );
      sessionStorage.foto = $(".imgRegister").attr("src") || fotoDefault;
    }
  });
  let listaUsers = [];
  async function isUrlFound(url) {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        cache: 'no-cache'
      });

      return response.status === 200;

    } catch(error) {
      // console.log(error);
      return false;
    }
}
  socket.on("obtenerLista", async function(data) {
    listaUsers = data;
    let fotoUserName;
    for(let i = 0; i < data.length; i++) {
      
      if(data[i].user.toUpperCase() == sessionStorage.username) {
          let valid = await isUrlFound(`../upload/${data[i].nameFoto}`);
          if(valid) {
              fotoUserName = data[i].nameFoto;
            } 
        }
      
    }
    console.log(fotoUserName);
    if(fotoUserName != fotoDefault && fotoUserName != undefined) {
      sessionStorage.foto = `/upload/${fotoUserName}`;
    } else {
      sessionStorage.foto = fotoDefault;
    }
    if (sessionStorage.username) {
      socket.emit("userConnect", {
        username: sessionStorage.username,
        nombre: sessionStorage.nombre,
        foto: sessionStorage.foto || fotoDefault,
      });
    }
    socket.emit('cambiarFoto', {
      username: sessionStorage.username,
      foto: sessionStorage.foto
    });
    if(sessionStorage.foto != undefined) {
      $("#imgUserConfig,.imgRegister").attr("src", sessionStorage.foto || fotoDefault);
    } else {
      $("#imgUserConfig,.imgRegister").attr("src", fotoDefault);
    }
    //console.log(sessionStorage.foto);
    //console.log('Lista Obtenida');
    //console.log(listaUsers);
  });
  
  function registrarUsuario(nom, user, pass) {
    
    //console.log(nom, user, pass);
    var respuesta = true;
        for (let i = 0; i < listaUsers.length; i++) {
          if (listaUsers[i].user == user) {
            respuesta = false;
          }
        }
        if (respuesta) {
          socket.emit("addUser", {
            nombre: nom,
            username: user,
            password: pass,
            nameFoto: fotoDefault
          });
        } else {
          (async() => {
            //swal("Success!", "Se han guardado los cambios ", "success");
            swal("Error!", "Este usuario ya existe :(", "error");
          })();
          $('#formRegister')[0].reset();
        }
    
    //socket.emit('actualizarCod');
  }
  function validarUsuario(user, pass) {
    socket.emit("obtenerUsers");

    socket.on("obtenerUsers", function (data) {
      var respuesta = false;
      var nomUser;
      var fotoUserName;
      //console.log(data);
      for (let i = 0; i < data.length; i++) {
        //console.log(user, data[i].user);
        if (data[i].user.toUpperCase() != user.toUpperCase() || data[i].password != pass) {
        } else {
          nomUser = data[i].nombres;
          respuesta = true;
          fotoUserName = data[i].nameFoto;
        }
      }
      //console.log(respuesta);
      if (respuesta) {
        //console.log("Logeado");
        if(fotoUserName != fotoDefault) {
          sessionStorage.foto = `/upload/${fotoUserName}`;
        } else {
          sessionStorage.foto = fotoUserName;
        }
        
        sessionStorage.nombre = nomUser.toUpperCase().replace(/[_\W]+/g,'_');
        sessionStorage.username = user.toUpperCase().replace(/[_\W]+/g,'_');
        if(!sessionStorage.foto) {
          sessionStorage.foto = $(".imgRegister").attr("src") || fotoDefault;
        }
        
        socket.emit("userConnect", {
          username: sessionStorage.username,
          nombre: sessionStorage.nombre,
          foto: sessionStorage.foto || fotoDefault,
        });
        //location.href="/"+sessionStorage.username;
        location.reload();
      } else {
        swal("Error!", "Datos Incorrectos, verifique que se haya registrado", "error");
        $('#formLogin')[0].reset();
        //return;
      }
    });
  }
  $('.nameUserConfig').text(sessionStorage.nombre);
  $('.inputUser').val(sessionStorage.username);
  function updateUsers(data, buscar) {
    let html = "";
    
    if (!buscar) {
      $('.numberUsers').text(data.length);
      html += `
        <h3 class="titulousers">Usuarios Conectados (${data.length})</h3>
              <hr style="color: black; background: black; font-weight: bold;" />
        `;
    } else {
      html +=
        `<h3 class="titulousers">` +
        $(`.titulousers`).html() +
        `</h3>
      <hr />`;
    }
    let varUserColor = "";
    for (let i = 0; i < data.length; i++) {
      if(i%2 == 0) {
        varUserColor = " variarColorUser";
      } else {
        varUserColor = "";
      }
      if(data[i].username == sessionStorage.username){
        
        html += `
              <div class="contenidousers">
                <div class="subcontenidousers${varUserColor}">
                  <div class="cotenidoimguser">
                    <img
                      class="imguser_mini message${data[i].username}"
                      id="imageuser${data[i].id}"
                      src="${data[i].foto}"
                    />
                  </div>
                  <div class="nomuser">
                    <strong class="myUserName" id="user${data[i].id}">${data[i].nombre}</strong>
                  </div>
                </div>
                
              </div>
        `;
    
    if (html == "") {
      html += `
        <h3 class="titulousers">Usuarios Conectados (${1})</h3>
              <hr />
              <div class="contenidousers">
                <div class="subcontenidousers${varUserColor}">
                  <div class="cotenidoimguser">
                    <img
                      class="imguser_mini message${sessionStorage.username}"
                      id="imageuser${0}"
                      src="${sessionStorage.foto || fotoDefault}"
                    />
                  </div>
                  <div class="nomuser">
                    <strong class="myUserName" id="user${0}">${sessionStorage.nombre}</strong>
                  </div>
                </div>
                
              </div>
        `;
      }
      } else {
        html += `
              <div class="contenidousers">
                <div class="subcontenidousers${varUserColor}">
                  <div class="cotenidoimguser">
                    <img
                      class="imguser_mini message${data[i].username}"
                      id="imageuser${data[i].id}"
                      src="${data[i].foto}"
                    />
                  </div>
                  <div class="nomuser">
                    <strong class="otherUserName" id="user${data[i].id}">${data[i].nombre}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  id="${data[i].id}"
                  class="popover1"
                  data-container="body"
                  data-toggle="popover"
                  data-placement="left"
                  data-trigger="focus"
                  data-content="Enviar mensaje"
                >
                  <i class="far fa-comment-dots" aria-hidden="true"></i>
                </button>
              </div>
        `;
    
    if (html == "") {
      html += `
        <h3 class="titulousers">Usuarios Conectados (${1})</h3>
              <hr />
              <div class="contenidousers">
                <div class="subcontenidousers${varUserColor}">
                  <div class="cotenidoimguser">
                    <img
                      class="imguser_mini message${sessionStorage.username}"
                      id="imageuser${0}"
                      src="${sessionStorage.foto || fotoDefault}"
                    />
                  </div>
                  <div class="nomuser">
                    <strong class="otherUserName" id="user${0}">${sessionStorage.nombre}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  id="1"
                  class="popover1"
                  data-container="body"
                  data-toggle="popover"
                  data-placement="left"
                  data-trigger="focus"
                  data-content="Enviar mensaje"
                >
                  <i class="far fa-comment-dots" aria-hidden="true"></i>
                </button>
              </div>
        `;
      }
    }
    }
    return html;
  }
  var iduser = 0;
  let replaceuser = "";
  let replaceuser2 = "";
  function actualizarUsers() {
    socket.on("userConnect", function (data) {
      
      let verificar;
      let fotoLastUser;
      if(data != [] && data) {
        verificar = data[data.length-1].username;
        fotoLastUser = data[data.length-1].foto;
      } else {
        verificar = data[0].username;
        fotoLastUser = data[0].foto;
      }
      let userlast = "";
      let html = updateUsers(data, false);
      editNickName(data);
      //console.log(verificar, sessionStorage.username);
      if(verificar!=sessionStorage.username){
        for(let i=0; i<data.length; i++) {
          if(data[i].username == verificar) {
            userlast = data[i].nombre;
          }
        }
        //contadoruserlast++;
        //console.log(fotoLastUser);
        if($('.toast')[0]){
        if(!$('.toast').html().includes(`<strong>${replaceuser}</strong> se ha unido al chat.`)){
          Command: toastr["info"](`&nbsp;<strong>${userlast.toUpperCase()}</strong> se ha unido al chat.`); 
          replaceuser=userlast.toUpperCase();
          $('.toast-info:last').css('background-image', `url("${fotoLastUser || fotoToastDefault}")`);
        }
        }else{
          Command: toastr["info"](`&nbsp;<strong>${userlast.toUpperCase()}</strong> se ha unido al chat.`);
          replaceuser=userlast.toUpperCase();
          $('.toast-info:last').css('background-image', `url("${fotoLastUser || fotoToastDefault}")`);
        }
      }
      $(".users-history").html(html);
      userOrigin = data;
      $(".popover1").click(function () {
        iduser = this.id;
        $(this).popover("show");
      });
      $(".popover1").on("shown.bs.popover", function () {
        $(".popover-body").click(function () {
          //console.log("panel");
          //numberNoti = 0;
          //$('.numberNoti').hide();
          addPanel(data, iduser);
          bajarScroll();
          focusMessage();
        });
      });
    });
  }
  
  actualizarUsers();
  function enviarMensaje(user, message, fotoUser) {
    let destino_user = "Todos";
    $('.panel-message').each(function() {
      if($(this).is(':visible')) {
        destino_user = $(this).find('.container-destino').find('input').val();
      }
    });
    //console.log(destino_user,"usuario destino");
    
    var dateTime = moment().format("hh:mm a").toUpperCase();
    message = message.replace(/[<]+/g,'_').replace(/[>]+/g,'_');
    if (fotoUser == undefined || fotoUser == null || fotoUser == "") {
      socket.emit("sendMessage", {
        username: user,
        nombre: sessionStorage.nombre,
        message: message,
        date: dateTime,
        foto: fotoDefault,
        destino: destino_user
      });
    } else {
      socket.emit("sendMessage", {
        username: user,
        nombre: sessionStorage.nombre,
        message: message,
        date: dateTime,
        foto: fotoUser,
        destino: destino_user
      });
    }
    $(".textMessage").val("");
    $(".textMessage").focus();
  }
  
  function addEventsMessage() {
    /*$(".textMessage").off('keypress',function(e){});
    $(".btnenvio").off('click',function(){});*/
    $('.textMessage').off('keypress').on('keypress', function (e) {
      
      if (e.keyCode == 13) {
        e.preventDefault();
        //console.log('Evento!!');
        if ($(this).val() != "") {
          enviarMensaje(
            sessionStorage.username,
            $(this).val(),
            sessionStorage.foto
          );
        }
      } else {
          if($(this).val().includes('[') || $(this).val().includes(']')) {
          e.preventDefault();
          return;
        }
      }

    });
    /*$(".textMessage").keypress(function (e) {  
      if (e.keyCode == 13) {
        e.preventDefault();
        console.log('Evento!!');
        if ($(this).val() != "") {
          enviarMensaje(
            sessionStorage.username,
            $(this).val(),
            sessionStorage.foto
          );
        }
      }
    });*/
      $(".btnEnvio").off('click').on('click', function () {
        $('.panel-message').each(function() {
          if($(this).is(':visible')) {
            let textArea = $(this).find('.card-footer').find('.form-message').find('.textMessage').val();
            if(textArea != "") {
              enviarMensaje(
                sessionStorage.username,
                textArea,
                sessionStorage.foto
              );
            }
          }
        });
        /*if($(".panel-message").is(':visible')){
          if ($(".textMessage").val() != "") {
            enviarMensaje(
              sessionStorage.username,
              $(".textMessage").val(),
              sessionStorage.foto
            );
            console.log($(".textMessage").val());
          }
          
        } */ 
        //console.log("Enviado");
      });
    
    
  }
  addEventsMessage();
  let codSound = 0;
  let vecSound = [];
  function addSound() {
    let audio = document.createElement('audio');
    audio.className = "fotoUser-"+sessionStorage.username+codSound;
    vecSound.push(codSound);
    codSound++;
    audio.src = "../audio/samsung-sound.mp3";
    $('body').append(audio);
    audio.play();
      for(let i=0; i<vecSound.length; i++) {
        $(`.fotoUser-${sessionStorage.username}${vecSound[i]}`).bind('ended', function(){
          $(`.fotoUser-${sessionStorage.username}${vecSound[i]}`).remove();
        });
      }
  }
  let userOrigin;
  function verificarFocusHistory() {
    socket.on('focusHistory', function() {
      $('.row').hide();
      $('#content-history').show();
    });
  }
  verificarFocusHistory();
  let varHistoryAll = 0;
  function obtenerMensajes() {
    socket.on("previousMessage", function (data) {
      var confirmador = false;
      data.message = _showEmoji(data.message);
      if(data.destino == "Todos") {
        for(let i=0; i<nickNameChange.length; i++) {
          //console.log(nickNameChange[i]);
          if(nickNameChange[i].usuario != "") {
            if(nickNameChange[i].usuario == data.username) {
              data.nombre = nickNameChange[i].nombre;
            }
          }
        }
      }
      
      
      var chatarea = "";
      $('.card-message').each(function() {
        if($(this).is(':visible')) {
          chatarea = this;
        }
      });
      //data.message = encodeURI(data.message);
      //data.message = data.message.replace(/[_\W]+/g,'_');
      
      if (
        chatarea.offsetHeight + chatarea.scrollTop ==
          chatarea.scrollHeight + 2 ||
        chatarea.offsetHeight + chatarea.scrollTop >= chatarea.scrollHeight
      ) {
        confirmador = true;
      } else {
        confirmador = false;
      }
      let userDestino;
      let codPri = 0;
      for(let i = 0; i<userOrigin.length; i++) {
        if(userOrigin[i].username == data.username) {
          codPri = userOrigin[i].id;
        }
      }
      let codAux = 0;
        if(data.destino != "Todos") {
        if (data.username == sessionStorage.username) {
          if($(`.${data.destino}`)[0]) {
            $(`.${data.destino}`).find('.contenidochatmessages').find('.messagenofocus').find('.contenidomessagenofocus').text(data.message);
          }
          /*let messagePrevious = $('.nom-user-message:last').html();
          if(data.username == messagePrevious) {
            
          }*/
          $(`#${data.username}${data.destino}`).append(`
            <div id="mensaje${data.id}" class="identMessage mymessage message${data.username}">
            <div class="contenidoimg">
            <img class="imguser" src="${data.foto}">
            </div>
            <div class="mycontenidomessage">
              
            <strong class="nom-user-message">${data.nombre}</strong>
            <p class="res-message">${data.message}</p>
            
            </div><div class="horamessage">
                <small class="hora">${data.date}</small>
                <input type="hidden" class="idUsername" value="${data.username}">
            </div>
            <label id="${data.id}"><i class="far fa-clock icon-loader"></i></label>
          </div>`);
 
          bajarScroll();
        } else {
          
          $(`#${data.username}${data.destino}`).append(`
          <div id="mensaje${data.id}" class="identMessage othermessage message${data.username}">
              <div class="contenidoimg">
               <img class="imguser" src="${data.foto}">
              </div>
              <div class="othercontenidomessage">
               
              <strong class="nom-user-message">${data.nombre}</strong>
              <p class="res-message">${data.message}</p>
              
              </div><div class="horamessage">
              <small class="hora">${data.date}</small>
              <input type="hidden" class="idUsername" value="${data.username}">
              </div>
            </div>`);
            if(data.destino == sessionStorage.username) {
              if(sessionStorage.sonido == "sound") {
                addSound();
              }
            }
            
        }
        console.log(data.username, data.destino);
        if(sessionStorage.username == data.destino || data.destino == data.username) {
          
          /*if($(`.${data.username}`)[0]) {
            $(`.${data.username}`).find('.contenidochatmessages').find('.messagenofocus').find('.contenidomessagenofocus').text(data.message);
          }*/
          if (data.username == sessionStorage.username) {
           
          $(`#${data.destino}${data.username}`).append(`
                <div id="mensaje${data.id}" class="identMessage mymessage message${data.username}">
                <div class="contenidoimg">
                <img class="imguser" src="${data.foto}">
                </div>
                <div class="mycontenidomessage">
                  
                <strong class="nom-user-message">${data.nombre}</strong>
                <p class="res-message">${data.message}</p>
                
                </div><div class="horamessage">
                    <small class="hora">${data.date}</small>
                    <input type="hidden" class="idUsername" value="${data.username}">
                </div>
                <label id="${data.id}"><i class="far fa-clock icon-loader"></i></label>
              </div>`);
          } else {

              //data.username = data.destino;
              addPanelOther(data, codPri);
              //console.log('xd22222');
             
            $(`#${data.destino}${data.username}`).append(`
            <div id="mensaje${data.id}" class="identMessage othermessage message${data.username}">
                <div class="contenidoimg">
                 <img class="imguser" src="${data.foto}">
                </div>
                <div class="othercontenidomessage">
                 
                <strong class="nom-user-message">${data.nombre}</strong>
                <p class="res-message">${data.message}</p>
                
                </div><div class="horamessage">
                <small class="hora">${data.date}</small>
                <input type="hidden" class="idUsername" value="${data.username}">
                </div>
              </div>`);
              if(sessionStorage.sonido == "sound") {
                addSound();
              }
              
          }
        }
      }
        if(data.destino == "Todos") {
          if (data.username == sessionStorage.username) {
            if($(`.${data.destino}`)[0]) {
              $(`.${data.destino}`).find('.contenidochatmessages').find('.messagenofocus').find('.contenidomessagenofocus').text(data.message);
            }
            /*let messagePrevious = $('.nom-user-message:last').html();
            if(data.username == messagePrevious) {
              
            }*/
            $(`#Todos`).append(`
              <div id="mensaje${data.id}" class="identMessage mymessage message${data.username}">
              <div class="contenidoimg">
              <img class="imguser" src="${data.foto}">
              </div>
              <div class="mycontenidomessage">
                
              <strong class="nom-user-message">${data.nombre}</strong>
              <p class="res-message">${data.message}</p>
              
              </div><div class="horamessage">
                  <small class="hora">${data.date}</small>
                  <input type="hidden" class="idUsername" value="${data.username}">
              </div>
              <label id="${data.id}"><i class="far fa-clock icon-loader"></i></label>
            </div>`);
   
            bajarScroll();
          } else {
            
            $(`#Todos`).append(`
            <div id="mensaje${data.id}" class="identMessage othermessage message${data.username}">
                <div class="contenidoimg">
                 <img class="imguser" src="${data.foto}">
                </div>
                <div class="othercontenidomessage">
                 
                <strong class="nom-user-message">${data.nombre}</strong>
                <p class="res-message">${data.message}</p>
                
                </div><div class="horamessage">
                <small class="hora">${data.date}</small>
                <input type="hidden" class="idUsername" value="${data.username}">
                </div>
              </div>`);
                if(sessionStorage.sonido == "sound") {
                  addSound();
                }
              
          }
          if($(`#userhistory-1`)[0]) {
            $(`#userhistory-1`).remove();
          }
          let compHistory = "";
            compHistory += `<div class="messageschatnoti Todos message${data.username}" id="userhistory-1">

            <div class="contenidoimg">
              <img class="imguser imghistory" src="${data.foto}" />
            </div>
            <div class="contenidochatmessages">
              <strong class="name-user-history" id="username">${"Todos"}</strong>
              <div class="messagenofocus">
              <p class="contenidomessagenofocus">${data.message}</p>
                <small class="myNumberNoti codigoNumber${data.username}${data.destino}">0</small>
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>`;
          compHistory += $('.chatnotify').html();
          $(".chatnotify")
            .html(compHistory);
          sessionStorage.selected = "message";
          nextPanelMessages(false);
          resizePage();
          
          if($(`#panelM`).is(':hidden')) {
            $(`#userhistory-1`).each(function() {
              
              $(this).addClass('newMessage');
              let $msgNewNumber = $(this).find('.contenidochatmessages').find('.messagenofocus').find('.myNumberNoti');
              console.log($msgNewNumber.text());
              //console.log(numberUnic);
              if(numberNoti<=0){
                numberNoti+=varHistoryAll;
              }
              numberNoti++;
              $('.numberNoti').text(numberNoti);
              $('.numberNoti').show();
              
              if(historyNumber == data.id || historyNumber == "") {
                varHistoryAll = 0;
                varHistoryAll++;
                $msgNewNumber.text(varHistoryAll);
                $msgNewNumber.show();
                //$('.myNumberNoti').text(numberUnic);
              } else {
                varHistoryAll++;
                $msgNewNumber.text(varHistoryAll);
                $msgNewNumber.show();
                //$('.myNumberNoti').text(numberUnic);
              }
              
              console.log(varHistoryAll);
              historyNumber = data.id;
            });
            
            if(sessionStorage.username != data.username){
              if(sessionStorage.sonido == "sound") {
                addSound();
              }
            }
            Command: toastr["info"](`<div class="mensajeOtherNoti"><strong class="nomNoti">${data.nombre}</strong> <br> <label class="messageNoti">${data.message}</label> <br> 
            <small class="lighter">Presione aquí para ver los mensajes</small> </div>`);
            //$('.messageNoti').text(data.message);
            $('.toast-info:last').css('margin-left', '5px');
            $('.toast-info:last').css('background-image', `url("${data.foto || fotoToastDefault}")`);
            if($(window).width() > 480) {
              $('.toast-info:last').css('background-position', '10px 19px'); 
            } else {
              $('.toast-info:last').css('background-position', '10px 13px'); 
            }
            
          }
          
        }
        if(sessionStorage.username != data.username) {
          if($(`#panelM${data.username}${data.destino}`).is(':hidden')) {
            Command: toastr["info"](`<div class="mensajeOtherNoti"><strong class="nomNoti">${data.nombre}</strong> <br> <label class="messageNoti">${data.message}</label> <br> 
            <small class="lighter">Presione aquí para ver los mensajes</small> </div>`);
            //$('.messageNoti').text(data.message);
            $('.toast-info:last').css('margin-left', '5px');
            $('.toast-info:last').css('background-image', `url("${data.foto || fotoToastDefault}")`);
            if($(window).width() > 480) {
              $('.toast-info:last').css('background-position', '10px 19px'); 
            } else {
              $('.toast-info:last').css('background-position', '10px 13px'); 
            }
          }
          if($(`#panelM${data.destino}${data.username}`).is(':hidden')) {
            Command: toastr["info"](`<div class="mensajeOtherNoti"><strong class="nomNoti">${data.nombre}</strong> <br> <label class="messageNoti">${data.message}</label> <br> 
            <small class="lighter">Presione aquí para ver los mensajes</small> </div>`);
            //$('.messageNoti').text(data.message);
            $('.toast-info:last').css('margin-left', '5px');
            $('.toast-info:last').css('background-image', `url("${data.foto || fotoToastDefault}")`);
            if($(window).width() > 480) {
              $('.toast-info:last').css('background-position', '10px 19px'); 
            } else {
              $('.toast-info:last').css('background-position', '10px 13px'); 
            }
          }
        }
        console.log(`${data.username}${data.destino}`, codAux, codPri);
        $('.mensajeOtherNoti').each(function() {
          $(this).click(function() {
            socket.emit('focusHistory');
            $(".btnmessage").click();
              /*$('.row').hide();
              $('#content-history').show();*/
            
          });
        });
        //console.log($(`#panelM`).is(':hidden'));
        //$(`#userhistory${codPri}`).find('.contenidochatmessages').find('.name-user-history').text(data.nombre);
        console.log(data.username, data.destino);
        if(data.destino != "Todos" && (data.destino == data.username || data.destino == sessionStorage.username)) {
          if(data.message.includes('<img class="emoji"')) {
            $(`#userhistory${data.destino}${data.username}`).find('.contenidochatmessages').find('.messagenofocus').find('.contenidomessagenofocus').html('<i class="far fa-clipboard"></i> Sticker.');
          } else {
            $(`#userhistory${data.destino}${data.username}`).find('.contenidochatmessages').find('.messagenofocus').find('.contenidomessagenofocus').text(data.message);
          }
          
        //console.log('Llego');
        }
        /*$('.panel-message').each(function() {
          $(this).find('.contenidochatmessages').find()
        });*/
        
        //console.log("userhistory"+data.id);
      //console.log(data.destino, sessionStorage.username);
      
      //console.log(data.destino, data.username);
      
      actualizarHistory(data);
      /*$('.res-message:last').each(function() {
        $(this).text(data.message);
      });*/
      if (confirmador) {
        chatarea.scrollTop = chatarea.scrollHeight;
      } else {
        //controladormessagescroll++;
      }
      socket.emit('cambiarFoto', {
        username: data.username,
        foto: data.foto
      });
      
    });
    socket.on("sendMessage", function (data) {
      //console.log(data.username+", "+sessionStorage.username);
      if (data.username == sessionStorage.username) {
        $(`#${data.id}`).html(`
        <i class="fas fa-check icon-ready"></i>`);
        bajarScroll();
      } else {
        /*$(`#mensaje${data.id}`).html(`
        <div class="othermessage">
            <div class="contenidoimg">
             <img class="imguser" src="${data.foto}">
            </div>
            <div class="othercontenidomessage">
             
            <strong>${data.nombre}</strong>
            <p>${data.message}</p>
            
            </div><div class="horamessage">
            <small class="hora">${data.date}</small>
            </div>
          </div>`);*/
      }

      //sessionStorage.setItem('message'+indice, JSON.stringify(data));
      //sessionStorage.codigo = indice;
      //console.log(sessionStorage.codigo);
    });
  }
  for (let i = 0; i < sessionStorage.codigo + 1 || 0; i++) {
    var valorStorage = JSON.parse(sessionStorage.getItem("message" + i));
    if (valorStorage) {
      if (valorStorage.username == sessionStorage.username) {
        $(".container-message").append(`
        <div class="mymessage">
        <div class="contenidoimg">
        <img class="imguser" src="${valorStorage.foto}">
        </div>
        <div class="mycontenidomessage">
          
        <strong>${valorStorage.username}</strong>
        <p>${valorStorage.message}</p>
        
        </div><div class="horamessage">
            <small class="hora">${valorStorage.date}</small>
        </div>
      </div>`);
      } else {
        $(".container-message").append(`
      <div class="othermessage">
          <div class="contenidoimg">
           <img class="imguser" src="${valorStorage.foto}">
          </div>
          <div class="othercontenidomessage">
           
          <strong>${valorStorage.username}</strong>
          <p>${valorStorage.message}</p>
          
          </div><div class="horamessage">
          <small class="hora">${valorStorage.date}</small>
          </div>
        </div>`);
      }
    }
  }
  obtenerMensajes();
  function userDisconnect() {
    /*socket.on("disconnect", function () {
      sessionStorage.username = "";
      sessionStorage.foto = fotoDefault;
    });*/
    socket.on("userDisconnect", function(data) {
      let userlast = "";
      let fotoLastUser;
      //console.log("desconectado");
      /*for(let i=0; i<userOrigin.length; i++) {
        if(userOrigin[i].username == user) {
          userlast = userOrigin[i].nombre;
        }
      }*/
      userlast = data.nombre;
      $(`.message${data.username}`).each(function() {
       if($(this).attr('src') != "" && $(this).attr('src') != null && $(this).attr('src') != undefined) {
        fotoLastUser = $(this).attr('src');
       }
      });
      //let fotoLastUser = user.foto;
      //console.log(userlast);
      if($('.toast')[0]){
        if(!$('.toast').html().includes(`<strong>${replaceuser2}</strong> ha abandonado el chat.`)){
        Command: toastr["info"](`&nbsp;<strong>${userlast.toUpperCase()}</strong> ha abandonado el chat.`);
        replaceuser2=userlast.toUpperCase();
        $('.toast-info:last').css('background-image', `url("${fotoLastUser || fotoToastDefault}")`);
      }
      }else{
        Command: toastr["info"](`&nbsp;<strong>${userlast.toUpperCase()}</strong> ha abandonado el chat.`);
        replaceuser2=userlast.toUpperCase(); 
        $('.toast-info:last').css('background-image', `url("${fotoLastUser || fotoToastDefault}")`);
      }
    });
  }
  userDisconnect();
  async function changeFoto(e, imgFoto) {
    let reader = new FileReader();

    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    await reader.readAsDataURL(e.target.files[0]);

    // Le decimos que cuando este listo ejecute el código interno
    reader.onload = async function () {
      let image = document.createElement("img");
      image.src = reader.result;
      if (/\.(jpeg|jpg|png|gif)$/i.test(e.target.files[0].name)) {
        imgFoto.src = await image.src;
      } else {
        alert("El archivo debe ser una imagen");
      }
    };
  }
  /*document.getElementById("imagefile").onchange = function (e) {
    let imgFoto = document.querySelector(".imgRegister");
    changeFoto(e, imgFoto);
  };*/
  document.getElementById("file-foto").onchange = function (e) {
    let imgFoto = document.querySelector("#imgUserConfig");
    changeFoto(e, imgFoto);
  };
  $("#eliminarFoto").click(function () {
    $("#imgUserConfig").attr("src", fotoDefault);
  });
  
  function detectarCambioFoto() {
    socket.on('cambiarFoto', function(data) {
      if($(`.message${data.username}`)[0]) {
        $(`.message${data.username}`).each(function() {
          $(this).find('.contenidoimg').find('.imguser').attr('src',data.foto);
         if($(this).attr('src') != "" && $(this).attr('src') != null && $(this).attr('src') != undefined) {
          $(this).attr('src', data.foto);
         }
        });
      }
      
      
    });
  }
  detectarCambioFoto();
  /*$("#guardarCambios").click(async function () {
    sessionStorage.foto = await $("#imgUserConfig").attr("src");
    socket.emit('cambiarFoto', {
      username: sessionStorage.username,
      foto: sessionStorage.foto
    });
    verificarSonido();
    (async() => {
      swal("Success!", "Se han guardado exitosamente los cambios!", "success");
    })();
  });*/
  $('#uploader').on('submit', function(event) {
    event.preventDefault();
    let timer = 0;
    $('.loader-page').show();
    var form = $('#uploader')[0];
    var formData = new FormData(form);
    console.log(`${location.origin}/images`);
    /*setTimeout(function() {
      if(timer <= 0) {
        
      }
    }, 5000);*/
    $.ajax({
      url: `${location.origin}/images`,
      data: formData,
      type: 'POST',
      contentType: false,
      processData: false
    }).then(function(response) {
      if(response != fotoDefault) {
        sessionStorage.foto = `/upload/${response}`;
      } else {
        sessionStorage.foto = response;
      }
      
      socket.emit('cambiarFoto', {
        username: sessionStorage.username,
        foto: sessionStorage.foto
      });
      verificarSonido();
      (async() => {
        swal("Success!", "Se han guardado exitosamente los cambios!", "success");
        $('.loader-page').hide();
        timer++;
      })();
      $('#file-foto').val(null);
    }).catch((err) => {
      console.log(err);
      swal("Error!", "No se ha podido subir la imagen, intente denuevo :(", "error");
      $('.loader-page').hide();
    });
    
  });
  function verificarSonido() {
    if($('#defaultCheck1').prop('checked')){
      sessionStorage.sonido="sound";
    } else {
      sessionStorage.sonido="nosound";
    }
  }
  function actualizarHistory(data) {
    var html = "";
    if (data == null) {
      html += `
        <div class="contenidoimg">
          <img class="imguser imghistory" src="${fotoDefault}" />
        </div>
        <div class="contenidochatmessages">
          <strong class="name-user-history">${"Todos"}</strong>
          <div class="messagenofocus">
          <p class="contenidomessagenofocus">${"&nbsp;"}</p>
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
        `;
    } else {
      $(`.messageschatnoti`).each(function() {
        if($(this).find('.contenidochatmessages').find('.name-user-history').html() == data.destino) {
          $(this).find('.contenidochatmessages').find('.messagenofocus').find('.contenidomessagenofocus').html(data.message);
        }
      });
       /* html += `
        <div class="contenidoimg">
          <img class="imguser" src="${data.foto}" />
        </div>
        <div class="contenidochatmessages">
          <strong class="name-user-history">${data.destino}</strong>
          <div class="messagenofocus">
          <p class="contenidomessagenofocus">${data.message}</p>
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
        `;*/
        /*for (let i = 0; i < data.length; i++) {
          }*/
    }
    
    
  }
  let finalStorage = JSON.parse(
    sessionStorage.getItem("message" + sessionStorage.codigo)
  );
  let changeStorage;
  if (finalStorage) {
    changeStorage = [
      {
        lastFoto: finalStorage.foto,
        destino: finalStorage.destino || "Todos",
        lastMessage: finalStorage.message,
      },
    ];
  }
  /*if (changeStorage) {
    actualizarHistory(changeStorage);
  } else {
    actualizarHistory(null);
  }*/
  function detectarLogin() {
    socket.on("success", function () {
      location.href = location.origin;
    });
  }
  detectarLogin();
  //$('.imghistory').attr('src','');
  function actualizarMensajes() {
    socket.emit("updateMessages");
    socket.on("updateMessages", function (data) {
      //console.log(data);
      let html = "";
      //console.log(data);
      if (data) {
        for (let i = 0; i < data.length; i++) {
          //console.log(data[i].username);
          //console.log(data[i].username, sessionStorage.username);
          if (sessionStorage.username && data[i].username) {
           
            if (data[i].username == sessionStorage.username) {
              
              if($(`#mensaje${data[i].id}`)[0]){
                $(`#mensaje${data[i].id}`)
                .removeClass("othermessage")
                .addClass("mymessage");
                data[i].message = _showEmoji(data[i].message);
              
                if(data[i].message.includes('<img class="emoji"')) {
                  $(`#mensaje${data[i].id}`).find('.mycontenidomessage').find('.res-message').html(data[i].message);
                  if($(`#mensaje${data[i].id}`).find('.mycontenidomessage').find('.res-message').html() == undefined) {
                    $(`#mensaje${data[i].id}`).find('.othercontenidomessage').find('.res-message').html(data[i].message);
                  }
                }
                //$(`#mensaje${data[i].id}`).find('.contenidoimg').find('.imguser').attr('src',sessionStorage.foto);
              }
              /*if($(`.message${data[i].username}`)[0]) {
                $(`.message${data[i].username}`).each(function() {
                  $(this).removeClass("othermessage")
                  .addClass("mymessage");
                });         
              }*/
              bajarScroll();
              //console.log('xd');
            } else {
              if($(`#mensaje${data[i].id}`)[0]){
              $(`#mensaje${data[i].id}`)
                .removeClass("mymessage")
                .addClass("othermessage");
                //$(`#mensaje${data[i].id}`).find('.contenidoimg').find('.imguser').attr('src',sessionStorage.foto);
                data[i].message = _showEmoji(data[i].message);
      
                if(data[i].message.includes('<img class="emoji"')) {
                  $(`#mensaje${data[i].id}`).find('.mycontenidomessage').find('.res-message').html(data[i].message);
                  if($(`#mensaje${data[i].id}`).find('.mycontenidomessage').find('.res-message').html() == undefined) {
                    $(`#mensaje${data[i].id}`).find('.othercontenidomessage').find('.res-message').html(data[i].message);
                  }
                }
              }
              /*if($(`.message${data[i].username}`)[0]) {
                $(`.message${data[i].username}`).each(function() {
                  $(this).removeClass("othermessage")
                  .addClass("mymessage");
                });         
              }*/
            }
          }
        }
        if (html != "" && html != null && html != undefined) {
          $(".container-message").html(html);
        }
        
      }
      if(sessionStorage.username) {
        $('.loader-page').hide();
      }
    });
  }
  $(".card-message").scroll(function () {
    var confirmador = false;
  });
  actualizarMensajes();
  function buscarUser(user) {
    socket.emit("buscarUser", user);
    socket.on("buscarUser", function (data) {
      let html = updateUsers(data, true);
      $(".users-history").html(html);
      $(".popover1").click(function () {
        iduser = this.id;
        $(this).popover("show");
      });
      $(".popover1").on("shown.bs.popover", function () {
        $(".popover-body").click(function () {
          //console.log("panel");
          addPanel(data, iduser);
          bajarScroll();
          focusMessage();
        });
      });
    });
  }
  $("#buscadorUser").keyup(function () {
    buscarUser($(this).val());
  });
  
  function addContext(infoselectuser) {
    for (var i = 0; i < infoselectuser.length; i++) {
      if (infoselectuser[i].nombre == identificadoruser) {
        if (infoselectuser[i].username == sessionStorage.username) {
          $(".chathistory").append(`<div class="mymessage">
            <div class="contenidoimg">
            <img class="imguser" src="${infoselectuser[i].foto}">
            </div>
            <div class="mycontenidomessage">
              
            <strong>${infoselectuser[i].username}</strong>
            <p>${infoselectuser[i].message}</p>
            
            </div><div class="horamessage">
                <a class="hora">${infoselectuser[i].date}</a>
            </div>
          </div>`);
        } else {
          $(".container-message").append(`<div class="othermessage">
            <div class="contenidoimg">
            <img class="imguser" src="${infoselectuser[i].foto}">
            </div>
            <div class="mycontenidomessage">
              
            <strong>${infoselectuser[i].username}</strong>
            <p>${infoselectuser[i].message}</p>
            
            </div><div class="horamessage">
                <a class="hora">${infoselectuser[i].date}</a>
            </div>
          </div>`);
        }
      }
    }
  }
  let idselectuser;
  function cambiarDestino(identuser, idAdd, destino, data) {
    let html;
    html = `
    <div class="card panel-message" id="panelM${sessionStorage.username}${destino}" style="display:none;">
    <div class="container-destino">
    <i class="fas fa-chevron-left btn-prepanel"></i> <label class="title-destino" id="destinoM${sessionStorage.username}${destino}">${identuser}
    </label>
    <input type="hidden" class="selectorUser" value="${destino}">
    </div>
    <div class="card-body card-message">
    <div class="container-message" id="${sessionStorage.username}${destino}">
    </div>
    </div>
    <div class="card-footer">
        <div class="form-group form-message">
        <div class="focus-message">
        <div id="emojiWrapper" class="emojiWrapper"></div>
          <textarea class="form-control textMessage" id="textMessage" class="textMessage" placeholder="Escriba algo"></textarea>
          <button class="btn btn-primary btnStickers"><i class="far fa-sticky-note"></i></button><button class="btn btn-primary btnEnvio"><i class="far fa-paper-plane"></i></button>
        </div>
        </div>
      </div>
      </div>`;
      return html;
  }
  let numberNoti = 0;
  let numberUnic = 0;
  let historyNumber = "";
  function addPanelOther(data, idAdd) {
    let identuser;
    let imageuser;
    //identuser = $(`#user${idAdd}`).html();
    //imageuser = $(`#imageuser${idAdd}`).attr("src");
    identuser = data.nombre;
    imageuser = data.foto;
    let html = "";

    //addContext(data);
    let compHistory = "";
    var finalmessage = "&nbsp;" || data.message;
    //console.log('CODIGO : '+idAdd);
    let destinoFinal = "";
    for(let i=0; i<userOrigin.length; i++) {
      if(userOrigin[i].id == idAdd) {
        destinoOrigin = userOrigin[i].username;
        destinoFinal = userOrigin[i].username;
      }
    }
    if(data.destino == "Todos") {
      
      return;
    }
    console.log(data.username, sessionStorage.username);
    if($(`#userhistory${sessionStorage.username}${destinoFinal}`)[0]) {
      let $codNumber = $(`.codigoNumber${sessionStorage.username}${destinoFinal}`);
      numberUnic = parseInt($codNumber.text());
      $(`#userhistory${sessionStorage.username}${destinoFinal}`).remove();
    } else {
      numberUnic = 0;
    }
  
    if (!$(`#userhistory${sessionStorage.username}${destinoFinal}`)[0]) {
      //console.log(idAdd);

      html = cambiarDestino(identuser, idAdd, destinoFinal, data);
      if(!$(`#panelM${sessionStorage.username}${destinoFinal}`)[0]) {
        $('.components-message').append(html);
      }
      darColorFocus();
      //$('.textMessage').focus();
      verificarEmoji();
      eventsEmoji();
      
      backPanelMessages(true);

      //destinoOrigin = $(`#destinoM${iduser}`).html();
      compHistory += `<div class="messageschatnoti ${data.username} message${data.username}" id="userhistory${sessionStorage.username}${destinoFinal}">
      <div class="contenidoimg">
        <img class="imguser imghistory" src="${imageuser}">
        </div>
            <div class="contenidochatmessages">
              <strong class="name-user-history" id="username${idAdd}">${identuser}</strong>
              <div class="messagenofocus">
                <p class="contenidomessagenofocus" id="${identuser}">${finalmessage}</p>
                <small class="myNumberNoti codigoNumber${sessionStorage.username}${destinoFinal}">0</small>
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>`;
          compHistory += $('.chatnotify').html();
      $(".chatnotify")
        .html(compHistory);
           // $('.container-message:last').attr('id',destinoOrigin);
           // $('.textMessage:last').addClass(destinoOrigin);
           // $('.btnEnvio:last').addClass(destinoOrigin);
            
    }
    //$('#content-history').removeClass('selectedItem');
    //$('.content-history').hide();
    //$('.content-message').show();
    //$(`#content-message`).addClass('selectedItem');
    //$('.panel-message').hide();
    //$(`#panelM${idAdd}`).show();
    sessionStorage.selected = "message";
    nextPanelMessages(false);
    resizePage();
    if($(`#panelM${sessionStorage.username}${destinoFinal}`).is(':hidden')) {
      //console.log($(`.codigoNumber${sessionStorage.username}${destinoFinal}`).attr('numberId'), $(`.codigoNumber${sessionStorage.username}${destinoFinal}`)[0]);
      
      $(`#userhistory${sessionStorage.username}${destinoFinal}`).addClass('newMessage');
      if(numberNoti<=0){
        numberNoti+=numberUnic;
      }
      
      numberNoti++;
      $('.numberNoti').text(numberNoti);
      $('.numberNoti').show();
      let $codNumber = $(`.codigoNumber${sessionStorage.username}${destinoFinal}`);
      numberUnic++;
      $codNumber.text(numberUnic);
      $codNumber.show();
      //console.log($codNumber.text());
      /*if(parseInt($(`.codigoNumber${sessionStorage.username}${destinoFinal}`).text()) > 0) {
        numberUnic = parseInt($(`.codigoNumber${sessionStorage.username}${destinoFinal}`).text());
      }
      $(`#userhistory${sessionStorage.username}${destinoFinal}`).addClass('newMessage');
      if(numberNoti<=0){
        numberNoti+=numberUnic;
      }
      
      numberNoti++;
      $('.numberNoti').text(numberNoti);
      $('.numberNoti').show();
      
      if(historyNumber == `${sessionStorage.username}${destinoFinal}` || historyNumber == "") {
        //numberUnic = $(`.codigoNumber${idAdd}`).text();
        //console.log(numberUnic);
        numberUnic++;
        $(`.codigoNumber${sessionStorage.username}${destinoFinal}`).text(numberUnic);
        $(`.codigoNumber${sessionStorage.username}${destinoFinal}`).attr('numberId', numberUnic);
        $(`.codigoNumber${sessionStorage.username}${destinoFinal}`).show();
        //$('.myNumberNoti').text(numberUnic);
      } else {
        numberUnic++;
        $(`.codigoNumber${sessionStorage.username}${destinoFinal}`).text(numberUnic);
        $(`.codigoNumber${sessionStorage.username}${destinoFinal}`).attr('numberId', numberUnic);
        $(`.codigoNumber${sessionStorage.username}${destinoFinal}`).show();
        //$('.myNumberNoti').text(numberUnic);
      }
      historyNumber = `${sessionStorage.username}${destinoFinal}`;*/
    } 
    
    /*$(`.messageschatnoti`).click(function() {
      
    });*/
    
    /* $('.messageschatnoti').attr('style',`padding: 10px;
  border: 1px solid rgb(190,190,190);`);
  $('.fa-chevron-right').attr('style',`float: right;
  margin-top: -45px;
  color: rgb(140,140,140);
  cursor: pointer;`);*/
  
    /*$(".container-message").each((t) => {
      $(t).attr('id',destinoOrigin);
    });*/

    addEventsMessage();
    
    //bajarScroll();
    //$(".btnmessage").click();
  }
  function addPanel(data, idAdd) {
    let identuser;
    let imageuser;
    identuser = $(`#user${idAdd}`).html();
    imageuser = $(`#imageuser${idAdd}`).attr("src");
    let html = "";

    //addContext(data);
    let destinoFinal = "";
    for(let i=0; i<data.length; i++) {
      if(data[i].id == idAdd) {
        destinoOrigin = data[i].username;
        destinoFinal = data[i].username;
      }
    }
    let finalmessage = "&nbsp;";
    if($(`#panelM${sessionStorage.username}${destinoFinal}`)[0]) {
      finalmessage = $(`#panelM${sessionStorage.username}${destinoFinal}`).find(`.card-message`).find('.container-message').find('.identMessage').find('.othercontenidomessage').find('.res-message').text();
    }
    
    
    console.log(destinoFinal);
    if (!$(`#userhistory${sessionStorage.username}${destinoFinal}`)[0]) {
      
      //console.log(idAdd);
      
      html = cambiarDestino(identuser, idAdd, destinoFinal, {
        username: sessionStorage.username,
        destino: destinoFinal
      });
      
      $('.components-message').append(html);
      darColorFocus();
      $('.textMessage').focus();
      verificarEmoji();
      eventsEmoji();
      
      backPanelMessages(false);

      //destinoOrigin = $(`#destinoM${iduser}`).html();
      $(".chatnotify")
        .append(`<div class="messageschatnoti ${destinoFinal}" id="userhistory${sessionStorage.username}${destinoFinal}">
        <div class="contenidoimg">
          <img class="imguser imghistory" src="${imageuser}">
          </div>
              <div class="contenidochatmessages">
                <strong class="name-user-history" id="username${idAdd}">${identuser}</strong>
                <div class="messagenofocus">
                  <p class="contenidomessagenofocus" id="${identuser}">${finalmessage}</p>
                  <small class="myNumberNoti codigoNumber${sessionStorage.username}${destinoFinal}">0</small>
                  <i class="fas fa-chevron-right"></i>
                </div>
              </div>
            </div>`);
            //$('.container-message:last').attr('id',destinoOrigin);
           // $('.textMessage:last').addClass(destinoOrigin);
           // $('.btnEnvio:last').addClass(destinoOrigin);
            
    }
    $('#content-history').removeClass('selectedItem');
    $('.content-history').hide();
    $('.content-message').show();
    $(`#content-message`).addClass('selectedItem');
    
    $('.panel-message').hide();
    $(`#panelM${sessionStorage.username}${destinoFinal}`).show();
    sessionStorage.selected = "message";
    $(`#userhistory${sessionStorage.username}${destinoFinal}`).each(function() {
      if($(this).hasClass('newMessage')) {
        let $msgNewNumber = $(this).find('.contenidochatmessages').find('.messagenofocus').find('.myNumberNoti');
          if($msgNewNumber) {
            $msgNewNumber.hide();
            numberNoti-=parseInt($msgNewNumber.text());
            $msgNewNumber.text('0');
            numberUnic = 0;
            if(numberNoti > 0) {
              $('.numberNoti').text(numberNoti);
            } else {
              $('.numberNoti').hide();
            }
          }
        
          $(this).removeClass('newMessage');
      }
    });
    
    
    nextPanelMessages(false);
    resizePage();
    /* $('.messageschatnoti').attr('style',`padding: 10px;
  border: 1px solid rgb(190,190,190);`);
  $('.fa-chevron-right').attr('style',`float: right;
  margin-top: -45px;
  color: rgb(140,140,140);
  cursor: pointer;`);*/
  
    /*$(".container-message").each((t) => {
      $(t).attr('id',destinoOrigin);
    });*/

    addEventsMessage();
    
    //bajarScroll();
    $(".btnmessage").click();
  }
  $(".textMessage").focus(function() {
    setTimeout(function() {
      bajarScroll();
    },500); 
  });
  function darColorFocus() {
    $(".textMessage").each(function() {   
      $(this).focus(function() {
        $(this).parent($('.focus-message')).css({
          'display': 'flex',
          'border': '1px solid rgb(142, 113, 151)',
          'box-shadow': '0 0 0 0.2rem rgba(255, 0, 234, 0.25)',
          'width': '100%'
        });
      });
      $(this).blur(function() {
        $(this).parent($('.focus-message')).css({
          'display': 'flex',
          'border': '1px solid rgb(184, 179, 179)',
          'box-shadow': 'none',
          'width': '100%'
        });
      });
    });
  }
  darColorFocus();
  /*const observer = new MutationObserver((mutationList) => { 
    mutationList.forEach((mutation)=> {
    if(mutation.addedNodes.length){
    console.log('Añadido', mutation.addedNodes[0]);
    darColorFocus();
    $('.textMessage').focus();
    }
   if(mutation.removedNodes.length){
    console.log('Eliminado', mutation.removedNodes[0]);
    }
   //console.log(mutation.type);
    
    })
   });
   const equipos = document.querySelector('.components-message'); 
   // Opcions para el observer 
   const observerOptions = { 
    attributes: true, 
    childList: true, 
    subtree: true,
    characterData: false,
    attributeOldValue: false,
    characterDataOldValue: false
   };
   observer.observe(equipos, observerOptions);*/
   /*$('.components-message').bind("DOMSubtreeModified",function(){
     console.log('Cambiando...');
     
     //eventsEmoji();
    }); */
    verificarEmoji();
  function verificarEmoji() {

    $('.contenidomessagenofocus').each(function() {
      //console.log($(this).html());
      if($(this).html().includes('<img class="emoji"') || $(this).html().includes('[emoji:')) {
        $(this).html('<i class="far fa-clipboard"></i> Sticker.');
      }
     });
  }
  function focusMessage() {
    $(".textMessage").each(function() {   
      $(this).focus();
    });
    setTimeout(function() {
      bajarScroll();
    },500); 
  }

  function switchSheet() {
    let theme = document.getElementById("theme");
  
    if (theme.getAttribute("href") == "/css/theme-dark.css") {
      theme.href = "/css/theme-light.css";
    } else {
      theme.href = "/css/theme-dark.css";
    }
  }

  $('.theme').change(function() {
    switchSheet();
    console.log('cambiando...');
  });
    function _initialEmoji() {
      var emojiContainer = document.querySelectorAll('.emojiWrapper'),
          docFragment = document.createDocumentFragment();
          if(emojiContainer[emojiContainer.length-1].innerHTML == '') {
            for (var i = 69; i > 0; i--) {
              var emojiItem = document.createElement('img');
              emojiItem.src = '/img/emoji/' + i + '.gif';
              emojiItem.title = i;
              emojiItem.className = 'img-gif';
              docFragment.appendChild(emojiItem);
          };
          emojiContainer[emojiContainer.length-1].appendChild(docFragment);
          }
  }
  _initialEmoji();
  eventsEmoji();
  
  function eventsEmoji() {
    
    _initialEmoji();
    document.body.addEventListener('click', function(e) {
      var $emojiwrapper = $('.emojiWrapper');
        if ($(e.target) != $emojiwrapper) {
          $emojiwrapper.css('display','none');
      };
      
      
  });

    $('.btnStickers').off('click').on('click', function(e) {
      console.log('xd');
      
      var $emojiwrapper = $('.emojiWrapper');
      //console.log($emojiwrapper.css('display'));
      if($emojiwrapper.css('display') == 'none' || !$emojiwrapper.css('display')) {
        $emojiwrapper.css('display', 'grid');
      } else {
        $emojiwrapper.css('display', 'none');
      }
      
      e.stopPropagation();
    });
    /*$('.panel-message').each(function() {
      if(!$(this).is(':hidden')) {
        $(this).find('.card-footer').find('.form-message').find('.focus-message').find('.emojiWrapper').on('click', function(e) {
          var target = e.target;
          console.log(target);
          if (target.nodeName.toLowerCase() == 'img') {
            console.log('xd2');
              var messageInput = document.querySelector('.textMessage');
              messageInput.focus();
              messageInput.value = messageInput.value + '[emoji:' + target.title + ']';
          };
        });
      }
    });*/
    let contadorId = -1;
    $('.emojiWrapper').each(function() {
  
      $(this).off('click').on('click', function(e) {
        var target = e.target;
        console.log(target);
        if (target.nodeName.toLowerCase() == 'img') {
          console.log('xd2');
            var $messageInput = $(this).parent().find('.textMessage');
            $messageInput.focus();
            $messageInput.val($messageInput.val() + '[emoji:' + target.title + ']');
        };
      });
    });
    
    //if($('.panel-message').is(':visible')) {}
    
  
  
  }
  function _showEmoji(msg) {
    var match, result = msg,
        reg = /\[emoji:\d+\]/g,
        emojiIndex,
        totalEmojiNum = document.getElementById('emojiWrapper').children.length;
    while (match = reg.exec(msg)) {
        emojiIndex = match[0].slice(7, -1);
        if (emojiIndex > totalEmojiNum) {
            result = result.replace(match[0], '[X]');
        } else {
            result = result.replace(match[0], '<img class="emoji" src="/img/emoji/' + emojiIndex + '.gif" />');//todo:fix this in chrome it will cause a new request for the image
        };
    };
    return result;
  }
  function editNickName(users) {
    let html = "";
    for(let i=0; i<users.length; i++) {
      html+=`<div class="user-edit iduserEdit${users[i].username} nameuserEdit${users[i].nombre}">
        <img class="img-edit" src="${users[i].foto}">
        <label class="name-edit">${users[i].nombre}</label>
        <button class="btn float-right btnCambiarApodo text-white"  data-toggle="modal" data-target="#modalChangeNick"><i class="fas fa-pencil-alt"></i> Establecer apodo</button>
        <input type="hidden" class="apodoName${users[i].username}" value="">
      </div>`;
    }
    $('.content-edit').html(html);
    $('.btnCambiarApodo').click(function() {
      let response = $(this).parent().prop('class').split(' ');
      let nombre = "";
      let usuario = "";
      usuario = response[1].replace('iduserEdit', '');
      nombre = response[2].replace('nameuserEdit', '');
      
      if(usuario == sessionStorage.username) {
        $('.identEdit').text('Edita tu apodo');
      } else {
        $('.identEdit').text(`Edita el apodo de ${nombre}`);
      }
        
        $('.inputEdit').prop('placeholder',nombre); 
        if($(this).parent().find(`.apodoName${usuario}`).val() != $('.inputEdit').prop('placeholder')) 
        {
          $('.inputEdit').val($(this).parent().find(`.apodoName${usuario}`).val());
        } else {
          $('.inputEdit').val('');
        }
        $('.ident-edit-user').val(usuario);
       // $('.inputEdit').val()
      setTimeout(function() {
        $('.inputEdit').focus();
      }, 500);
      
      $('.inputEdit').keyup(function(e) {
        /*if($(this).val() == '') {
          $('.guardarEdit').prop('disabled','disabled');
        } else {
          $('.guardarEdit').removeAttr('disabled');
          
        }*/
        if(e.keyCode == 13) {
          $('.guardarEdit').click();
        }
      });
      $('.guardarEdit').off('click').on('click', function() {
        console.log('Cambiando Apodo...');
        let responseEdit = "";
        let respuestaFinal = false;
        if($('.inputEdit').val() == '') {
          //console.log($(`.message${$('.ident-edit-user').val()}`).find('.othercontenidomessage').find('.nom-user-message').text(), $('.inputEdit').prop('placeholder'));
          //console.log($('.mymessage').html());
          if($(`.message${$('.ident-edit-user').val()}`).find('.othercontenidomessage').find('.nom-user-message').text().includes($('.inputEdit').prop('placeholder')) || $(`.message${$('.ident-edit-user').val()}`).find('.mycontenidomessage').find('.nom-user-message').text().includes($('.inputEdit').prop('placeholder')) || $(`.message${$('.ident-edit-user').val()}`).html().includes($('.inputEdit').prop('placeholder')) || $(`.apodoName${$('.ident-edit-user').val()}`).val() == '') {
            return;
          } else {
            responseEdit = '';
          }
          
        } else {
          responseEdit = $('.inputEdit').val();
        }
        socket.emit('cambiarApodo', {
          originalName: nombre,
          identOtherUser: usuario,
          lastApodo: responseEdit,
          userName: sessionStorage.nombre,
          identUser: sessionStorage.username
        });
        $('.close').click();
        $('.inputEdit').val('');
        //$(this).prop('disabled','disabled');
      });
    });
  }
  detectarCambioApodo();
  let nickNameChange = [];
  function detectarCambioApodo() {
    
    socket.on('cambiarApodo', function(data) {
      var chatarea = "";
      $('.card-message').each(function() {
        if($(this).is(':visible')) {
          chatarea = this;
        }
      });
      $(`.apodoName${data.identOtherUser}`).val(data.lastApodo);
      
      //data.message = encodeURI(data.message);
      //data.message = data.message.replace(/[_\W]+/g,'_');
      let confirmador = false;
      if (
        chatarea.offsetHeight + chatarea.scrollTop ==
          chatarea.scrollHeight + 2 ||
        chatarea.offsetHeight + chatarea.scrollTop >= chatarea.scrollHeight
      ) {
        confirmador = true;
      } else {
        confirmador = false;
      }
      
      $('#Todos').find(`.message${data.identOtherUser}`).find('.mycontenidomessage').find('.nom-user-message').text(data.lastApodo);
      if(!$('#Todos').find(`.message${data.identOtherUser}`).find('.mycontenidomessage').find('.nom-user-message')[0]) {
        $('#Todos').find(`.message${data.identOtherUser}`).find('.othercontenidomessage').find('.nom-user-message').text(data.lastApodo);
      }
      nickNameChange.push({
        usuario: data.identOtherUser,
        nombre: data.lastApodo || data.originalName
      });
      if(data.lastApodo == '') {
        if(data.originalName == sessionStorage.nombre && data.identUser == sessionStorage.username && data.userName == sessionStorage.nombre) {
          $('#Todos').append(`<div class="systemEdit">Has borrado tu apodo</div>`);
        } else {
          if(data.identOtherUser == data.identUser) {
            $('#Todos').append(`<div class="systemEdit">${data.userName} ha borrado su apodo</div>`);
          }  
          else if(data.identOtherUser == sessionStorage.username) {
            $('#Todos').append(`<div class="systemEdit">${data.userName} ha borrado tu apodo</div>`);
          } else {
            if(data.identUser == sessionStorage.username) {
              $('#Todos').append(`<div class="systemEdit">Has borrado el apodo de ${data.originalName}</div>`);
            } else {
              $('#Todos').append(`<div class="systemEdit">${data.userName} ha borrado el apodo de ${data.originalName}</div>`); 
            }
          }
          
        }
          $('#Todos').find(`.message${data.identOtherUser}`).find('.mycontenidomessage').find('.nom-user-message').text(data.originalName);
        if(!$('#Todos').find(`.message${data.identOtherUser}`).find('.mycontenidomessage').find('.nom-user-message')[0]) {
          $('#Todos').find(`.message${data.identOtherUser}`).find('.othercontenidomessage').find('.nom-user-message').text(data.originalName);
        }
        
      } 
      else if(data.originalName == sessionStorage.nombre && data.identUser == sessionStorage.username && data.userName == sessionStorage.nombre) {
        $('#Todos').append(`<div class="systemEdit">Has cambiado tu apodo a ${data.lastApodo}</div>`);
      } else {
        if(data.identOtherUser == data.identUser) {
          $('#Todos').append(`<div class="systemEdit">${data.userName} ha cambiado su apodo a ${data.lastApodo}</div>`);
        }  
        else if(data.identOtherUser == sessionStorage.username) {
          $('#Todos').append(`<div class="systemEdit">${data.userName} te ha cambiado el apodo de ${data.originalName} a ${data.lastApodo}</div>`);
        } else {
          if(data.identUser == sessionStorage.username) {
            $('#Todos').append(`<div class="systemEdit">Has cambiado el apodo de ${data.originalName} a ${data.lastApodo}</div>`);
          } else {
            $('#Todos').append(`<div class="systemEdit">${data.userName} ha cambiado el apodo de ${data.originalName} a ${data.lastApodo}</div>`); 
          }
        }
        
      }
      if (confirmador) {
        chatarea.scrollTop = chatarea.scrollHeight;
      } else {
        //controladormessagescroll++;
      }
    });
  }
  function bajarScroll() {
    $(".card-message").each(function() {   
      $(this).scrollTop($(this).prop("scrollHeight"));
    });
    /*$(".card-message").scrollTop($(".card-message").prop("scrollHeight"));*/
    //console.log("bajando!!");
  }
 
  bajarScroll();
  function redirectUserDisconnect() {
    socket.on('redirectUser', function(user) {
      if(sessionStorage.username == user) {
        location.reload();
      }
    });
  }
  redirectUserDisconnect();
  
});



/* --> IMPORTANT --> PAST CODE 

<% if(content=="page-message") { %>
<%- include ('partials/content-message.html')%>
<% } else if(content=="page-users") { %>
<%- include ('partials/content-users.html')%>
<% } else if(content=="page-config") { %>
<%- include ('partials/content-config.html')%>
<% } else if(content=="page-history") { %>
<%- include ('partials/content-history.html')%>
<% } %> 

*/
