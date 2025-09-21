const mongoose = require('mongoose');

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
        required: true,
    },
    id_cliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    productos:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Producto',
        required: true
    }
});

module.exports = mongoose.model('Pedido', PedidoSchema);