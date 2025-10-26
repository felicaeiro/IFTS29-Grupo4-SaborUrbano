const connectDB = require('../config/db');
const datosService = require("../services/DatosService")


connectDB(); 

const baseDeDatos = async (req, res) => {
    try {

        await Promise.all([
            datosService.crearProductos(),
            datosService.crearClientes()
        ]);

        await datosService.crearPedidos();
        res.status(201).send('Base de datos inicializada con éxito.');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        res.status(500).send('Error al inicializar la base de datos.');
    }
}

module.exports = { baseDeDatos };