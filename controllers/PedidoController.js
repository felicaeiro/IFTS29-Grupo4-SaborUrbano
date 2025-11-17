const express = require('express');
const connectDB = require('../config/db');
const PedidoRepositorio = require('../services/PedidoRepositorio');
const ProductoRepositorio = require('../services/ProductoRepositorio');
const Producto = require('../models/Producto');
const ClienteRepositorio = require('../services/ClienteRepositorio');

const app = express();
app.use(express.json());

connectDB();

const getPedidos = async (req, res) => {
  try {
    const pedidosPendientes = await PedidoRepositorio.getPedidos({
      estados: ['pendiente', 'preparando'],
    });
    res.render('pedidos', {
      pedidos: pedidosPendientes,
      usuario: req.user.usuario,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPedidoById = async (req, res) => {
  try {
    const pedido = await PedidoRepositorio.getPedidoById(req.params.id);

    if (!pedido) return res.status(404).send('Pedido no encontrado');

    const productos = await ProductoRepositorio.getProductos();
    const clientes = await ClienteRepositorio.getClientes();
    const productosPedidoIds = Array.isArray(pedido.productos)
      ? pedido.productos.map((p) => p._id.toString())
      : [];
    res.render('editarPedido', {
      pedido,
      productos,
      clientes,
      productosPedidoIds,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPedido = async (req, res) => {
  try {
    const pedidoData = { ...req.body };

    if (pedidoData.fecha) {
      pedidoData.fecha = new Date(pedidoData.fecha + 'T00:00:00');
    }

    let productosIds = pedidoData.productos;
    if (!Array.isArray(productosIds)) {
      productosIds = [productosIds];
    }

    const productosSeleccionados = await Producto.find({
      _id: { $in: productosIds },
    });

    const productosArray = productosSeleccionados.map((p) => ({
      producto: p._id,
      nombre: p.nombre,
      precio: p.precio,
      cantidad: parseInt(pedidoData.cantidades[p._id]) || 1,
    }));

    const montoTotal = productosArray.reduce(
      (total, p) => total + p.precio * p.cantidad,
      0
    );

    const pedido = await PedidoRepositorio.createPedido({
      fecha: pedidoData.fecha,
      total: montoTotal,
      tipo: pedidoData.tipo,
      estado: pedidoData.estado || 'pendiente',
      id_cliente: pedidoData.id_cliente,
      productos: productosArray,
    });

    res.redirect(`/pedidos/ticket/${pedido._id}`);
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ message: error.message });
  }
};

const deletePedido = async (req, res) => {
  try {
    await PedidoRepositorio.deletePedido(req.params.id);
    res.redirect('/pedidos');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePedido = async (req, res) => {
  try {
    const pedidoData = { ...req.body };

    if (pedidoData.fecha) {
      pedidoData.fecha = new Date(pedidoData.fecha + 'T00:00:00');
    }

    let productosIds = pedidoData.productos;
    if (!Array.isArray(productosIds)) {
      productosIds = [productosIds];
    }

    pedidoData.productos = productosIds.map((id) => ({
      producto: id,
      cantidad: parseInt(pedidoData.cantidades[id]) || 1,
    }));

    const productosSeleccionados = await Producto.find({
      _id: { $in: productosIds },
    });
    pedidoData.total = productosSeleccionados.reduce((total, p) => {
      const cantidad = parseInt(pedidoData.cantidades[p._id]) || 1;
      return total + p.precio * cantidad;
    }, 0);

    const pedido = await PedidoRepositorio.updatePedido(
      req.params.id,
      pedidoData
    );

    res.redirect(`/pedidos/ticket/${pedido._id}`);
  } catch (error) {
    console.error('Error al actualizar pedido:', error);
    res.status(500).json({ message: error.message });
  }
};

// Función para calcular el total de productos seleccionados
function calcularMontoTotal(productos) {
  let total = 0;
  for (const p of productos) {
    total += p.precio;
  }
  return total;
}

// Cambiar el estado de los pedidos a PREPARAR o FINALIZADO
const cambiarEstado = async (req, res) => {
  try {
    const pedido = await PedidoRepositorio.updatePedido(req.params.id, {
      estado: req.body.estado
    });

    res.json({ ok: true, pedido });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const finalizarPedido = async (req, res) => {
  try {
    const finalizar = await PedidoRepositorio.finalizarPedido(req.params.id);
    res.status(200).json({ message: 'Pedido finalizado', finalizar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPedidosFinalizados = async (req, res) => {
  try {
    const finalizados = await PedidoRepositorio.getPedidosFinalizados();
    const clientes = await ClienteRepositorio.getClientes();

    res.render('pedidosFinalizados', {
      pedidos: finalizados,
      clientes,
      productos: finalizados.productos,
      usuario: req.user.usuario,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const formNuevo = async (req, res) => {
  const productos = await ProductoRepositorio.getProductos();
  const clientes = await ClienteRepositorio.getClientes();

  res.render('nuevoPedido', {
    productos,
    clientes,
    usuario: req.user.usuario,
  });
};

const formEditar = async (req, res) => {
  const id = req.params.id;
  const pedido = await PedidoRepositorio.getPedidoById(id);
  const productos = await ProductoRepositorio.getProductos();
  const clientes = await ClienteRepositorio.getClientes();

  if (!pedido) return res.status(404).send('Pedido no encontrado');

  res.render('editarPedido', {
    pedido,
    productos,
    clientes,
    usuario: req.user.usuario,
  });
};

const ticketPedido = async (req, res) => {
  const id = req.params.id;
  const pedido = await PedidoRepositorio.getPedidoById(id);

  if (!pedido) return res.status(404).send('Pedido no encontrado');

  res.render('ticketPedido', { pedido, usuario: req.user.usuario });
};

module.exports = {
  getPedidos,
  getPedidoById,
  createPedido,
  deletePedido,
  updatePedido,
  finalizarPedido,
  getPedidosFinalizados,
  ticketPedido,
  formEditar,
  formNuevo,
  cambiarEstado,
};
