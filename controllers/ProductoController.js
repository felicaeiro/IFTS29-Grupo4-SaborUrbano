const express = require('express');
const connectDB = require('../config/db');
const ProductoRepositorio = require('../services/ProductoRepositorio');
const Producto = require('../models/Producto');

const app = express();
app.use(express.json());

// Conectar a la base de datos
connectDB();

const getProductos = async (req, res) => {
    try {
        const productos = await ProductoRepositorio.getProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getProductoById = async (req,res) => {
    try {
        const producto = await ProductoRepositorio.getProductoById(req.params.id);
        if (!producto) {
            return res.status(404).json({message: 'Producto no encontrado'});
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({message: error.message});

    }

}

const createProducto = async (req,res) => {

    try {
        const producto = await ProductoRepositorio.createProducto(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

const deleteProducto = async (req,res) => {
    try{
        const producto = await ProductoRepositorio.deleteProducto(req.params.id);
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


const updateProducto = async (req,res) => {
    try {
        const producto = await ProductoRepositorio.updateProducto(req.params.id, req.body);
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({message: error.message});

    }

}


module.exports = { getProductos ,getProductoById, createProducto,deleteProducto,updateProducto};