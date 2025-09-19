const express = require('express');
const productoRoutes = require('../routes/productoRoutes');
const pedidoRoutes = require('../routes/pedidoRoutes');
const clientesRoutes = require('../mongo/ClientesRoutes');
const path = require("path");


const { fileURLToPath } = require('url');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('index');
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());

// ROUTES
app.use('/productos', productoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/clientes', clientesRoutes)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
