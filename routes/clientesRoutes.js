const express = require('express');

const {
    getClients,
    getClient,
    addClient,
    updateClient,
    patchClient,
    removeClient,
} = require('../controllers/clientesController');

const router = express.Router();

router.get('/', getClients);
router.get('/:id', getClient);
router.post('/', addClient);
router.put('/:id', updateClient);
router.patch('/:id', patchClient);
router.delete('/:id', removeClient);

module.exports = router;
