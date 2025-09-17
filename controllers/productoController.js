const productoService = require('../services/productoService.js');

const getProducts = async (req, res) => {
  const products = await productoService.getAllProducts();
  res.json(products);
};

const getProduct = async (req, res) => {
  const product = await productoService.getProductById(req.params.id);
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
  await productoService.deleteProduct(req.params.id);
  res.json({ message: 'Producto eliminado' });
};
module.exports = { getProducts, getProduct, addProduct, removeProduct };
