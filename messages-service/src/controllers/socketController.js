import config from '../../../shared/config.json';
import { LogsService } from '../services/logsService';

import socketIo from 'socket.io';
import socketioJwt from 'socketio-jwt';

export class SocketController {

    constructor(server, namespace) {
        let io = socketIo(server);
        this.username = '';

        io.set('authorization', socketioJwt.authorize({
            secret: config.jwtSecret,
            handshake: true,
            success: (data, accept) => {
                this.username = data.decoded_token.username;
                if (data.request) {
                    accept();
                } else {
                    accept(null, true);
                }
            }
        }));

        this.nsp = io.of(namespace);
        this.logsService = new LogsService();

    }

    logEvent(eventName, eventObject) {
        this.logsService.publish(eventName, eventObject);
    }
}