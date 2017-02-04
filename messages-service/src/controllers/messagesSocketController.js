import { Message } from '../models/message';
import { SocketController } from './socketController';
import { MessagesService } from '../services/messagesService';

export class MessagesSocketController extends SocketController {
    static init(server) {
        return new MessagesSocketController(server);
    }

    constructor(server) {
        super(server, '/messages');
        this.socket = null;

        this.nsp.on('connection', socket => {
            socket.username = this.username;
            this.socket = socket;
            console.log(`IO Client connected ${this.username} (${socket.username}) ${socket.conn.id}`);
            socket.on('disconnect', () => console.log('socket disconnect'));
            socket.on('create', this.create);
            socket.on('like', this.like);
            socket.on('list', this.list);
        });
    }

    create(message) {
        message = new Message(message.messageText, this.username);
        message = MessagesService.store(message);
        this.nsp.emit('create', message);
    }

    like(message) {
        message.likedBy = this.username;
        MessagesService.like(message, (error, data) => {
            if (error) {
                throw error;
            }
            this.nsp.emit('like', data);
        });
        console.log(`like message ${message.id} -> ${this.username}`);
    }

    list() {
        MessagesService.getAll(
            (error, data) => {
                if (error) {
                    throw error;
                }
                this.emit('list', data);
            });
    }
}