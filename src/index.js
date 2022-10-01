import 'dotenv/config';
import express from 'express';
import { EngineConfig } from './config';

const app = express();

(async () => {
    (new EngineConfig(app)).init();
})();

export default app;
