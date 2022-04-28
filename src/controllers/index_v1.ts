import boleto from './v1/boleto';


import express from 'express';
const router = express.Router();

router.use('/boleto', boleto);

export default router