
const Cliente = require('../models/Cliente');

class ClienteRepositorio {
    async getClientes() {
        return await Cliente.find({});
    }

    async getClienteById(id) {
        return await Cliente.findById(id);
    }

    async createCliente(clienteData) {
        const newCliente = new Cliente(clienteData);
        return await newCliente.save();
    }

    async updateCliente(id, clienteData) {
        return await Cliente.findByIdAndUpdate(id, clienteData, {new: true});
    }

    async deleteCliente(id) {
        return await Cliente.findByIdAndDelete(id);
    }
}

module.exports = new ClienteRepositorio();