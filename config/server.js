const express = require('express');
const productoRoutes = require('../routes/productoRoutes');
const pedidoRoutes = require('../routes/pedidoRoutes');
const clientesRoutes = require('../routes/clientesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Sabor Urbano - App funcionando 🚀');
});

app.use(express.json());

// ROUTES
app.use('/productos', productoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/clientes', clientesRoutes)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
