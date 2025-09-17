const express = require('express');

const {
  getProducts,
  getProduct,
  addProduct,
  removeProduct,
} = require('../controllers/productoController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', addProduct);
router.delete('/:id', removeProduct);

module.exports = router;
