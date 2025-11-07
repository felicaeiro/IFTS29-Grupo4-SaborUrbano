const Pedido = require('../models/Pedido');
const Pago = require('../models/Pago');

const CajaController = {
  async mostrarVistaCaja(req, res) {
    if (!req.session.usuario || req.session.rol !== 'caja') {
      return res.redirect('/login');
    }

    try {
      const pedidos = await Pedido.find({ pagado: false })
        .populate('id_cliente')
        .populate('pago');

      res.render('caja', {
        usuario: req.session.usuario,
        rol: req.session.rol,
        pedidos,
        historial: [],
      });
    } catch (error) {
      console.error('Error al cargar vista de caja:', error);
      res.status(500).send('Error al cargar módulo de caja.');
    }
  },

  async verPedidosPendientes(req, res) {
    try {
      const pedidos = await Pedido.find({ estado: 'pendiente' })
        .populate('id_cliente')
        .populate('pago');
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async registrarPago(req, res) {
    try {
      const pedidoId = req.params.id;
      const { medio, tipoComprobante } = req.body;

      const pedido = await Pedido.findById(pedidoId).populate('id_cliente');
      if (!pedido) return res.status(404).send('Pedido no encontrado.');

      pedido.pago = {
        fecha: pedido.fecha,
        monto: pedido.total,
        medio,
        tipoComprobante,
        nroComprobante: `C${Math.floor(Math.random() * 1000000)}`,
      };
      pedido.pagado = true;
      await pedido.save();

      res.render('confirmacionPago', {
        usuario: req.session.usuario,
        rol: req.session.rol,
        pedido,
        mensaje: `Pago registrado correctamente.`,
      });
    } catch (error) {
      console.error('Error al registrar pago:', error);
      res.status(500).send('Error al registrar pago.');
    }
  },

  async emitirFactura(req, res) {
    try {
      const pedido = await Pedido.findById(req.params.id)
        .populate('id_cliente')
        .populate('productos.producto');
      if (!pedido) return res.status(404).send('Pedido no encontrado.');

      if (!pedido.pago) {
        return res
          .status(400)
          .send('Este pedido aún no tiene un pago registrado.');
      }
      res.render('factura', { pedido });
    } catch (error) {
      res.status(500).send('Error al generar factura.');
    }
  },

  async verHistorial(req, res) {
    try {
      const pagos = await Pago.find().populate({
        path: 'id_pedido',
        populate: { path: 'id_cliente' },
      });

      res.render('caja', {
        usuario: req.session.usuario,
        rol: req.session.rol,
        pedidos: [],
        historial: pagos,
      });
    } catch (error) {
      res.status(500).send('Error al cargar historial.');
    }
  },
};

module.exports = CajaController;
