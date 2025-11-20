const express = require('express');

const {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  verPedidosCliente,
  formNuevo,
  formEditar,
} = require('../controllers/ClienteController');

const router = express.Router();


router.get('/', getClientes);
router.get('/nuevo', formNuevo);
router.get('/editar/:id', formEditar);
router.get('/:id', getClienteById);
router.post('/', createCliente);
router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);
router.get('/:id/pedidos', verPedidosCliente);

module.exports = router;
