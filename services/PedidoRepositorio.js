const Pedido = require('../models/Pedido');

class PedidoRepositorio {
    async getPedidos() {
        return await Pedido.find({});
    }

    async getPedidoById(id) {
        return await Pedido.findById(id);
    }

    async createPedido(pedidoData) {
        const newPedido = new Pedido(pedidoData);
        return await newPedido.save();
    }

    async updatePedido(id, pedidoData) {
        return await Pedido.findByIdAndUpdate(id, pedidoData, {new: true});
    }

    async deletePedido(id) {
        return await Pedido.findByIdAndDelete(id);
    }
}

module.exports = new PedidoRepositorio();