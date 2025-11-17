
const express = require('express');

const {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
} = require('../controllers/ProductoController');
const {authorizeRole} = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/', authorizeRole(['admin','caja']),getProductos);
router.get('/:id', authorizeRole(['admin','caja']),getProductoById);
router.post('/',authorizeRole(['admin','caja']),createProducto)
router.delete('/:id',authorizeRole(['admin','caja']),deleteProducto)
router.patch('/:id',authorizeRole(['admin','caja']),updateProducto)

module.exports = router;