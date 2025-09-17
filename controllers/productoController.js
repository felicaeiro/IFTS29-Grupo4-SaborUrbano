const productoService = require('../services/productoService.js');

const getProducts = async (req, res) => {
  const products = await productoService.getAllProducts();
  res.json(products);
};

const getProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await productoService.getProductById(id);
  console.log(product);
  product
    ? res.json(product)
    : res.status(404).json({ message: 'Producto no encontrado' });
};

const addProduct = async (req, res) => {
  const { nombre, precio } = req.body;
  const newProduct = await productoService.createProduct(nombre, precio);
  res.status(201).json(newProduct);
};

const removeProduct = async (req, res) => {
  const id = parseInt(req.params.id);

  await productoService.deleteProduct(id);
  res.json({ message: 'Producto eliminado' });
};

module.exports = { getProducts, getProduct, addProduct, removeProduct };
