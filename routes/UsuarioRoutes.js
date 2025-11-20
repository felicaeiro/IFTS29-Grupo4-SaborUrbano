const express = require("express");
const router = express.Router();
const { getUsuarios, createUsuario } = require("../controllers/UsuarioController");
const { authorizeRole } = require('../middleware/authMiddleware');

router.get("/", authorizeRole(['admin']), getUsuarios);
router.post("/", authorizeRole(['admin']), createUsuario);

module.exports = router;
