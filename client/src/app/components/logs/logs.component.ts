import { Component, OnInit } from '@angular/core';

import { User } from '../../user';
import { LogItem } from '../../logItem';

import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
    user: User;
    logItems: Array<LogItem>;
    private notificationService: NotificationService;

    constructor() {
        this.user = AuthService.currentUser();
        this.logItems = new Array<LogItem>();
        this.notificationService = new NotificationService('logs', 'http://localhost:9004/');
        this.notificationService.observable.subscribe(
            (socketItem: any) => {

                switch (socketItem.action) {
                    case 'list':
                        this.list(socketItem.item as LogItem[]);
                        break;

                    case 'create':
                        this.logItems.push(socketItem.item as LogItem);
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

    list(items: LogItem[]) {
        if (items) {
            this.logItems = items.sort((message1: LogItem, message2: LogItem) => {
                return message1.dateCreated > message2.dateCreated ? 1 : -1;
            });
        } else {
            // TODO: show error
        }
    }
}
