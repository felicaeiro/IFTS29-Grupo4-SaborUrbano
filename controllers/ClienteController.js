const express = require('express');
const connectDB = require('../config/db');
const ClienteRepositorio = require('../services/ClienteRepositorio');
const Cliente = require('../models/Cliente');

const app = express();
app.use(express.json());

connectDB();

const getClientes = async (req, res) => {
    try {
        const clientes = await ClienteRepositorio.getClientes();
        res.render("clientes", {clientes: clientes});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getClienteById = async (req,res) => {
    try {
        const cliente = await ClienteRepositorio.getClienteById(req.params.id);
        if (!cliente) {
            return res.status(404).json({message: 'Cliente no encontrado'});
        }
        res.render("detalleCliente", {cliente: cliente});
    } catch (error) {
        res.status(500).json({message: error.message});

    }

}

const createCliente = async (req,res) => {
    try {
    const clienteData = { ...req.body };

    if (clienteData.fecha_nacimiento) {
        clienteData.fecha_nacimiento = new Date(clienteData.fecha_nacimiento + "T00:00:00");
    }

    const cliente = await ClienteRepositorio.createCliente({
        nombre: clienteData.nombre,
        apellido: clienteData.apellido,
        fecha_nacimiento: clienteData.fecha_nacimiento,
        dni: clienteData.dni,
        domicilio: clienteData.domicilio,
    });

    res.redirect(`/clientes`);
    } catch (error) {
    console.error("Error al registrar al cliente:", error);
    res.status(500).json({ message: error.message });
    }
}

const deleteCliente = async (req,res) => {
    try{
        const cliente = await ClienteRepositorio.deleteCliente(req.params.id);
        res.redirect("/clientes");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


const updateCliente = async (req,res) => {
    try {
        const clienteData = { ...req.body };

    if (clienteData.fecha_nacimiento) {
        clienteData.fecha_nacimiento = new Date(clienteData.fecha_nacimiento + "T00:00:00");
    }

    const cliente = await ClienteRepositorio.updateCliente(
        req.params.id,
        clienteData
    );
    res.redirect(`/clientes`);
    
    } catch (error) {
        console.error("Error al actualizar al cliente:", error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = { getClientes ,getClienteById, createCliente,deleteCliente,updateCliente};