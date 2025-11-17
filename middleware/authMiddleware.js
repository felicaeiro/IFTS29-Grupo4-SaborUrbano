const passport = require('passport');

// Middleware para verificar el JWT y autenticar al usuario
const authenticateJWT = (req, res, next) => {
  // Extraer el token de la cookie
  if (req.cookies && req.cookies.jwt) {
    req.headers.authorization = `Bearer ${req.cookies.jwt}`;
  }

  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Si no hay usuario, redirigir a la página de login
      return res.redirect('/login');
    }
    req.user = user;
    next();
  })(req, res, next);
};

// Middleware para verificar el rol del usuario
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.rol)) {
      // Si el usuario no tiene el rol adecuado, puedes redirigirlo o mostrar un error
      return res.status(403).send('Acceso denegado. No tienes permiso para acceder a esta página.');
    }
    next();
  };
};

module.exports = {
  authenticateJWT,
  authorizeRole,
};
