
const express = require('express');

const {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
} = require('../controllers/ClienteController');

const router = express.Router();

router.get('/', getClientes);
router.get('/:id', getClienteById);
router.post('/',createCliente)
router.delete('/:id',deleteCliente)
router.patch('/:id',updateCliente)

module.exports = router;