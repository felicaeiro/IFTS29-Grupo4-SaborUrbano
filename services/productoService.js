const { Producto } = require('../models/productoModel.js');
const { readData, writeData } = require('../config/db.js');
const FILE = 'productos.json';

const getAllProducts = async () => await readData(FILE);

const getProductById = async (id) => {
  const products = await readData(FILE);
  return products.find((p) => p.id === id);
};

const createProduct = async (id, nombre, descripcion, precio) => {
  const products = await readData(FILE);
  const newProduct = new Producto(id, nombre, descripcion, precio);
  products.push(newProduct);
  await writeData(FILE, products);
  return newProduct;
};

const updateProduct = async (id, { nombre, descripcion, precio }) => {
  const products = await readData(FILE);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updatedProduct = new Producto(id, nombre, descripcion, precio);
  products[index] = updatedProduct;

  await writeData(FILE, products);
  return updatedProduct;
};

const patchProduct = async (id, fields) => {
  const products = await readData(FILE);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  products[index] = { ...products[index], ...fields };

  await writeData(FILE, products);
  return products[index];
};

const deleteProduct = async (id) => {
  let products = await readData(FILE);
  products = products.filter((p) => p.id !== id);
  await writeData(FILE, products);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
