const productoService = require("../services/productoService");
const pedidoService = require("../services/pedidoService"); 

// pedidoRoutes.js
const express = require("express");
const {
    getPedidos,
    getPedido,
    addPedido,
    updatePedido,
    patchPedido,
    deletePedido
} = require("../controllers/pedidoController");

const router = express.Router();


// Ruta para el form de nuevo pedido
router.get("/nuevo", async (req, res) => {
    const productos = await productoService.getAllProducts();
    res.render("nuevoPedido", { productos }); 
});


// Ruta para el form de editar pedido
router.get("/editar/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const pedido = await pedidoService.getPedidoById(id);
    const productos = await productoService.getAllProducts(); 

    if (!pedido) return res.status(404).send("Pedido no encontrado");
    res.render("editarPedido", { pedido, productos }); 
});


router.get("/", getPedidos);
router.get("/:id", getPedido);
router.post("/", addPedido);
router.put("/:id", updatePedido);
router.patch("/:id", patchPedido);
router.delete("/:id", deletePedido);



module.exports = router;
