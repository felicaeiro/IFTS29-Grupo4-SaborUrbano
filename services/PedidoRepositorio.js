const Pedido = require('../models/Pedido');

class PedidoRepositorio {
  async getPedidos({ estados = null, pagado = null } = {}) {
    const filtro = {};

    if (estados) filtro.estado = { $in: estados };
    if (pagado !== null) filtro.pagado = pagado;
    return await Pedido.find(filtro)
      .populate('id_cliente')
      .populate('productos.producto')
      .populate('pago')
      .sort({ fecha: -1 });
  }

  async getPedidoById(id) {
    return await Pedido.findById(id)
      .populate('id_cliente')
      .populate('productos.producto');
  }

  async createPedido(pedidoData) {
    const newPedido = new Pedido(pedidoData);
    return await newPedido.save();
  }

  async updatePedido(id, pedidoData) {
    return await Pedido.findByIdAndUpdate(id, pedidoData, { new: true });
  }

  async deletePedido(id) {
    return await Pedido.findByIdAndDelete(id);
  }

  async finalizarPedido(id) {
    return await Pedido.findByIdAndUpdate(
      id,
      { $set: { estado: 'finalizado' } },
      { new: true }
    );
  }

  async getPedidosFinalizados() {
    return await Pedido.find({ estado: 'finalizado' })
      .populate('id_cliente')
      .sort({ fecha: -1 });
  }
}

module.exports = new PedidoRepositorio();
