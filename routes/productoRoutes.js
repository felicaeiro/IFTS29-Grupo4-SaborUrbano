const express = require('express');

const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  formNuevo
} = require('../controllers/ProductoController');

const router = express.Router();

router.get('/', getProductos);
router.get('/:id', getProductoById);
router.post('/', createProducto);
router.delete('/:id', deleteProducto);
router.patch('/:id', updateProducto);
router.get('/nuevo', formNuevo);

module.exports = router;
