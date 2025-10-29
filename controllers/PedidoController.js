const express = require("express");
const connectDB = require("../config/db");
const PedidoRepositorio = require("../services/PedidoRepositorio");
const ProductoRepositorio = require("../services/ProductoRepositorio");
const Pedido = require("../models/Pedido");
const Producto = require("../models/Producto");
const ClienteRepositorio = require("../services/ClienteRepositorio");

const app = express();
app.use(express.json());

// Conectar a la base de datos
connectDB();

const getPedidos = async (req, res) => {
  try {
    const pedidosPendientes = await PedidoRepositorio.getPedidos();
    res.render("pedidos", { pedidos: pedidosPendientes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPedidoById = async (req, res) => {
  try {
    const pedido = await PedidoRepositorio.getPedidoById(req.params.id);

    if (!pedido) return res.status(404).send("Pedido no encontrado");

    const productos = await ProductoRepositorio.getProductos();
    const clientes = await ClienteRepositorio.getClientes();
    const productosPedidoIds = Array.isArray(pedido.productos)
      ? pedido.productos.map((p) => p._id.toString())
      : [];
    res.render("editarPedido", {
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
      pedidoData.fecha = new Date(pedidoData.fecha + "T00:00:00");
    }

    let productosIds = pedidoData.productos;
    if (!Array.isArray(productosIds)) {
      productosIds = [productosIds];
    }

    const productosSeleccionados = productosIds.length
      ? await Producto.find({ _id: { $in: productosIds } })
      : [];

    const montoTotal = calcularMontoTotal(productosSeleccionados);
    pedidoData.total = montoTotal;

    const pedido = await PedidoRepositorio.createPedido(pedidoData);

    res.redirect(`/pedidos/ticket/${pedido._id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePedido = async (req, res) => {
  try {
    await PedidoRepositorio.deletePedido(req.params.id);
    res.redirect("/pedidos");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePedido = async (req, res) => {
  try {
    const pedidoData = { ...req.body };

    if (pedidoData.fecha) {
      pedidoData.fecha = new Date(pedidoData.fecha + "T00:00:00");
    }

    let productosIds = pedidoData.productos;
    if (!Array.isArray(productosIds)) {
      productosIds = [productosIds];
    }

    const productosSeleccionados = await Producto.find({
      _id: { $in: productosIds },
    });

    const montoTotal = calcularMontoTotal(productosSeleccionados);
    pedidoData.total = montoTotal;

    const pedido = await PedidoRepositorio.updatePedido(
      req.params.id,
      pedidoData
    );

    res.redirect(`/pedidos/ticket/${pedido._id}`);
  } catch (error) {
    console.error("Error al actualizar pedido:", error);
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

// Finalizar pedido
const finalizarPedido = async (req, res) => {
  try {
    const finalizar = await PedidoRepositorio.finalizarPedido(req.params.id);
    res.status(200).json({ message: 'Pedido finalizado', finalizar });
    } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener los pedidos finalizados
const getPedidosFinalizados = async (req, res) => {
  try {
    const pedido = await PedidoRepositorio.getPedidoById(req.params.id);
    const finalizados = await PedidoRepositorio.getPedidosFinalizados();
    const clientes = await ClienteRepositorio.getClientes();
    const productosPedidoIds = Array.isArray(pedido.productos)
      ? pedido.productos.map((p) => p._id.toString())
      : [];

    res.render(
      "pedidosFinalizados",
      { pedidos: finalizados,
      pedido,
      clientes,
      productosPedidoIds
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPedidos,
  getPedidoById,
  createPedido,
  deletePedido,
  updatePedido,
  finalizarPedido,
  getPedidosFinalizados,
};
