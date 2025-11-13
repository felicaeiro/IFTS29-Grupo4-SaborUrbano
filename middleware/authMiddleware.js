function requireLogin(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect("/login");
  }
  next();
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.session.usuario || req.session.usuario.rol !== role) {
      return res.status(403).send("Acceso denegado");
    }
    next();
  };
}

module.exports = { requireLogin, requireRole };
