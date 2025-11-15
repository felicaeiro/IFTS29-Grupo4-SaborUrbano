const mongoose = require('mongoose');

const PagoSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  monto: {
    type: Number,
  },
  medio: {
    type: String,
    enum: ['Efectivo', 'Tarjeta', 'Transferencia'],
    required: true,
  },
  tipoComprobante: {
    type: String,
    enum: ['Ticket', 'Factura'],
    required: true,
  },
  nroComprobante: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Pago', PagoSchema);
