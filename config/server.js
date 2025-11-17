const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser'); // Importar cookie-parser
const { authenticateJWT } = require('../middleware/authMiddleware'); // Importar middleware

// Importar la configuración de passport
require('../config/passport');

const productoRoutes = require('../routes/productoRoutes');
const pedidoRoutes = require('../routes/pedidoRoutes');
const datosRoutes = require('../routes/dataRoutes');
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

app.use(cookieParser()); // Usar cookie-parser

app.use(
  session({
    secret: 'saborurbano_secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());

// ROUTES
app.use('/', authRoutes);
app.use('/datos', datosRoutes); // Ruta pública para la base de datos
// Proteger las rutas de la aplicación con el middleware authenticateJWT
app.use('/productos', authenticateJWT, productoRoutes);
app.use('/pedidos', authenticateJWT, pedidoRoutes);
app.use('/clientes', authenticateJWT, clientesRoutes);
app.use('/informe', authenticateJWT, informeRoutes);
app.use('/usuarios', authenticateJWT, usuarioRoutes);
app.use('/caja', authenticateJWT, cajaRoutes);


app.get('/', (req, res) => {
  // La lógica de redirección ahora puede ser más simple o incluso eliminarse
  // si todas las rutas principales están protegidas.
  // Por ahora, redirigimos a /inicio.
  return res.redirect('/inicio');
});

app.get('/inicio', authenticateJWT, (req, res) => {
  // req.user es establecido por el middleware authenticateJWT
  res.render('index', {
    usuario: req.user.usuario,
    rol: req.user.rol,
  });
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
