const express = require('express');

const {
    getPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
} = require('../controllers/PedidoController');

const router = express.Router();


// Ruta para el form de nuevo pedido
router.get("/nuevo", async (req, res) => {
    const productos = await ProductoRepositorio.getProductos();
    res.render("nuevoPedido", { productos });
});


// Ruta para el form de editar pedido
router.get("/editar/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const pedido = await PedidoRepositorio.getPedidoById(id);
    const productos = await ProductoRepositorio.getProductos();

    if (!pedido) return res.status(404).send("Pedido no encontrado");
    res.render("editarPedido", { pedido, productos });
});

router.get('/', getPedidos);
router.get('/:id', getPedidoById);
router.post('/',createPedido)
router.delete('/:id',deletePedido)
router.patch('/:id',updatePedido)

module.exports = router;