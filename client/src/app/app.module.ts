import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { LogsComponent } from './components/logs/logs.component';

import { AppRoutingModule } from './app.routing';

import { ApiClientService } from './services/api-client.service';
import { AuthService } from './services/auth.service';
import { MessagesService } from './services/messages.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ChatComponent,
        LogsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [AuthService, ApiClientService, MessagesService],
    bootstrap: [AppComponent]
})
export class AppModule { }
