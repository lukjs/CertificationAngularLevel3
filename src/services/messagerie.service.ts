import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServicesModule } from 'services/services.module';

export interface Message {
    id?: number;
    content: string;
    duration?: number;
}

@Injectable({providedIn: ServicesModule})
export class MessagerieService {

    private _indexCount = 0;
    private _messages = new BehaviorSubject<Message[]>([]);

    private get messagesValue() {
        return this._messages.value;
    }

    private get nextIndex() {
        this._indexCount += 1;
        return this._indexCount;
    }

    get messages() {
        return this._messages.asObservable();
    }

    constructor() {}

    addMessage(message: Message) {
        message.id = this.nextIndex;
        setTimeout(() => this.removeMessage(message), message.duration ?? 3000);
        this._messages.next([...this.messagesValue, message]);
    }

    removeMessage(message: Message) {
        this._messages.next(this.messagesValue.filter(m => m.id !== message.id));
    }
    
}