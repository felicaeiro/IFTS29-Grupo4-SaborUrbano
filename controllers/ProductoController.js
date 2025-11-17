const express = require('express');
const connectDB = require('../config/db');
const ProductoRepositorio = require('../services/ProductoRepositorio');
const Producto = require('../models/Producto');

const app = express();
app.use(express.json());

connectDB();

const getProductos = async (req, res) => {
  try {
    const productos = await ProductoRepositorio.getProductos();
    res.render('ProductosViews/producto', {
      productos: productos,
      usuario: req.user.usuario,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductoById = async (req, res) => {
  try {
    const producto = await ProductoRepositorio.getProductoById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.render('ProductosViews/detalleProducto', {
      producto,
      usuario: req.user.usuario,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProducto = async (req, res) => {
  try {
    const productoData = { ...req.body };
    const productoExiste = await Producto.findOne({
      nombre: productoData.nombre,
    });

    if (productoExiste) {
      return res.status(400).render('ProductosViews/nuevoProducto', {
        error: 'El producto ya existe',
      });
    }

    const producto = await ProductoRepositorio.createProducto(req.body);
    res.redirect('/productos');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const producto = await ProductoRepositorio.deleteProducto(req.params.id);
    res.redirect('/productos');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProducto = async (req, res) => {
  try {
    const producto = await ProductoRepositorio.updateProducto(
      req.params.id,
      req.body
    );
    res.redirect('/productos');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const formNuevo = async (req, res) => {
  const productos = await ProductoRepositorio.getProductos();

  res.render('ProductosViews/nuevoProducto', {
    productos,
    usuario: req.user.usuario,
  });
};

const formEditar = async (req, res) => {
  const id = req.params.id;
  const producto = await ProductoRepositorio.getProductoById(id);
  if (!producto) return res.status(404).send('Producto no encontrado');
  console.log(producto);
  res.render('ProductosViews/editarProducto', {
    producto,
    usuario: req.user.usuario,
  });
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  deleteProducto,
  updateProducto,
  formNuevo,
  formEditar,
};
