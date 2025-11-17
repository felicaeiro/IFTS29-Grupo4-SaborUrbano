const express = require('express');

const {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
    verPedidosCliente,
} = require('../controllers/ClienteController');

const router = express.Router();

const ProductoRepositorio = require('../services/ProductoRepositorio');
const PedidoRepositorio = require('../services/PedidoRepositorio');
const ClienteRepositorio = require('../services/ClienteRepositorio');
const {authorizeRole} = require("../middleware/authMiddleware");

// Formulario para crear nuevo cliente
router.get("/nuevo", async (req, res) => {
    const productos = await ProductoRepositorio.getProductos();
    const clientes = await ClienteRepositorio.getClientes();
    res.render("nuevoCliente", { productos, clientes });
});


// Formulario para editar cliente
router.get("/editar/:id", async (req, res) => {
    const id = req.params.id;
    const cliente = await ClienteRepositorio.getClienteById(id);
    if (!cliente) return res.status(404).send("Cliente no encontrado");
    res.render("editarCliente", { cliente });
});


<<<<<<< HEAD
router.get('/',authorizeRole(['admin','caja']), getClientes);
router.get('/:id',authorizeRole(['admin','caja']), getClienteById);
router.post('/',authorizeRole(['admin','caja']),createCliente);
router.put('/:id',authorizeRole(['admin','caja']),updateCliente);
router.delete('/:id',authorizeRole(['admin','caja']),deleteCliente);
=======
router.get('/', getClientes);
router.get('/:id', getClienteById);
router.post('/',createCliente);
router.put('/:id',updateCliente);
router.delete('/:id',deleteCliente);
router.get('/:id/pedidos', verPedidosCliente);

>>>>>>> segunda-entrega

module.exports = router;