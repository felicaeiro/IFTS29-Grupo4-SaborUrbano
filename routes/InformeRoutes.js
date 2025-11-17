const express = require('express');
const informeController = require('../controllers/InformeController');
const { authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authorizeRole(['admin',]), informeController.obtenerInforme);

module.exports = router;
