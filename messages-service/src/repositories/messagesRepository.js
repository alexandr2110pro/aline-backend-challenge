import config from '../../../shared/config.json';
import redis from 'redis';

export class MessagesRepository {

    constructor() {
        this.client = redis.createClient(config.redisPort, config.redisServer, {
            no_ready_check: true
        });
        this.client.on('connect', function() {
            console.log('Connected to DB');
        });
    }

    store(message) {
        try {
            return (this.client.hset(config.messagesHash, message.id, JSON.stringify(message), redis.print));
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }

    get(id, next) {
        this.client.hget(config.messagesHash, id, next);
    }

    getAll(next) {
        this.client.hgetall(config.messagesHash, next);
    }

    update(message) {
        try {
            return (this.client.hset(config.messagesHash, message.id, JSON.stringify(message), redis.print));
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }
}