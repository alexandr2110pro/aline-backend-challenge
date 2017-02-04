import config from '../../../shared/config.json';
import redis from 'redis';

export class NotificationsController {

    constructor() {}

    subscribe(req, resp) {
        let client = redis.createClient(config.redisPort, config.redisServer, {
            no_ready_check: true
        });

        client.on('connect', function() {
            console.log('Connected to Redis');
        });

        client.subscribe(req.params.channel);
    }
}