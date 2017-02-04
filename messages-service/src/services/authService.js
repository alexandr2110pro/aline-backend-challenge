import { UNAUTHORIZED } from 'http-status-codes';
import { User } from '../models/user.js';
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

    static validate(request) {
        if (!request || !request.headers || !request.headers.authorization) {
            return false;
        }

        let token = request.headers.authorization.replace('Bearer', '').trim();
        let user = jwt.verify(token, config.jwtSecret);
        request.user = user;
        return true;
    }

    static createToken(user) {
        return jwt.sign(user, config.jwtSecret);
    }
}