import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, MessagerieService } from 'services/messagerie.service';

@Component({
    selector: 'app-message-displayer',
    template: `
    <div class="messages">
        <div class="message" *ngFor="let message of messages$ | async">
           {{message.content}}
        </div>
    </div>
    `,
     styles: [`
         .messages {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 9999;
        }
        
        .message {
            margin: 1em 0;
            padding: 2em;
            border-radius: 15px 0 0 15px;
            background: rgb(132 170 217 / 35%);
        }
     `]
})

export class MessageDisplayerComponent implements OnInit {

    messages$: Observable<Message[]>;

    constructor(private messagerieService: MessagerieService) { }

    ngOnInit() { 
        this.messages$ = this.messagerieService.messages;
    }
}