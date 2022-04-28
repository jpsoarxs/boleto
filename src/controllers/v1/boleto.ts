import express from 'express';
import { CustomError } from './../../utils/errorMessage'

const router = express.Router()

import app from '../../applications/boleto'


router.get('/:boleto', async (req, res, next) => {
	try {
		let boleto = req.params.boleto

		if (!boleto) {
			throw new Error('Boleto não informado')
		}

		boleto = boleto.replace(/( |\.)/g, '');

		const result = await app.verify.boleto(boleto)

		if (result) {
			res.status(200).json({
				barCode: app.data.getBarCode(boleto),
				amount: app.data.getAmount(boleto),
				expirationDate: app.data.getDate(boleto)
			})
		} else {
			next(new CustomError('Opss... não foi possivel validar o boleto', 400, 'Boleto inválido'))
		}
	} catch (err: any) {
		next(new CustomError('Opss... não foi possivel validar o boleto', 400, err))
	};
})

export default router;