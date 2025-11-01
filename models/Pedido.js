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
    estado: {
        type: Boolean,
        default: false,
    },
    id_cliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    productos: [
            {
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Producto',
                required: true
            },
            cantidad: {
                type: Number,
                required: true,
                default: 0
            }
        }
    ],
});

module.exports = mongoose.model('Pedido', PedidoSchema);