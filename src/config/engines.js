// @ts-check
import * as express from 'express';
import methodOverride from 'method-override';
import cors from 'cors';
import api from '../api';
import { initBrowser } from '../api/download/download-service.config';

export class AppRunner {
    /**
     * @param {import("express-serve-static-core").Express} app
     */
    constructor(app) {
        this.app = app;
    }

    /**
     * Initialize engines
     */
    async run() {
        /**
         * Setup basic express
         */
        await initBrowser();

        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(methodOverride('X-HTTP-Method-Override'));
        this.app.use('/api', api);
    }
}
