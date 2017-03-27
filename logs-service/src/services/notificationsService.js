import config from '../../../shared/config.json';
import redisClient from 'redis';
import { LogsService } from './logsService';
import { LogItem } from '../models/logItem';

export class NotificationsService {
    static init(logsSocket) {
        return new NotificationsService(logsSocket);
    }

    constructor(logsSocket) {

        this.client = redisClient.createClient(config.redisPort, config.redisServer);

        this.client.on('connect', () => {
            console.log('Connected to Redis sas subscriber');
        });

        this.client.on('message', (channel, message) => {
            console.log(`Message '${message}' on channel '${channel}' arrived!`);
            let logItem = new LogItem(message);
            LogsService.store(logItem);
            logsSocket.create(logItem);
        });

        this.client.subscribe(config.redisChannel);
    }
}