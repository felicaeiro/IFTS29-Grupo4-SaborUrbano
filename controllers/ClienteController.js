const express = require('express');
const connectDB = require('../config/db');
const ClienteRepositorio = require('../services/ClienteRepositorio');
const Cliente = require('../models/Cliente');
const Pedido = require('../models/Pedido');

const app = express();
app.use(express.json());

connectDB();

const getClientes = async (req, res) => {
  try {
    const clientes = await ClienteRepositorio.getClientes();
    res.render('ClientesViews/clientes', { clientes: clientes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClienteById = async (req, res) => {
  try {
    const cliente = await ClienteRepositorio.getClienteById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.render('ClientesViews/detalleCliente', { cliente: cliente });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCliente = async (req, res) => {
  try {
    const clienteData = { ...req.body };

    if (clienteData.fecha_nacimiento) {
      clienteData.fecha_nacimiento = new Date(
        clienteData.fecha_nacimiento + 'T00:00:00'
      );
    }
    // Buscar si existe un cliente con ese DNI
    const clienteExiste = await Cliente.findOne({ dni: clienteData.dni });

    if (clienteExiste) {
      return res
        .status(400)
        .render('ClientesViews/nuevoCliente', {
          error: 'El cliente ya está registrado',
        });
    }

    await ClienteRepositorio.createCliente({
      nombre: clienteData.nombre,
      apellido: clienteData.apellido,
      fecha_nacimiento: clienteData.fecha_nacimiento,
      dni: clienteData.dni,
      domicilio: clienteData.domicilio,
    });

    res.redirect(`/clientes`);
  } catch (error) {
    console.error('Error al registrar al cliente:', error);
    res.status(500).json({ message: error.message });
  }
};

const deleteCliente = async (req, res) => {
  try {
    const cliente = await ClienteRepositorio.deleteCliente(req.params.id);
    res.redirect('/clientes');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCliente = async (req, res) => {
  try {
    const clienteData = { ...req.body };

    if (clienteData.fecha_nacimiento) {
      clienteData.fecha_nacimiento = new Date(
        clienteData.fecha_nacimiento + 'T00:00:00'
      );
    }

    const cliente = await ClienteRepositorio.updateCliente(
      req.params.id,
      clienteData
    );
    res.redirect(`/clientes`);
  } catch (error) {
    console.error('Error al actualizar al cliente:', error);
    res.status(500).json({ message: error.message });
  }
};

const verPedidosCliente = async (req, res) => {
  try {
    const clienteId = req.params.id;
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
      return res.status(404).send('Cliente no encontrado');
    }

    const pedidos = await Pedido.find({ id_cliente: clienteId })
      .populate('productos.producto')
      .lean();

    res.render('ClientesViews/pedidosDelCliente', {
      cliente,
      pedidos,
    });
  } catch (error) {
    console.error('Error al obtener pedidos del cliente:', error);
    res.status(500).send('Error en el servidor');
  }
};

module.exports = {
  getClientes,
  getClienteById,
  createCliente,
  deleteCliente,
  updateCliente,
  verPedidosCliente,
};
