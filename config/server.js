const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const {
  authenticateJWT,
  authorizeRole,
} = require('../middleware/authMiddleware');

require('../config/passport');

const productoRoutes = require('../routes/productoRoutes');
const pedidoRoutes = require('../routes/pedidoRoutes');
const informeRoutes = require('../routes/InformeRoutes');
const usuarioRoutes = require('../routes/UsuarioRoutes');
const authRoutes = require('../routes/authRoutes');
const cajaRoutes = require('../routes/cajaRoutes');

const clientesRoutes = require('../routes/clientesRoutes');
const methodOverride = require('method-override');

const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static('public'));

app.use(cookieParser());

app.use(
  session({
    secret: 'saborurbano_secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());

// ROUTES
app.use('/', authRoutes);
app.use(
  '/productos',
  authenticateJWT,
  authorizeRole(['admin']),
  productoRoutes
);
app.use(
  '/pedidos',
  authenticateJWT,
  authorizeRole(['admin', 'cocina']),
  pedidoRoutes
);
app.use('/clientes', authenticateJWT, authorizeRole(['admin']), clientesRoutes);
app.use('/informe', authenticateJWT, authorizeRole(['admin']), informeRoutes);
app.use('/usuarios', authenticateJWT, usuarioRoutes);
app.use('/caja', authenticateJWT, authorizeRole(['admin', 'caja']), cajaRoutes);

app.get('/', (req, res) => {
  return res.redirect('/inicio');
});

app.get('/inicio', authenticateJWT, (req, res) => {
  res.render('index', {
    usuario: req.user.usuario,
    rol: req.user.rol,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
