const express = require('express');
const router = express.Router();
const CajaController = require('../controllers/CajaController');
const {authorizeRole} = require("../middleware/authMiddleware");

router.get('/',authorizeRole(['admin','caja']), CajaController.mostrarVistaCaja);
router.get('/pedidos',authorizeRole(['admin','caja']), CajaController.verPedidosPendientes);
router.post('/pagos/:id',authorizeRole(['admin','caja']), CajaController.registrarPago);
router.get('/factura/:id',authorizeRole(['admin','caja']), CajaController.emitirFactura);

module.exports = router;
