import { AuthService } from '../services/authService';
import { MessagesService } from '../services/messagesService';
import { LogsService } from '../services/logsService';

import { Message } from '../models/message';

import { UNAUTHORIZED, getStatusText } from 'http-status-codes';

export class MessagesController {
    store(req, resp) {
        let response = AuthService.validate(req);
        if (!response) {
            return resp.status(UNAUTHORIZED).json({ message: getStatusText(UNAUTHORIZED) });
        }

        let username = req.user.username;

        let message = new Message(req.body.messageText, username);
        message = MessagesService.store(message);

        let logs = new LogsService();
        logs.publish('new message', message);

        // return response
        return resp.json(message);
    }

    like(req, resp) {
        MessagesService.get(req.params.id, (error, data) => {
            if (error) {
                throw error;
            }
            return resp.json(data);
        });
    }

    getAll(req, resp) {
        MessagesService.getAll(
            (error, data) => {
                if (error) {
                    throw error;
                }
                return resp.json(data);
            });
    }
}