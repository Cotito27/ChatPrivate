const express = require('express');
const router = express.Router();
const Database = require("@replit/database");
const uuid = require('uuid');
let varEnv = require('../variables');
let db = require('../database');
let functions = require('../functions');

let usersOnline = varEnv.usersOnline;
let messages = varEnv.messages;
let selectedHistory = varEnv.selectedHistory;

//  const storage = require('node-sessionstorage');
let oldMessages = [];
let newMessages = [];

router.get('/', async (req, res) => {
    //console.log(oldMessages);
      oldMessages = await varEnv.oldMessages.then(console.log('Mensajes obtenidos')).catch((err) => {console.log(err)});
      //console.log(oldMessages);
      if(messages.length != undefined){
        if(messages.length>=1){
          oldMessages = messages;
        }
      }
      
   
      //console.log(oldMessages);
    //console.log(selectedHistory);
    if(oldMessages) {
      res.render('index.html', { title: 'Chat Web', content: 'page-message', validado: req.body, redirect: 'page-login', dataMessages: oldMessages, dataUsers: usersOnline , userDefault: uuid, userHistory: oldMessages[oldMessages.length-1], selectedHistory });
    //console.log(req.body);
    } else {
      res.render('index.html', { title: 'Chat Web', content: 'page-message', validado: req.body, redirect: 'page-login', dataMessages: oldMessages, dataUsers: usersOnline , userDefault: uuid, userHistory: [], selectedHistory });
    //console.log(req.body);
    }
    
});
router.get('/user', async (req, res) => {
  console.log(req.id);
  await actualizarMessages();
  res.render('index.html', { title: 'Chat Web', content: 'page-message', validado: req.body, redirect: 'page-login', data: oldMessages,  userDefault: req.id});
  console.log(req.body);
});

router.post('/', (req, res) => {
  res.render('index.html', { title: 'Chat Web', content: 'page-message', validado: req.body, redirect: 'page-login' });
  console.log(req.body);
});

/*router.get('/page-message', (req, res) => {
    res.render('index.html', { title: 'Chat Web', content: 'page-message', validado: req.body, redirect: 'page-login' });
});

router.post('/page-message', (req, res) => {
  res.render('index.html', { title: 'Chat Web', content: 'page-message', validado: req.body, redirect: 'page-login' });
});

router.get('/page-users', (req, res) => {
  res.render('index.html', { title: 'Chat Web', content: 'page-users', validado: req.body, redirect: 'page-login' });
});

router.post('/page-users', (req, res) => {
  res.render('index.html', { title: 'Chat Web', content: 'page-users', validado: req.body, redirect: 'page-login' });
});

router.get('/page-config', (req, res) => {
  res.render('index.html', { title: 'Chat Web', content: 'page-config', validado: req.body, redirect: 'page-login' });
});

router.post('/page-config', (req, res) => {
  res.render('index.html', { title: 'Chat Web', content: 'page-config', validado: req.body, redirect: 'page-login' });
});

router.get('/page-history', (req, res) => {
  res.render('index.html', { title: 'Chat Web', content: 'page-history', validado: req.body, redirect: 'page-login' });
});

router.post('/page-history', (req, res) => {
  res.render('index.html', { title: 'Chat Web', content: 'page-history', validado: req.body, redirect: 'page-login' });
});*/

router.get('/page-register', (req, res) => {
  if(oldMessages) {
    res.render('index.html', { title: 'Chat Web', content: 'page-message', validado: req.body, redirect: 'page-register', dataMessages: oldMessages, dataUsers: usersOnline , userDefault: uuid, userHistory: oldMessages[oldMessages.length-1], selectedHistory });
  //console.log(req.body);
  } else {
    res.render('index.html', { title: 'Chat Web', content: 'page-message', validado: req.body, redirect: 'page-register', dataMessages: oldMessages, dataUsers: usersOnline , userDefault: uuid, userHistory: [], selectedHistory });
  //console.log(req.body);
  }
});

router.post('/page-register', (req, res) => {
  res.render('index.html', { title: 'Chat Web',content: req.body || 'page-message', redirect: 'page-register', validado: req.body });
});

router.get('/page-login', (req, res) => {
  res.render('index.html', { title: 'Chat Web',content: req.body || 'page-message', redirect: 'page-login', validado: req.body, dataMessages: oldMessages, dataUsers: usersOnline });
});

router.post('/page-login', (req, res) => {
  res.render('index.html', { title: 'Chat Web',content: req.body || 'page-message', redirect: 'page-login', validado: req.body });
});

module.exports = {router,oldMessages};