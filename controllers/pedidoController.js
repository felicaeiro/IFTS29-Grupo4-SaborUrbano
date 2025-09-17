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
  const { id, fecha, total, tipo, id_cliente } = req.body;
  const newPedido = await pedidoService.createPedido(
    id,
    fecha,
    total,
    tipo,
    id_cliente
  );
  res.status(201).json(newPedido);
};

const deletePedido = async (req, res) => {
  const id = parseInt(req.params.id);
  await pedidoService.deletePedido(req.params.id);

  res.json({ message: "Pedido eliminado" });
};
module.exports = { getPedidos, getPedido, addPedido, deletePedido };
