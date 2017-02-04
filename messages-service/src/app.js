import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import * as localConfig from './config.json';

import { MessagesSocketController } from './controllers/messagesSocketController.js';

export class ServerApp {

    constructor() {}

    static startServer() {
        let app = express();
        app.use(cors({ origin: '*', credentials: false, methods: 'GET,POST,PUT,DELETE' }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        let server = app.listen(localConfig.port, function() {
            console.log(`server running on port : ${localConfig.port}`);
        });

        MessagesSocketController.init(server);
    }
}

ServerApp.startServer();