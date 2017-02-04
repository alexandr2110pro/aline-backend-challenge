import uuid from 'uuid';

export class Message {
    constructor(messageText, username) {
        this.id = uuid.v4();
        this.messageText = messageText;
        this.username = username;
        this.dateCreated = new Date();
        this.liked = false;
        this.likedBy = '';
    }
}