const InformeService = require('../services/InformeService');

class InformeController {

    constructor() {
        this.informeService = new InformeService();
        this.obtenerInforme = this.obtenerInforme.bind(this);
    }


    async obtenerInforme(req, res) {
        try {
            const informe = await this.informeService.generarInforme();
            res.status(200).json({
                success: true,
                data: informe
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al generar el informe.', error: error.message });
        }
    }
}

module.exports = new InformeController();
