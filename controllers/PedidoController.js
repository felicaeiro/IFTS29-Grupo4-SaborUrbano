const express = require("express");
const connectDB = require("../config/db");
const PedidoRepositorio = require("../services/PedidoRepositorio");
const Pedido = require("../models/Pedido");

const app = express();
app.use(express.json());

// Conectar a la base de datos
connectDB();

const getPedidos = async (req, res) => {
  try {
    const pedidos = await PedidoRepositorio.getPedidos();

    // Asegurarse que se carguen los datos de cliente y productos
    const pedidosConDatos = await Pedido.find({})
      .populate("id_cliente")
      .populate("productos");

    // Renderizamos la vista "pedidos.pug" con los datos
    res.render("pedidos", { pedidos: pedidosConDatos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPedidoById = async (req, res) => {
  try {
    const pedido = await PedidoRepositorio.getPedidoById(req.params.id);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.render("pedidos", { pedidos });
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
    const pedido = await PedidoRepositorio.createPedido(pedidoData);

    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePedido = async (req, res) => {
  try {
    const pedido = await PedidoRepositorio.deletePedido(req.params.id);
    res.status(200).json(pedido);
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

    const pedido = await PedidoRepositorio.updatePedido(
      req.params.id,
      pedidoData
    );

    res.status(200).json(pedido);
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
};
