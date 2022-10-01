// @ts-check
import * as express from 'express';
import methodOverride from 'method-override';
import cors from 'cors';
import api from '../api';
import { authenDatabaseConnection } from '../database';
// import {authRouter} from '../api/auth/router';

export class EngineConfig {
    /**
     * @param {import("express-serve-static-core").Express} app
     */
    constructor(app) {
        this.app = app;
    }

    /**
     * Initialize engines
     */
    init() {
        /**
         * Setup basic express
         */
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        /**
         * Setup method override method to use PUT, PATCH,...
         */
        this.app.use(methodOverride('X-HTTP-Method-Override'));
        // this.app.use('/', authRouter);
        this.app.use(
            methodOverride(req => {
                if (req.body && typeof req.body === 'object' && '_method' in req.body) {
                    const method = req.body._method;
                    delete req.body._method;

                    return method;
                }

                return undefined;
            }),
        );
        this.connectDatabase();

        this.app.use('/api', api);
    }

    connectDatabase() {
        authenDatabaseConnection();
    }
}
