const express = require('express');

const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} = require('../controllers/ProductoController');

const router = express.Router();

router.get('/', getProductos);
router.get('/:id', getProductoById);
router.post('/', createProducto);
router.delete('/:id', deleteProducto);
router.patch('/:id', updateProducto);

module.exports = router;
