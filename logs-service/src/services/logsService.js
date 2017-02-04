import { LogsRepository } from '../repositories/logsRepository';

export class LogsService {

    static store(logItem) {
        let repo = new LogsRepository();
        repo.store(logItem);
        return logItem;
    }

    static getAll(next) {
        let repo = new LogsRepository();
        repo.getAll((error, data) => {
            if (error) {
                throw error;
            }
            var items = [];
            for (let i in data) {
                items.push(JSON.parse(data[i]));
            }

            next(null, items);
        });
    }
}