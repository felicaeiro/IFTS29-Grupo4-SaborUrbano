const productoService = require("../services/productoService");

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


// Ruta para mostrar el formulario de nuevo pedido
router.get("/nuevo", async (req, res) => {
    const productos = await productoService.getAllProducts();
    res.render("nuevoPedido", { productos }); 
});


router.get("/", getPedidos);
router.get("/:id", getPedido);
router.post("/", addPedido);
router.put("/:id", updatePedido);
router.patch("/:id", patchPedido);
router.delete("/:id", deletePedido);

module.exports = router;
