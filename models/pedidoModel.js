class Pedido {
    id;
    fecha;
    total;
    tipo;
    id_cliente;

    constructor(id, fecha, total, tipo, id_cliente){
        this.id = id;
        this.fecha = fecha;
        this.total = total;
        this.tipo = tipo;
        this.id_cliente = id_cliente;
    }
}
module.exports = new Pedido();
