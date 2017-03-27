import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as io from 'socket.io-client';

import { User } from '../user';

@Injectable()
export class NotificationService {

    private name: string;
    socket: SocketIOClient.Socket;
    observable: Observable<any>;

    constructor(name: string, url = 'http://localhost:9002/') {
        this.name = name;
        let socketUrl = url + this.name;

        let currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;
        this.socket = io.connect(socketUrl, {
            query: 'token=' + currentUser.token
        });

        this.socket.on('connect', () => this.connect());
        this.socket.on('disconnect', () => this.disconnect());
        this.socket.on('error', (error: string) => {
            console.log(`ERROR: "${error}" (${socketUrl})`);
        });

        this.observable = Observable.create((observer: any) => {
            this.socket.on('create', (item: any) => observer.next({ action: 'create', item: item }));
            this.socket.on('like', (item: any) => observer.next({ action: 'like', item: item }));
            this.socket.on('list', (item: any) => observer.next({ action: 'list', item: item }));
            return () => this.socket.close();
        });
    }

    get() {
        this.socket.emit('list');
    }

    create(message) {
        this.socket.emit('create', message);
    }

    like(message) {
        this.socket.emit('like', message);
    }

    // Handle connection opening
    private connect() {
        console.log(`Connected to "${this.name}"`);
    }

    // Handle connection closing
    private disconnect() {
        console.log(`Disconnected from "${this.name}"`);
    }
}
