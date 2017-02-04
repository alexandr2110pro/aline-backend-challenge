import config from '../../../shared/config.json';
import redis from 'redis';

export class LogsService {

    constructor() {
        this.client = redis.createClient(config.redisPort, config.redisServer, {
            no_ready_check: true
        });
        this.client.on('connect', function() {
            console.log('Connected to Redis as publisher');
        });
    }

    publish(eventName, eventText) {
        this.client.publish('chat', eventText);
    }
}