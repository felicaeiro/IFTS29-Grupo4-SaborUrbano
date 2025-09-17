const express = require("express");
const {
    getPedidos,
    getPedido,
    addPedido,
    // updatePedido,
    deletePedido
} = require("../controllers/pedidoController");

const router = express.Router();


router.get("/", getPedidos);
router.get("/:id", getPedido);
router.post("/", addPedido);
// router.put("/:id", updatePedido);
router.delete("/:id", deletePedido);


module.exports = router;