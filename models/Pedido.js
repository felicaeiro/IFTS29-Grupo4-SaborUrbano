const mongoose = require('mongoose');
const Pago = require('./Pago');

const PedidoSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  tipo: {
    type: String,
    enum:['Presencial', 'Online'],
    required: true,
  },
  estado: {
    type: String,
    enum: ['pendiente', 'preparando', 'finalizado'],
    default: 'pendiente',
  },
  id_cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  pago: {
    type: Pago.schema,
    required: false,
  },
  pagado: {
    type: Boolean,
    require: true,
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true,
      },
      nombre: {
        type: String,
        required: true,
      },
      precio: {
        type: Number,
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model('Pedido', PedidoSchema);
