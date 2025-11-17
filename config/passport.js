const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

// Estrategia Local para login con usuario y contraseña
passport.use(new LocalStrategy({
  usernameField: 'usuario',
  passwordField: 'clave'
}, async (usuario, clave, done) => {
  try {
    const user = await Usuario.findOne({ usuario });
    if (!user) {
      return done(null, false, { message: 'Usuario no encontrado.' });
    }

    const isMatch = await bcrypt.compare(clave, user.clave);
    if (!isMatch) {
      return done(null, false, { message: 'Contraseña incorrecta.' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Opciones para la estrategia JWT
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your_default_secret' // Deberías usar una variable de entorno
};

// Estrategia JWT para proteger rutas
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await Usuario.findById(jwt_payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;
