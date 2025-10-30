const express = require('express');
const informeController = require('../controllers/InformeController');

const router = express.Router();

router.get('/', informeController.obtenerInforme);

module.exports = router;