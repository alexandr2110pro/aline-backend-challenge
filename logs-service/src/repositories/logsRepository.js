import config from '../../../shared/config.json';
import redis from 'redis';

export class LogsRepository {

    constructor() {
        this.client = redis.createClient(config.redisPort, config.redisServer, {
            no_ready_check: true
        });
        this.client.on('connect', function() {
            console.log('Connected to DB');
        });
    }

    getAll(next) {
        this.client.hgetall(config.logsHash, next);
    }

    store(logItem) {
        try {
            return (this.client.hset(config.logsHash, logItem.id, JSON.stringify(logItem), redis.print));
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }
}