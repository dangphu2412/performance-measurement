import express from 'express';
import { downloadRouter } from './download/download.router';

const router = express.Router();

router.use('/v1/downloads', downloadRouter);

export default router;
