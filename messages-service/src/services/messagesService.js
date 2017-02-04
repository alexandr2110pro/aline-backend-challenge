import { MessagesRepository } from '../repositories/messagesRepository.js';
import { LogsService } from '../services/logsService';

export class MessagesService {
    static store(message) {
        let repo = new MessagesRepository();
        repo.store(message);

        let logsService = new LogsService();
        const logTime = new Date();
        let logMessage = `user ${message.username} has created a message ${logTime}`;
        logsService.publish('chat-message', logMessage);
        return message;
    }

    static getAll(next) {
        let repo = new MessagesRepository();
        repo.getAll((error, data) => {
            if (error) {
                throw error;
            }
            var items = [];
            for (let i in data) {
                items.push(JSON.parse(data[i]));
            }

            next(null, items);
        });
    }

    static like(message, next) {
        let repo = new MessagesRepository();
        repo.get(message.id, (error, data) => {
            if (error) {
                throw error;
            }

            let item = JSON.parse(data);
            item.liked = message.liked;
            item.likedBy = message.likedBy;

            repo.store(item);

            const logTime = new Date();
            let logMessage = '';

            if (item.liked) {
                logMessage = `user ${message.likedBy} has liked the message of user ${message.username} ${logTime}`;
            } else {
                logMessage = `user ${message.likedBy} has disliked the message of user ${message.username} ${logTime}`;
            }

            let logsService = new LogsService();
            logsService.publish('chat-message', logMessage);
            next(null, item);
        });
    }
}