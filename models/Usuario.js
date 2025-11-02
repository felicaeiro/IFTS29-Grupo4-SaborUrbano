const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UsuarioSchema = new mongoose.Schema({

    usuario: {
        type: String,
        required: true,
        unique: true,
    },
    clave: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        enum: ["admin", "cocina", "caja"],
        default: "admin",
    },
});

UsuarioSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.clave;
    },
});

UsuarioSchema.plugin(uniqueValidator, {message: "El {PATH} '{VALUE}' ya está registrado."});

module.exports = mongoose.model("Usuario", UsuarioSchema);
