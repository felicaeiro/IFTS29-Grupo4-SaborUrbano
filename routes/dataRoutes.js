const express = require('express');

const {
    baseDeDatos,

} = require('../controllers/BaseDeDatosController');

const router = express.Router();

router.get('/', baseDeDatos);

module.exports = router;