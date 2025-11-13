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
        const cliente = await ClienteRepositorio.createCliente(req.body);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(500).json({message: error.message});
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
        const cliente = await ClienteRepositorio.updateCliente(req.params.id, req.body);
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({message: error.message});

    }

}


module.exports = { getClientes ,getClienteById, createCliente,deleteCliente,updateCliente};