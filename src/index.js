import 'dotenv/config';
import express from 'express';
import { AppRunner } from './config';

const app = express();

(async () => {
    const appRunner = new AppRunner(app);

    await appRunner.run();
})();

export default app;
