/*if(location.href == location.origin|| location.href == location.origin+'/') {
  if(sessionStorage.username){
    location.href = '/'+sessionStorage.username;
  } 
} else {
  location.href = location.origin;
}*/

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
  const fotoDefault = "/img/user.PNG" || "/img/user.png";
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
  function backPanelMessages() {
    $(".btn-prepanel").click(function () {
      
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
  backPanelMessages();
  function nextPanelMessages(data) {
    $(".messageschatnoti").click(function () {
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
        var idHistory = this.id.replace('userhistory','');
        if(idHistory == -1 || idHistory == "-1") {
          $('.panel-message').hide();
          $('#panelM').show();
        } else {
          $('.panel-message').hide();
          $(`#destinoM${idHistory}`).text(userVar);
          $(`#panelM${idHistory}`).show();
        }
        //$('.panel-message').hide();
        $('#content-message').show();
        console.log(idHistory);
        
      }
      bajarScroll();
      destinoOrigin = $(".title-destino").html();
      for(let i=0; i<data.length; i++) {
        if(data[i].nombre == destinoOrigin) {
          destinoOrigin = data[i].username;
        }
      }
      sessionStorage.selected = "message";
      $(`#content-message`).addClass('selectedItem');
      $('#content-history').removeClass('selectedItem');
      actualizarSelectMenu();
      numberNoti = 0;
      $('.numberNoti').hide();
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
  function registrarUsuario(nom, user, pass) {
    console.log(nom, user, pass);
    socket.emit("addUser", {
      nombre: nom,
      username: user,
      password: pass,
    });
    //socket.emit('actualizarCod');
  }
  function validarUsuario(user, pass) {
    socket.emit("obtenerUsers");

    socket.on("obtenerUsers", function (data) {
      var respuesta = false;
      var nomUser;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        console.log(user, data[i].user);
        if (data[i].user != user || data[i].password != pass) {
        } else {
          nomUser = data[i].nombres;
          respuesta = true;
        }
      }
      console.log(respuesta);
      if (respuesta) {
        console.log("Logeado");
        sessionStorage.username = user.toUpperCase();
        sessionStorage.nombre = nomUser.toUpperCase();
        sessionStorage.foto = $(".imgRegister").attr("src") || fotoDefault;
        socket.emit("userConnect", {
          username: sessionStorage.username,
          nombre: sessionStorage.nombre,
          foto: sessionStorage.foto || fotoDefault,
        });
        //location.href="/"+sessionStorage.username;
        location.reload();
      } else {
        return;
      }
    });
  }
  $('.nameUserConfig').text(sessionStorage.nombre);
  function updateUsers(data, buscar) {
    let html = "";
    if (!buscar) {
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
                      class="imguser_mini"
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
                      class="imguser_mini"
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
                      class="imguser_mini"
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
                      class="imguser_mini"
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
  function actualizarUsers() {
    socket.on("userConnect", function (data) {
      let html = updateUsers(data, false);
      $(".users-history").html(html);
      userOrigin = data;
      $(".popover1").click(function () {
        iduser = this.id;
        $(this).popover("show");
      });
      $(".popover1").on("shown.bs.popover", function () {
        $(".popover-body").click(function () {
          console.log("panel");
          numberNoti = 0;
          $('.numberNoti').hide();
          addPanel(data, iduser);
        });
      });
    });
  }
  if (sessionStorage.username) {
    socket.emit("userConnect", {
      username: sessionStorage.username,
      nombre: sessionStorage.nombre,
      foto: sessionStorage.foto || fotoDefault,
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
    console.log(destino_user,"usuario destino");
    
    var dateTime = moment().format("hh:mm a").toUpperCase();
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
  }
  
  function addEventsMessage() {
    /*$(".textMessage").off('keypress',function(e){});
    $(".btnenvio").off('click',function(){});*/
    $('.textMessage').off('keypress').on('keypress', function (e) {
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
        console.log("Enviado");
      });
    
    
  }
  addEventsMessage();
  function addSound() {
    let audio = document.getElementById("audio");
    audio.play();
  }
  let userOrigin;
  function obtenerMensajes() {
    socket.on("previousMessage", function (data) {
      var confirmador = false;
      var chatarea = document.querySelector(".card-message");
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
      if($(`.${data.destino}`)[0]) {
        $(`.${data.destino}`).find('.contenidochatmessages').find('.messagenofocus').find('.contenidomessagenofocus').text(data.message);
      }
        if (data.username == sessionStorage.username) {
          $(`#${data.destino}`).append(`
            <div id="mensaje${data.id}" class="identMessage mymessage">
            <div class="contenidoimg">
            <img class="imguser" src="${data.foto}">
            </div>
            <div class="mycontenidomessage">
              
            <strong class="nom-user-message">${data.nombre}</strong>
            <p class="res-message">${data.message}</p>
            
            </div><div class="horamessage">
                <small class="hora">${data.date}</small>
            </div>
            <label id="${data.id}"><i class="far fa-clock icon-loader"></i></label>
          </div>`);
 
          bajarScroll();
        } else {
          
          $(`#${data.destino}`).append(`
          <div id="mensaje${data.id}" class="identMessage othermessage">
              <div class="contenidoimg">
               <img class="imguser" src="${data.foto}">
              </div>
              <div class="othercontenidomessage">
               
              <strong class="nom-user-message">${data.nombre}</strong>
              <p class="res-message">${data.message}</p>
              
              </div><div class="horamessage">
              <small class="hora">${data.date}</small>
              </div>
            </div>`);
            addSound();
        }
        if(sessionStorage.username == data.destino || data.destino == data.username) {
          
          if($(`.${data.username}`)[0]) {
            $(`.${data.username}`).find('.contenidochatmessages').find('.messagenofocus').find('.contenidomessagenofocus').text(data.message);
          }
          if (data.username == sessionStorage.username) {
           
          $(`#${data.username}`).append(`
                <div id="mensaje${data.id}" class="identMessage mymessage">
                <div class="contenidoimg">
                <img class="imguser" src="${data.foto}">
                </div>
                <div class="mycontenidomessage">
                  
                <strong class="nom-user-message">${data.nombre}</strong>
                <p class="res-message">${data.message}</p>
                
                </div><div class="horamessage">
                    <small class="hora">${data.date}</small>
                </div>
                <label id="${data.id}"><i class="far fa-clock icon-loader"></i></label>
              </div>`);
          } else {
            if(!$(`#${data.destino}`)[0]) {
              //data.username = data.destino;
              addPanelOther(data, codPri);
              console.log('xd22222');
             }
             
            $(`#${data.username}`).append(`
            <div id="mensaje${data.id}" class="identMessage othermessage">
                <div class="contenidoimg">
                 <img class="imguser" src="${data.foto}">
                </div>
                <div class="othercontenidomessage">
                 
                <strong class="nom-user-message">${data.nombre}</strong>
                <p class="res-message">${data.message}</p>
                
                </div><div class="horamessage">
                <small class="hora">${data.date}</small>
                </div>
              </div>`);
              addSound();
          }
        }
        if(data.destino == "Todos") {
          
          if($(`#userhistory-1`)[0]) {
            $(`#userhistory-1`).remove();
          }
          let compHistory = "";
            compHistory += `<div class="messageschatnoti Todos" id="userhistory-1">

            <div class="contenidoimg">
              <img class="imguser" src="${data.foto}" />
            </div>
            <div class="contenidochatmessages">
              <strong class="name-user-history" id="username">${"Todos"}</strong>
              <div class="messagenofocus">
              <p class="contenidomessagenofocus">${data.message}</p>
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
            $(`#userhistory-1`).addClass('newMessage');
            numberNoti++;
            $('.numberNoti').text(numberNoti);
            $('.numberNoti').show();
            $(`#userhistory-1`).click(function() {
              $(this).removeClass('newMessage');
            });
            addSound();
            
          }
        }
        
        console.log($(`#panelM`).is(':hidden'));
        //$(`#userhistory${codPri}`).find('.contenidochatmessages').find('.name-user-history').text(data.nombre);
        if(data.destino != "Todos" && (data.destino == data.username || data.destino == sessionStorage.username)) {
          $(`#userhistory${codPri}`).find('.contenidochatmessages').find('.messagenofocus').find('.contenidomessagenofocus').text(data.message);
        }
        $('.res-message').each(function() {
          $(this).text($(this).html());
        });
        console.log("userhistory"+data.id);
      console.log(data.destino, sessionStorage.username);
      
      console.log(data.destino, data.username);
      
      actualizarHistory(data);
      if (confirmador) {
        chatarea.scrollTop = chatarea.scrollHeight;
      } else {
        //controladormessagescroll++;
      }
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
    socket.on("disconnect", function () {
      sessionStorage.username = "";
    });
  }
  userDisconnect();
  function changeFoto(e, imgFoto) {
    let reader = new FileReader();

    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    reader.readAsDataURL(e.target.files[0]);

    // Le decimos que cuando este listo ejecute el código interno
    reader.onload = function () {
      let image = document.createElement("img");
      identif = 0;
      identif2 = 0;
      identif3 = 0;
      image.src = reader.result;
      if (/\.(jpeg|jpg|png|gif)$/i.test(e.target.files[0].name)) {
        imgFoto.src = image.src;
      } else {
        alert("El archivo debe ser una imagen");
      }
    };
  }
  document.getElementById("imagefile").onchange = function (e) {
    let imgFoto = document.querySelector(".imgRegister");
    changeFoto(e, imgFoto);
  };
  document.getElementById("file-foto").onchange = function (e) {
    let imgFoto = document.querySelector("#imgUserConfig");
    changeFoto(e, imgFoto);
  };
  $("#eliminarFoto").click(function () {
    $("#imgUserConfig").attr("src", fotoDefault);
  });
  $("#guardarCambios").click(function () {
    sessionStorage.foto = $("#imgUserConfig").attr("src");
  });
  function actualizarHistory(data) {
    var html = "";
    if (data == null) {
      html += `
        <div class="contenidoimg">
          <img class="imguser" src="${fotoDefault}" />
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
  function actualizarMensajes() {
    socket.emit("updateMessages");
    socket.on("updateMessages", function (data) {
      //console.log(data);
      let html = "";
      if (data) {
        for (let i = 0; i < data.length; i++) {
          //console.log(data[i].username, sessionStorage.username);
          if (sessionStorage.username && data[i].username) {
            if (data[i].username == sessionStorage.username) {
              
              if($(`#mensaje${data[i].id}`)[0]){
                $(`#mensaje${data[i].id}`)
                .removeClass("othermessage")
                .addClass("mymessage");
              }
              bajarScroll();
              //console.log('xd');
            } else {
              if($(`#mensaje${data[i].id}`)[0]){
              $(`#mensaje${data[i].id}`)
                .removeClass("mymessage")
                .addClass("othermessage");
              }
            }
          }
        }
        if (html != "" && html != null && html != undefined) {
          $(".container-message").html(html);
        }
        
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
          console.log("panel");
          addPanel(data, iduser);
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
  function cambiarDestino(identuser, codigo, destino) {
    let html;
    html = `
    <div class="card panel-message" id="panelM${codigo}" style="display:none;">
    <div class="container-destino">
    <i class="fas fa-chevron-left btn-prepanel"></i> <label class="title-destino" id="destinoM${codigo}">${identuser}
    </label>
    <input type="hidden" class="selectorUser" value="${destino}">
    </div>
    <div class="card-body card-message">
    <div class="container-message">
    </div>
    </div>
    <div class="card-footer">
        <div class="form-group form-message">
          <textarea class="form-control textMessage" id="textMessage" class="textMessage" placeholder="Escriba algo"></textarea>
          <button class="btn btn-primary btnEnvio"><i class="far fa-paper-plane"></i></button>
        </div>
      </div>
      </div>`;
      return html;
  }
  let numberNoti = 0;
  function addPanelOther(data, idAdd) {
    let identuser;
    let imageuser;
    identuser = $(`#user${idAdd}`).html();
    imageuser = $(`#imageuser${idAdd}`).attr("src");
    let html = "";

    //addContext(data);
    let compHistory = "";
    var finalmessage = "&nbsp;" || data.message;
    console.log('CODIGO : '+idAdd);
    let destinoFinal = "";
    if(data.destino == "Todos") {
      
      return;
    }
    if($(`#userhistory${idAdd}`)[0]) {
      $(`#userhistory${idAdd}`).remove();
    }
    if (!$(`#userhistory${idAdd}`)[0]) {
      for(let i=0; i<userOrigin.length; i++) {
        if(userOrigin[i].id == idAdd) {
          destinoOrigin = userOrigin[i].username;
          destinoFinal = userOrigin[i].username;
        }
      }
      console.log(idAdd);
      html = cambiarDestino(identuser, idAdd, destinoFinal);
      
      $('.components-message').append(html);
      
      
      backPanelMessages();

      //destinoOrigin = $(`#destinoM${iduser}`).html();
      compHistory += `<div class="messageschatnoti ${data.username}" id="userhistory${idAdd}">
      <div class="contenidoimg">
        <img class="imguser" src="${imageuser}">
        </div>
            <div class="contenidochatmessages">
              <strong class="name-user-history" id="username${idAdd}">${identuser}</strong>
              <div class="messagenofocus">
                <p class="contenidomessagenofocus" id="${identuser}">${finalmessage}</p>
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>`;
          compHistory += $('.chatnotify').html();
      $(".chatnotify")
        .html(compHistory);
            $('.container-message:last').attr('id',destinoOrigin);
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
    if($(`#panelM${idAdd}`).is(':hidden')) {
      $(`#userhistory${idAdd}`).addClass('newMessage');
      numberNoti++;
      $('.numberNoti').text(numberNoti);
      $('.numberNoti').show();
      $(`#userhistory${idAdd}`).click(function() {
        $(this).removeClass('newMessage');
      });
    } 
    
    
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
    
    let finalmessage = "&nbsp;";
    if($(`#paneM${idAdd}`)[0]) {
      finalmessage = $(`#paneM${idAdd}`).find(`.card-message`).find('.container-message').find('.identMessage').find('.othercontenidomessage').find('.res-message').text();
    }
    
    let destinoFinal = "";
    if (!$(`#userhistory${idAdd}`)[0]) {
      for(let i=0; i<userOrigin.length; i++) {
        if(userOrigin[i].id == idAdd) {
          destinoOrigin = userOrigin[i].username;
          destinoFinal = userOrigin[i].username;
        }
      }
      console.log(idAdd);
      html = cambiarDestino(identuser, idAdd, destinoFinal);
      
      $('.components-message').append(html);
      
      
      backPanelMessages();

      //destinoOrigin = $(`#destinoM${iduser}`).html();
      
      $(".chatnotify")
        .append(`<div class="messageschatnoti ${destinoFinal}" id="userhistory${idAdd}">
        <div class="contenidoimg">
          <img class="imguser" src="${imageuser}">
          </div>
              <div class="contenidochatmessages">
                <strong class="name-user-history" id="username${idAdd}">${identuser}</strong>
                <div class="messagenofocus">
                  <p class="contenidomessagenofocus" id="${identuser}">${finalmessage}</p>
                  <i class="fas fa-chevron-right"></i>
                </div>
              </div>
            </div>`);
            $('.container-message:last').attr('id',destinoOrigin);
           // $('.textMessage:last').addClass(destinoOrigin);
           // $('.btnEnvio:last').addClass(destinoOrigin);
            
    }
    $('#content-history').removeClass('selectedItem');
    $('.content-history').hide();
    $('.content-message').show();
    $(`#content-message`).addClass('selectedItem');
    $('.panel-message').hide();
    $(`#panelM${idAdd}`).show();
    sessionStorage.selected = "message";
    if($(`#userhistory${idAdd}`).hasClass('newMessage')) {
      $(`#userhistory${idAdd}`).removeClass('newMessage');
    }
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

  function bajarScroll() {
    $(".card-message").each(function() {   
      $(this).scrollTop($(this).prop("scrollHeight"));
    });
    /*$(".card-message").scrollTop($(".card-message").prop("scrollHeight"));*/
    console.log("bajando!!");
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
