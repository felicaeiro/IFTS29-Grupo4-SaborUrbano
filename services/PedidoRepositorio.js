const Pedido = require('../models/Pedido');

class PedidoRepositorio {
  async getPedidos() {
    return await Pedido.find()
      .populate('id_cliente')
      .populate('productos.producto');
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
      { $set: { estado: 'entregado' } },
      { new: true }
    );
  }

  async getPedidosFinalizados() {
    return await Pedido.find({ estado: 'entregado' }).populate('id_cliente');
  }
}

module.exports = new PedidoRepositorio();
