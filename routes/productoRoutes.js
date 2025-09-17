const express = require('express');

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  patchProduct,
  removeProduct,
} = require('../controllers/productoController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.patch('/:id', patchProduct);
router.delete('/:id', removeProduct);

module.exports = router;
