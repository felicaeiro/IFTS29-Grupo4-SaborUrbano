const express = require('express');
const productoRoutes = require('../routes/productoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Sabor Urbano - App funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.use('/productos', productoRoutes);
