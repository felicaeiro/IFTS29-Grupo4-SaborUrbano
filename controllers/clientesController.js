const ClienteService = require('../services/ClienteService');

const getClients = async (req, res) => {
    const clients = await ClienteService.getAllClients();
    res.json(clients);
};

const getClient = async (req, res) => {
    const id = parseInt(req.params.id);
    const client = await ClienteService.getClientById(id);
    console.log(client);
    client
        ? res.json(client)
        : res.status(404).json({ message: 'cliente no encontrado' });
};

const addClient = async (req, res) => {
    console.log(req.body);
    const { id, nombre, apellido, fecha_nacimiento, dni, domicilio } = req.body;

    const newClient = await ClienteService.createClient(
        id, nombre, apellido, fecha_nacimiento, dni, domicilio
    );
    res.status(201).json(newClient);
};

const updateClient = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, apellido, fecha_nacimiento, dni, domicilio} = req.body;

    const updatedClient = await ClienteService.updateClient(id, {
         nombre, apellido, fecha_nacimiento, dni, domicilio
    });

    updatedClient
        ? res.json(updatedClient)
        : res.status(404).json({ message: 'Cliente no encontrado' });
};

const patchClient = async (req, res) => {
    const id = parseInt(req.params.id);
    const fields = req.body;

    const patchedClient = await ClienteService.patchClient(id, fields);

    patchedClient
        ? res.json(patchedClient)
        : res.status(404).json({ message: 'Cliente no encontrado' });
};

const removeClient = async (req, res) => {
    const id = parseInt(req.params.id);

    await ClienteService.deleteClient(id);
    res.json({ message: 'Cliente eliminado' });
};

module.exports = {
    getClients,
    getClient,
    addClient,
    patchClient,
    updateClient,
    removeClient,
};
