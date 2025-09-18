const { Cliente } = require('../models/clienteModel');
const { readData, writeData } = require('../config/db.js');
const FILE = 'clientes.json';

const getAllClients = async () => await readData(FILE);

const getClientById = async (id) => {
    const clients = await readData(FILE);
    return clients.find((p) => p.id === id);
};

const createClient = async (id, nombre, apellido, fecha_nacimiento, dni, domicilio) => {
    const clients = await readData(FILE);
    const newClient = new Cliente(id, nombre, apellido, fecha_nacimiento, dni, domicilio);
    clients.push(newClient);
    await writeData(FILE, clients);
    return newClient;
};

const updateClient = async (id, { nombre, apellido, fecha_nacimiento, dni, domicilio }) => {
    const clients = await readData(FILE);
    const index = clients.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updatedClient = new Cliente(id, nombre, apellido, fecha_nacimiento, dni, domicilio);
    clients[index] = updatedClient;

    await writeData(FILE, clients);
    return updatedClient;
};

const patchClient = async (id, fields) => {
    const clients = await readData(FILE);
    const index = clients.findIndex((p) => p.id === id);
    if (index === -1) return null;

    clients[index] = { ...clients[index], ...fields };

    await writeData(FILE, clients);
    return clients[index];
};

const deleteClient = async (id) => {
    let clients = await readData(FILE);
    clients = clients.filter((p) => p.id !== id);
    await writeData(FILE, clients);
};

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    patchClient,
    deleteClient,
};
