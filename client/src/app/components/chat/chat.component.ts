import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../../user';
import { Message } from '../../message';

import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    user: User;
    message: Message;
    messages: Array<Message>;
    private notificationService: NotificationService;

    constructor() {
        this.user = AuthService.currentUser();
        this.message = new Message();
        this.messages = new Array<Message>();

        this.notificationService = new NotificationService('messages');
        this.notificationService.observable.subscribe(
            (socketItem: any) => {

                switch (socketItem.action) {
                    case 'list':
                        this.list(socketItem.item as Message[]);
                        break;

                    case 'create':
                        this.messages.push(socketItem.item as Message);
                        break;

                    case 'like':
                        let idx = this.messages.findIndex(m => {
                            return m.id === socketItem.item.id;
                        });
                        this.messages[idx] = (socketItem.item as Message);
                        break;

                    default:
                        break;
                }

                console.log('received: ', socketItem);
            },
            error => console.log(error)
        );
    }

    ngOnInit() {
        this.notificationService.get();
    }

    list(messages: Message[]) {
        if (messages) {
            this.messages = messages.sort((message1: Message, message2: Message) => {
                return message1.dateCreated > message2.dateCreated ? 1 : -1;
            });
        } else {
            // TODO: show error
        }
    }

    submitMessage(e: Event) {
        this.notificationService.create(this.message);
        this.message = new Message();
        e.preventDefault();
    }

    like(message: Message) {
        this.notificationService.like(message);
    }
}
