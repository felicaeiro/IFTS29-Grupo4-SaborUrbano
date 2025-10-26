const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    fecha_nacimiento: {
        type: Date,
        required: true,
    },
    dni:{
        type: Number,
        required: true
    },
    domicilio:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cliente', ClienteSchema);