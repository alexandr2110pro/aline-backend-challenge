import { Router } from 'express';
import { MessagesController } from './controllers/messagesController.js';
import { NotificationsController } from './controllers/notificationsController.js';

const messagesCtrl = new MessagesController();
export const MessagesRouter = Router();

const notificationsCtrl = new NotificationsController();

// MessagesRouter.route('/messages')
//     .get(messagesCtrl.getAll)
//     .post(messagesCtrl.store);

// MessagesRouter.route('/messages/:id')
//     .get(messagesCtrl.get)
//     .put(messagesCtrl.like);

// MessagesRouter.route('/subscribe/:channel')
//     .post(notificationsCtrl.subscribe);