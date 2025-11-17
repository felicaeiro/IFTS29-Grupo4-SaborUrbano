const passport = require('passport');

const authenticateJWT = (req, res, next) => {
  if (req.cookies && req.cookies.jwt) {
    req.headers.authorization = `Bearer ${req.cookies.jwt}`;
  }

  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.user = user;
    next();
  })(req, res, next);
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.rol)) {
      return res.status(403).send('Acceso denegado. No tienes permiso para acceder a esta página.');
    }
    next();
  };
};

module.exports = {
  authenticateJWT,
  authorizeRole,
};
