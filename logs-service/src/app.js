import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import * as localConfig from './config.json';
import { LogsSocketController } from './controllers/logsSocketController';
import { NotificationsService } from './services/notificationsService';

export class ServerApp {

    static startServer() {

        let app = express();
        app.use(cors({ origin: '*', methods: 'GET,POST,PUT,DELETE' }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        const server = app.listen(localConfig.port, function() {
            console.log(`server running on port : ${localConfig.port}`);
        });

        let logsSocket = LogsSocketController.init(server);
        NotificationsService.init(logsSocket);
    }
}

ServerApp.startServer();