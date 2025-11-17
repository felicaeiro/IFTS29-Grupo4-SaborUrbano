const express = require('express');

const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  formNuevo,formEditar
} = require('../controllers/ProductoController');

const router = express.Router();

router.get('/', getProductos);
router.get('/nuevo', formNuevo);
router.get('/editar/:id', formEditar);

router.get('/:id', getProductoById);
router.post('/', createProducto);
router.delete('/:id', deleteProducto);
router.put('/:id', updateProducto);

module.exports = router;
