import { SocketController } from './socketController';
import { LogsService } from '../services/logsService';

export class LogsSocketController extends SocketController {

    static init(server) {
        return new LogsSocketController(server);
    }

    constructor(server) {
        super(server, '/logs');
        this.socket = null;

        this.nsp.on('connection', socket => {
            socket.username = this.username;
            this.socket = socket;
            console.log(`IO Client connected ${this.username} (${socket.username}) ${socket.conn.id}`);
            socket.on('disconnect', () => console.log('socket disconnect'));
            socket.on('list', this.list);
        });
    }

    list() {
        LogsService.getAll(
            (error, data) => {
                if (error) {
                    throw error;
                }
                this.emit('list', data);
            });
    }

    create(data) {
        this.nsp.emit('create', data);
    }
}