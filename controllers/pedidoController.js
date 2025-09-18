const pedidoService = require("../services/pedidoService");

const getPedidos = async (req, res) => {
  const pedidos = await pedidoService.getAllPedidos();
  res.json(pedidos);
};

const getPedido = async (req, res) => {
  const id = parseInt(req.params.id);
  const pedido = await pedidoService.getPedidoById(id);

  console.log(pedido);
  pedido
    ? res.json(pedido)
    : res.status(404).json({ message: "Pedido no encontrado" });
};

const addPedido = async (req, res) => {
  const { id, fecha, total, tipo, id_cliente, productos } = req.body;
  const newPedido = await pedidoService.createPedido(
    id,
    fecha,
    total,
    tipo,
    id_cliente,
    productos,
  );
  res.status(201).json(newPedido);
};

const updatePedido = async (req, res) => {
  const id = parseInt(req.params.id);
  const { fecha, total, tipo, id_cliente, productos } = req.body;

  const updatedPedido = await pedidoService.updatePedido(id, {
    fecha, total, tipo, id_cliente, productos,
  });

  updatedPedido
    ? res.json(updatedPedido)
    : res.status(404).json({ message: 'Pedido no encontrado' });
};

const patchPedido = async (req, res) => {
  const id = parseInt(req.params.id);
  const fields = req.body;

  const patchedPedido = await pedidoService.patchPedido(id, fields);

  patchedPedido
    ? res.json(patchedPedido)
    : res.status(404).json({ message: 'Pedido no encontrado' });
};

const deletePedido = async (req, res) => {
  const id = parseInt(req.params.id);
  await pedidoService.deletePedido(id);

  res.json({ message: "Pedido eliminado" });
};
module.exports = { getPedidos, getPedido, addPedido, updatePedido, patchPedido, deletePedido };
