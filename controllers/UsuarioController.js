const usuarioRepositorio = require("../services/UsuarioRepositorio");

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioRepositorio.getUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUsuario = async (req, res) => {
    try {
        const usuarioCreado = await usuarioRepositorio.createUsuario(req.body);
        res.status(201).json(usuarioCreado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    getUsuarios,
    createUsuario,
};
