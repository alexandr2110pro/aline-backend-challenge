import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { UsersRouter } from './routes';

import * as localConfig from './config.json';

export class ServerApp {

    constructor() {}

    static startServer() {
        let app = express();
        app.use(cors({ origin: '*', methods: 'GET,POST,PUT,DELETE' }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use('/api', UsersRouter);
        app.listen(localConfig.port, function() {
            console.log(`server running on port : ${localConfig.port}`);
        });
    }
}

ServerApp.startServer();