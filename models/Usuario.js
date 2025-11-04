const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

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
    enum: ['admin', 'cocina', 'caja'],
    default: 'admin',
  },
});

UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('clave')) return next();
  const salt = await bcrypt.genSalt(10);
  this.clave = await bcrypt.hash(this.clave, salt);
  next();
});

UsuarioSchema.plugin(uniqueValidator, {
  message: "El {PATH} '{VALUE}' ya está registrado.",
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
