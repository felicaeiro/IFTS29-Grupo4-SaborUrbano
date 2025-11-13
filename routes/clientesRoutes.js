const express = require('express');

const {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
} = require('../controllers/ClienteController');

const ProductoRepositorio = require('../services/ProductoRepositorio');
const PedidoRepositorio = require('../services/PedidoRepositorio');
const ClienteRepositorio = require('../services/ClienteRepositorio');

// Formulario para crear nuevo cliente
router.get("/nuevo", async (req, res) => {
    const productos = await ProductoRepositorio.getProductos();
    const clientes = await ClienteRepositorio.getClientes();
    res.render("nuevoCliente", { productos, clientes });
});


// Formulario para editar cliente
// router.get("/editar/:id", async (req, res) => {
//     const id = req.params.id;
//     const pedido = await PedidoRepositorio.getPedidoById(id);
//     const productos = await ProductoRepositorio.getProductos();
//     const clientes = await ClienteRepositorio.getClientes();

//     if (!pedido) return res.status(404).send("Pedido no encontrado");

//     res.render("editarPedido", { pedido, productos, clientes });
// });

const router = express.Router();

router.get('/', getClientes);
router.get('/:id', getClienteById);
router.post('/',createCliente)
router.delete('/:id',deleteCliente)
router.patch('/:id',updateCliente)

module.exports = router;