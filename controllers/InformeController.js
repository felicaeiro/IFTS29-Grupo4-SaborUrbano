const InformeService = require('../services/InformeService');

class InformeController {

    constructor() {
        this.informeService = new InformeService();
        this.obtenerInforme = this.obtenerInforme.bind(this);
    }


    async obtenerInforme(req, res) {
        try {
            const informe = await this.informeService.generarInforme();
            res.status(200).render('informe', informe);
        } catch (error) {
            res.status(500).render('error', { message: 'Error al generar el informe', error: error });
        }
    }
}

module.exports = new InformeController();
