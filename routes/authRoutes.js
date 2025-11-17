const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { logout } = require('../controllers/AuthController');

router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).render('login', { error: info ? info.message : 'Error de autenticación' });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET || 'your_default_secret', { expiresIn: '1h' });
      
      // En lugar de redirigir, podrías querer enviar el token al cliente
      // y que el cliente lo guarde (por ejemplo, en localStorage)
      // Para mantener la compatibilidad con tu sistema de plantillas, vamos a guardar el token en una cookie.
      res.cookie('jwt', token, { httpOnly: true, secure: false }); // secure: true en producción
      return res.redirect('/inicio');
    });
  })(req, res, next);
});

router.post('/logout', logout);

module.exports = router;
