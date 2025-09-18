const productoService = require('../services/productoService.js');

const getProducts = async (req, res) => {
  const products = await productoService.getAllProducts();
  res.render('producto', { titulo: 'Lista de productos', products });
};

const getProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await productoService.getProductById(id);
  if (!product) {
    return res
      .status(404)
      .render('error', { message: 'Producto no encontrado' });
  }

  res.render('detalleProducto', { product });
};

const addProduct = async (req, res) => {
  console.log(req.body);
  const { id, nombre, precio, descripcion } = req.body;
  if (!id || !nombre || precio == null) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }

  const newProduct = await productoService.createProduct(
    id,
    nombre,
    precio,
    descripcion
  );
  res.status(201).json(newProduct);
};

const updateProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, descripcion, precio } = req.body;

  const updatedProduct = await productoService.updateProduct(id, {
    nombre,
    descripcion,
    precio,
  });

  updatedProduct
    ? res.json(updatedProduct)
    : res.status(404).json({ message: 'Producto no encontrado' });
};

const patchProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  const fields = req.body;

  const patchedProduct = await productoService.patchProduct(id, fields);

  patchedProduct
    ? res.json(patchedProduct)
    : res.status(404).json({ message: 'Producto no encontrado' });
};

const removeProduct = async (req, res) => {
  const id = parseInt(req.params.id);

  await productoService.deleteProduct(id);
  res.redirect('/productos');
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  patchProduct,
  updateProduct,
  removeProduct,
};
