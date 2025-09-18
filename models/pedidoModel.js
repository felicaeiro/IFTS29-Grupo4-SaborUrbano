class Pedido {
  id;
  fecha;
  total;
  tipo;
  id_cliente;
  productos;

  constructor(id, fecha, total, tipo, id_cliente, productos) {
    this.id = id;
    this.fecha = fecha;
    this.total = total;
    this.tipo = tipo;
    this.id_cliente = id_cliente;
    this.productos = productos;
  }
}
module.exports = { Pedido };
