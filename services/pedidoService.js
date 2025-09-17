const { v4 } = require("uuid");
const { Pedido } = require("../models/pedidoModel.js");
const { readData, writeData } = require("../config/db.js");
const FILE = "pedidos.json";

const getAllPedidos = async () => await readData(FILE);

const getPedidoById = async (id) => {
  const pedido = await readData(FILE);
  return pedido.find((p) => p.id === id);
};

const createPedido = async (id, fecha, total, tipo, id_cliente) => {
  const pedido = await readData(FILE);
  const newPedido = new Pedido(v4(), id, fecha, total, tipo, id_cliente);
  pedido.push(newPedido);
  await writeData(FILE, pedido);
  return newPedido;
};

const updatePedido = async (id, { fecha, total, tipo, id_cliente }) => {
  const pedido = await readData(FILE);
  const index = pedido.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updatedPedido = new Pedido(id,fecha, total, tipo, id_cliente);
  pedido[index] = updatedPedido;

  await writeData(FILE, pedido);
  return updatedPedido;
};

const patchPedido = async (id, fields) => {
  const pedido = await readData(FILE);
  const index = pedido.findIndex((p) => p.id === id);
  if (index === -1) return null;

  pedido[index] = { ...pedido[index], ...fields };

  await writeData(FILE, pedido);
  return pedido[index];
};

const deletePedido = async (id) => {
  let pedido = await readData(FILE);
  pedido = pedido.filter((p) => p.id !== id);
  await writeData(FILE, pedido);
};
module.exports = {
  getAllPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  patchPedido,
  deletePedido,
};
