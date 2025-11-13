const express = require('express');
const router = express.Router();
const CajaController = require('../controllers/CajaController');

router.get('/', CajaController.mostrarVistaCaja);
router.get('/pedidos', CajaController.verPedidosPendientes);
router.post('/pagos/:id', CajaController.registrarPago);
router.get('/factura/:id', CajaController.emitirFactura);
router.get('/historial', CajaController.verHistorial);

module.exports = router;
