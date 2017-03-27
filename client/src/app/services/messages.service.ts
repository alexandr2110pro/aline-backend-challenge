import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { AuthService } from './auth.service';
import { Message } from '../message';

@Injectable()
export class MessagesService {

    constructor(private apiClient: ApiClientService) { }

    submit(message: Message) {
        return this.apiClient.post('http://localhost:9002/api/messages', message);
    }

    like(message: Message) {
        return this.apiClient.put(`http://localhost:9002/api/messages/${message.id}`, message);
    }

    get(id: string) {
        return this.apiClient.get(`http://localhost:9002/api/messages/${id}`);
    }

    getAll() {
        return this.apiClient.get('http://localhost:9002/api/messages');
    }
}
