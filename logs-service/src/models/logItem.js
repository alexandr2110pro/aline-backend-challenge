import uuid from 'uuid';

export class LogItem {
    constructor(message) {
        this.id = uuid.v4();
        this.dateCreated = new Date();
        this.messageText = message;
    }
}