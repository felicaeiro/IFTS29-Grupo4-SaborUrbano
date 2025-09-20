const pedidoService = require("../services/pedidoService");
const productoService = require("../services/productoService"); 

const productos = require("../public/data-base/productos.json")

const getPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoService.getAllPedidos();
    const productoConNombre = pedidos.map((pedido) => {
      const nombres = Array.isArray(pedido.productos)
        ? pedido.productos.map((pid) => {
            const producto = productos.find((p) => parseInt(p.id) === parseInt(pid));
            return producto ? producto.nombre : `Producto ${pid}`;
          })
        : [];

      return { ...pedido, productos: nombres };
    });

    res.render("pedidos", { pedidos: productoConNombre });

  } catch (error) {
    res.status(500).send("Error al cargar pedidos");
  }
};



const getPedido = async (req, res) => {
  const id = parseInt(req.params.id);
  const pedido = await pedidoService.getPedidoById(id);

  pedido
    ? res.json(pedido)
    : res.status(404).json({ message: "Pedido no encontrado" });
};



const addPedido = async (req, res) => {
  let { fecha, total, tipo, id_cliente, productos } = req.body;

  if (!Array.isArray(productos)) {
    productos = productos ? [productos] : [];
  }

  productos = productos.map(p => parseInt(p));

  const newPedido = await pedidoService.createPedido(
    fecha,
    total,
    tipo,
    id_cliente,
    productos
  );
  // const todosProductos = await productoService.getAllProducts();
  res.redirect("/pedidos");
  // res.render("nuevoPedido", { pedido: newPedido, productos: todosProductos });
};



const updatePedido = async (req, res) => {
  const id = parseInt(req.params.id);
  let { fecha, total, tipo, id_cliente, productos } = req.body;

  if (!Array.isArray(productos)) {
    productos = productos ? [productos] : [];
  }
  productos = productos.map(p => parseInt(p));

  const updatedPedido = await pedidoService.updatePedido(id, {
    fecha,
    total,
    tipo,
    id_cliente,
    productos,
  });

  if (updatedPedido) {
    res.redirect("/pedidos");
  } else {
    res.status(404).json({ message: "Pedido no encontrado" });
  }
};



const patchPedido = async (req, res) => {
  const id = parseInt(req.params.id);
  const fields = req.body;

  const patchedPedido = await pedidoService.patchPedido(id, fields);

  patchedPedido
    ? res.json(patchedPedido)
    : res.status(404).json({ message: "Pedido no encontrado" });
};



const deletePedido = async (req, res) => {
  const id = parseInt(req.params.id);
  await pedidoService.deletePedido(id);

  res.redirect("/pedidos");
};


module.exports = {
  getPedidos,
  getPedido,
  addPedido,
  updatePedido,
  patchPedido,
  deletePedido,
};
