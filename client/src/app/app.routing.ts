import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { LogsComponent } from './components/logs/logs.component';

// import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }, {
        path: 'chat',
        component: ChatComponent,
        canActivate: [AuthGuardService],
        canLoad:[]

    }, {
        path: 'logs',
        component: LogsComponent,
        canActivate: [AuthGuardService]
    },

    // all others redirect to chat screen
    { path: '**', redirectTo: 'chat' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: [AuthGuardService]
})
export class AppRoutingModule { }
