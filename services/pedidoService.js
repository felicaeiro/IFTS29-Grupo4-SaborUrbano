const { v4 } = require("uuid");
const { Pedido } = require("../models/pedidoModel.js");
const { readData, writeData } = require("../config/db.js");
const FILE = "pedidos.json";

const getAllPedidos = async () => await readData(FILE);

const getPedidoById = async (id) => {
  const pedido = await readData(FILE);
  return pedido.find((p) => p.id === id);
};

// const createPedido = async (fecha, total, tipo, id_cliente, productos) => {
//   const pedido = await readData(FILE);
//   const newPedido = new Pedido(v4(), fecha, total, tipo, id_cliente, productos);
//   pedido.push(newPedido);
//   await writeData(FILE, pedido);
//   return newPedido;
// };

const createPedido = async (fecha, total, tipo, id_cliente, productos) => {
  const pedidos = await readData(FILE);

  const ultimoId = pedidos.length > 0 ? Math.max(...pedidos.map(p => p.id)) : 0;
  const nuevoId = ultimoId + 1;

  const newPedido = new Pedido(nuevoId, fecha, total, tipo, id_cliente, productos);
  pedidos.push(newPedido);

  await writeData(FILE, pedidos);
  return newPedido;
};


const updatePedido = async (id, data) => {
  const pedidos = await readData(FILE);
  const index = pedidos.findIndex((p) => p.id === id);
  if (index === -1) return null;
  
  pedidos[index] = { ...pedidos[index], ...data };

  await writeData(FILE, pedidos);
  return pedidos[index];
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
