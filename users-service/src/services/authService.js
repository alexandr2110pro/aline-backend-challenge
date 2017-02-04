import { UNAUTHORIZED } from 'http-status-codes';
import { User } from '../models/user';
import * as jwt from 'jsonwebtoken';
import config from '../../../shared/config.json';

export class AuthService {
    static authenticate(request) {
        if (!request || !request.username) {
            return UNAUTHORIZED;
        }
        // check user's credentials
        let user = new User(request.username);
        return user;
    }

    static createToken(user) {
        return jwt.sign(user, config.jwtSecret);
    }
}