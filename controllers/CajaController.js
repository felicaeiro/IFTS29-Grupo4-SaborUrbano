const PedidoRepositorio = require('../services/PedidoRepositorio');
const PagoService = require('../services/PagoService');

const CajaController = {
  async mostrarVistaCaja(req, res) {
    try {
      const pedidos = await PedidoRepositorio.getPedidos({ pagado: false });
      const historial = await PedidoRepositorio.getPedidos({ pagado: true });

      res.render('CajaViews/caja', {
        usuario: req.user.usuario,
        rol: req.user.rol,
        pedidos,
        historial,
      });
    } catch (error) {
      console.error('Error al cargar vista de caja:', error);
      res.status(500).send('Error al cargar módulo de caja.');
    }
  },

  async registrarPago(req, res) {
    try {
      const pedidoId = req.params.id;
      const { medio, tipoComprobante } = req.body;

      const pagoData = {
        fecha: new Date(),
        monto: null,
        medio,
        tipoComprobante,
        nroComprobante: `C${Math.floor(Math.random() * 1000000)}`,
      };

      const pedidoActualizado = await PagoService.registrarPago(
        pedidoId,
        pagoData
      );
      if (!pedidoActualizado)
        return res.status(404).send('Pedido no encontrado.');

      pedidoActualizado.pago.monto = pedidoActualizado.total;
      await pedidoActualizado.save();
      console.log(pedidoActualizado);

      res.render('CajaViews/confirmacionPago', {
        usuario: req.user.usuario,
        rol: req.user.rol,
        pedido: pedidoActualizado,
        mensaje: `Pago registrado correctamente.`,
      });
    } catch (error) {
      console.error('Error al registrar pago:', error);
      res.status(500).send('Error al registrar pago.');
    }
  },

  async emitirFactura(req, res) {
    try {
      const pedido = await PedidoRepositorio.getPedidoById(req.params.id);

      if (!pedido) return res.status(404).send('Pedido no encontrado.');

      if (!pedido.pago) {
        return res
          .status(400)
          .send('Este pedido aún no tiene un pago registrado.');
      }
      res.render('CajaViews/factura', { pedido });
    } catch (error) {
      res.status(500).send('Error al generar factura.');
    }
  },
};

module.exports = CajaController;
