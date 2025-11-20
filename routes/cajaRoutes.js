const express = require('express');
const router = express.Router();
const CajaController = require('../controllers/CajaController');

router.get('/', CajaController.mostrarVistaCaja);
router.post('/pagos/:id', CajaController.registrarPago);
router.get('/factura/:id', CajaController.emitirFactura);

module.exports = router;
