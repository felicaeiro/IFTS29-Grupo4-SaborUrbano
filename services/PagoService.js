const Pago = require('../models/Pago');
const Pedido = require('../models/Pedido');

class PagoService {
  async registrarPago(pedidoId, pagoData) {
    const pedido = await Pedido.findById(pedidoId).populate('id_cliente');
    if (!pedido) return null;

    pedido.pago = pagoData;
    pedido.pagado = true;
    await pedido.save();

    return pedido;
  }

  async getPagosCompleto() {
    return Pago.find().populate({
      path: 'id_pedido',
      populate: { path: 'id_cliente' },
    });
  }
}

module.exports = new PagoService();
