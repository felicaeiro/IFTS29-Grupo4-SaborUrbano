const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");

class UsuarioRepositorio {
  async getUsuarios() {
    return await Usuario.find({});
  }

  async createUsuario({ usuario, clave, rol }) {
    if (!usuario || !clave) {
      throw new Error("Usuario y clave son obligatorios");
    }

    const hashedClave = await bcrypt.hash(clave, 10);

    const nuevoUsuario = new Usuario({
      usuario,
      clave: hashedClave,
      rol: rol || "admin",
    });

    const usuarioCreado = await nuevoUsuario.save();
    const { clave: _, ...usuarioSinClave } = usuarioCreado.toObject();

    return usuarioSinClave;
  }
}

module.exports = new UsuarioRepositorio();
