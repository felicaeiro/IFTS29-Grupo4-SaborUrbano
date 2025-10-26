
const Producto = require('../models/Producto');

class ProductoRepositorio {
    async getProductos() {
        return await Producto.find({});
    }

    async getProductoById(id) {
        return await Producto.findById(id);
    }

    async createProducto(productoData) {
        const newProducto = new Producto(productoData);
        return await newProducto.save();
    }

    async updateProducto(id, productoData) {
        return await Producto.findByIdAndUpdate(id, productoData, {new: true});
    }

    async deleteProducto(id) {
        return await Producto.findByIdAndDelete(id);
    }
}

module.exports = new ProductoRepositorio();