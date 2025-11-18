const Producto = require('../models/Producto');
const Pedido = require('../models/Pedido');
const Cliente = require('../models/Cliente');

class InformeService{

    async generarInforme() {
        try {

            const [
                topProductosVendidos,
                topClientesRecurrentes,
                topClientesPorGasto
            ] = await Promise.all([
                this.getTopProductosVendidos(3),
                this.getTopClientesRecurrentes(3),
                this.getTopClientesPorGasto(3)
            ]);

            return {
                topProductosVendidos,
                topClientesRecurrentes,
                topClientesPorGasto,
            };
        } catch (error) {
            console.error("Error al generar el informe:", error);
            throw new Error("No se pudo generar el informe.");
        }
    }


    async getTopProductosVendidos(limit = 3) {
        return Pedido.aggregate([

            { $unwind: '$productos' },
            { $group: { _id: '$productos.producto', cantidadVendida: { $sum: '$productos.cantidad' } } },
            { $sort: { cantidadVendida: -1 } },
            { $limit: limit },
            {
                $lookup: {
                    from: 'productos',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'productoInfo'
                }
            },
            { $unwind: '$productoInfo' },
            {
                $project: {
                    _id: 0,
                    productoId: '$_id',
                    nombre: '$productoInfo.nombre',
                    precio: '$productoInfo.precio',
                    cantidadVendida: 1
                }
            }
        ]);
    }

    async getTopClientesRecurrentes(limit = 3) {
        return Pedido.aggregate([
            { $group: { _id: '$id_cliente', totalPedidos: { $sum: 1 } } },
            { $sort: { totalPedidos: -1 } },
            { $limit: limit },
            {
                $lookup: {
                    from: 'clientes',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'clienteInfo'
                }
            },
            { $unwind: '$clienteInfo' },
            {
                $project: {
                    _id: 0,
                    clienteId: '$_id',
                    nombre: '$clienteInfo.nombre',
                    apellido: '$clienteInfo.apellido',
                    totalPedidos: 1
                }
            }
        ]);
    }
    async getTopClientesPorGasto(limit = 3) {
        return Pedido.aggregate([
            { $group: { _id: '$id_cliente', gastoTotal: { $sum: '$total' } } },
            { $sort: { gastoTotal: -1 } },
            { $limit: limit },
            {
                $lookup: {
                    from: 'clientes',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'clienteInfo'
                }
            },
            { $unwind: '$clienteInfo' },
            {
                $project: {
                    _id: 0,
                    clienteId: '$_id',
                    nombre: '$clienteInfo.nombre',
                    apellido: '$clienteInfo.apellido',
                    gastoTotal: 1
                }
            }
        ]);
    }
}

module.exports = InformeService;
