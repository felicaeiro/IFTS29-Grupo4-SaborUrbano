const express = require('express');
const router = express.Router();

const {
    getPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
} = require('../controllers/PedidoController');

const ProductoRepositorio = require('../services/ProductoRepositorio');
const PedidoRepositorio = require('../services/PedidoRepositorio');

// Formulario para crear nuevo pedido
router.get("/nuevo", async (req, res) => {
    const productos = await ProductoRepositorio.getProductos();
    res.render("nuevoPedido", { productos });
});

// Formulario para editar pedido existente
router.get("/editar/:id", async (req, res) => {
    const id = req.params.id;
    const pedido = await PedidoRepositorio.getPedidoById(id);
    const productos = await ProductoRepositorio.getProductos();

    if (!pedido) return res.status(404).send("Pedido no encontrado");

    res.render("editarPedido", { pedido, productos });
});

// CRUD API
router.get('/', getPedidos);
router.get('/:id', getPedidoById);
router.post('/', createPedido);
router.patch('/:id', updatePedido);
router.delete('/:id', deletePedido);

module.exports = router;
