import { AuthService } from '../services/authService';
import { LogsService } from '../services/logsService';
import { UNAUTHORIZED, getStatusText } from 'http-status-codes';

export class UsersController {
    authenticate(req, resp) {

        let response = AuthService.authenticate(req.body);

        if (!response || response === UNAUTHORIZED) {
            return resp.status(UNAUTHORIZED).json({ message: getStatusText(UNAUTHORIZED) });
        }

        // create jwt
        response.token = AuthService.createToken(response);

        let logsService = new LogsService();

        const logDate = new Date();
        let message = `user ${response.username} has logged-in ${logDate}`;
        logsService.publish(message);
        // return response
        return resp.json(response);
    }
}