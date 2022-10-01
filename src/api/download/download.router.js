import express from 'express';
import { downloadViaPhantom, downloadViaPuppeteer } from './download.controller';

const router = express.Router();

router.get('/phantom', downloadViaPhantom);
router.get('/puppeteer', downloadViaPuppeteer);
/**
 *@access /user
 */
export const downloadRouter = router;
