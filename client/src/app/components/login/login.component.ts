import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { User } from '../../user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loading: boolean = false;
    user: User;
    error: string;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        this.user = new User();
    }

    ngOnInit() {
        this.authService.logout();
    }

    login() {
        this.loading = true;
        this.error = '';
        this.authService.login(this.user.username).then(
            data => {
                this.router.navigate(['chat']);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
    }
}
