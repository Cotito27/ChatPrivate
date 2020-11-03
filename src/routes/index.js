const express = require('express');
const router = express.Router();

// Controllers
const home = require('../controllers/home');
const image = require('../controllers/image');
const audio = require('../controllers/audio');

router.get('/', home.index);
router.get('/page-register', home.register);
router.get('/images/:image_id', image.index);
router.post('/images', image.create);
router.get('/audio/:audio_id', audio.index);
router.post('/audio', audio.create);

module.exports = {router};