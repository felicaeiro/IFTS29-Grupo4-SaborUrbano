const express = require('express');
const router = express.Router();

const {
    getPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
    finalizarPedido,
    getPedidosFinalizados,
} = require('../controllers/pedidoController');

const ProductoRepositorio = require('../services/ProductoRepositorio');
const PedidoRepositorio = require('../services/PedidoRepositorio');
const ClienteRepositorio = require('../services/ClienteRepositorio');

// Formulario para crear nuevo pedido
router.get("/nuevo", async (req, res) => {
    const productos = await ProductoRepositorio.getProductos();
    const clientes = await ClienteRepositorio.getClientes();
    res.render("nuevoPedido", { productos, clientes });
});


// Formulario para editar pedido existente
router.get("/editar/:id", async (req, res) => {
    const id = req.params.id;
    const pedido = await PedidoRepositorio.getPedidoById(id);
    const productos = await ProductoRepositorio.getProductos();
    const clientes = await ClienteRepositorio.getClientes();

    if (!pedido) return res.status(404).send("Pedido no encontrado");

    res.render("editarPedido", { pedido, productos, clientes });
});


// Ticket del pedido
router.get("/ticket/:id", async (req, res) => {
    const id = req.params.id;
    const pedido = await PedidoRepositorio.getPedidoById(id);
    const productos = await ProductoRepositorio.getProductos();
    const clientes = await ClienteRepositorio.getClientes();
    
    if (!pedido) return res.status(404).send("Pedido no encontrado");

    res.render("ticketPedido", { pedido, productos, clientes });
});


    router.get("/finalizados", getPedidosFinalizados);
router.put("/finalizar/:id", finalizarPedido);


// CRUD API
router.get('/', getPedidos);
router.get('/:id', getPedidoById);
router.post('/', createPedido);
router.put('/:id', updatePedido);
router.delete('/:id', deletePedido);

module.exports = router;
