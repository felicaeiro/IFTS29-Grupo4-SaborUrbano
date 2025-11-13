const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { usuario, clave } = req.body;

  try {
    const user = await Usuario.findOne({ usuario });
    if (!user) {
      return res.render('login', { error: 'Usuario no encontrado' });
    }

    const esValida = await bcrypt.compare(clave, user.clave);
    if (!esValida) {
      return res.render('login', { error: 'Contraseña incorrecta' });
    }

    req.session.usuario = user.usuario;
    req.session.rol = user.rol;

    if (user.rol === 'admin') res.redirect('/');
    else if (user.rol === 'cocina') res.redirect('/pedidos');
    else if (user.rol === 'caja') res.redirect('/caja');
    else res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('login', { error: 'Error al iniciar sesión' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
