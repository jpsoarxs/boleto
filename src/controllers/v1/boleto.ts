import express from 'express';
import { CustomError } from './../../utils/errorMessage'

const router = express.Router()

import app from '../../applications/boleto'

router.get('/:boleto', async (req, res, next) => {
	try {
		let boleto = req.params.boleto

		boleto = boleto.replace(/( |\.|-)/g, '');

		let result = undefined

		if (boleto.length === 47) {
			result = await app.verify.boleto(boleto)
		} else if (boleto.length === 48) {
			result = await app.verify.convenio(boleto)
		}

		const isConvenio = boleto.length === 48

		if (result) {
			res.status(200).json({
				barCode: isConvenio ? boleto : app.data.getBarCode(boleto),
				amount: app.data.getAmount(boleto, isConvenio),
				expirationDate: app.data.getDate(boleto, isConvenio)
			})
		} else {
			next(new CustomError('Opss... não foi possivel validar o boleto', 400, 'Boleto inválido'))
		}
	} catch (err: any) {
		next(new CustomError('Opss... não foi possivel validar o boleto', 400, err.message))
	};
})

export default router;