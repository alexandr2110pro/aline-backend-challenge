import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from '../user';

@Injectable()
export class ApiClientService {

    constructor(private http: Http) { }

    private getHeaders(): Headers {
        let currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;
        let jwt = '';
        if (currentUser && currentUser.token) {
             jwt = 'Bearer ' + currentUser.token;
        }

        // always get fresh headers / JWT
        return new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': jwt
        });
    }

    public post(url: string, data: any): Promise<Response> {
        return this.http.post(url, data, { headers: this.getHeaders() }).toPromise();
    }

    public put(url: string, data: any): Promise<Response> {
        return this.http.put(url, data, { headers: this.getHeaders() }).toPromise();
    }

    public get(url: string): Promise<Response> {
        return this.http.get(url, { headers: this.getHeaders() }).toPromise();
    }
}
