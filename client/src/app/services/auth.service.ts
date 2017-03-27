import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiClientService } from './api-client.service';

import { User } from '../user';

@Injectable()
export class AuthService {
    private static readonly userKey = 'currentUser';

    static currentUser(): User {
        let currentUser = JSON.parse(localStorage.getItem(AuthService.userKey)) as User;
        return currentUser;
    }

    constructor(private apiClient: ApiClientService) { }

    login(username: string) {
        let data = { username: username };

        return this.apiClient.post('http://localhost:9001/api/users', data)
            .then((resp: Response) => {
                // login successful if there's a jwt token in the response
                let response = resp.json();
                if (response && response.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(AuthService.userKey, JSON.stringify(response));
                }
            });

    }

    logout() {
        // remove user from local storage
        localStorage.removeItem(AuthService.userKey);
    }

}
