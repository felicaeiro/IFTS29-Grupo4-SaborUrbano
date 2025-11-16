const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/PedidoController');

router.get('/nuevo', PedidoController.formNuevo);
router.get('/editar/:id', PedidoController.formEditar);
router.get('/ticket/:id', PedidoController.ticketPedido);

router.get('/finalizados', PedidoController.getPedidosFinalizados);
router.put('/finalizar/:id', PedidoController.finalizarPedido);
router.put('/cambiar-estado/:id', PedidoController.cambiarEstado);


// CRUD API
router.get('/', PedidoController.getPedidos);
router.get('/:id', PedidoController.getPedidoById);
router.post('/', PedidoController.createPedido);
router.put('/:id', PedidoController.updatePedido);
router.delete('/:id', PedidoController.deletePedido);

module.exports = router;
