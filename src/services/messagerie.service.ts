import { Injectable } from "@angular/core";

import {
  BehaviorSubject,
  timer,
} from "rxjs";

import { ServicesModule } from "./services.module";

export interface Message {
  id?: number;
  content: string;
  delay?: number;
  duration?: number;
  color?: string;
  backgroundColor?: string;
}

@Injectable({ providedIn: ServicesModule })
export class MessagerieService {
  private _indexCount = 0;
  private _messages = new BehaviorSubject<Message[]>([]);
  private _timeouts = new Map<number, NodeJS.Timer>();

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

  _addOrUpdateMessage(newMessage: Message, messages: Message[]) {
    timer(newMessage.delay ?? 0).subscribe(() => {
      this._timeouts.set(
        newMessage.id,
        setTimeout(() => this.removeMessage(newMessage), newMessage.duration ?? 3000)
      );
      this._messages.next(messages);
    });
  }

  addMessage(message: Message) {
    message.id = this.nextIndex;
    this._addOrUpdateMessage(message, [...this.messagesValue, message]);
    return message.id;
  }

  updateMessage(message: Message) {
    clearTimeout(this._timeouts.get(message.id));
    this._addOrUpdateMessage(message, [...this.messagesValue.filter((m) => m.id !== message.id), message]);
  }

  removeMessage(message: Message) {
    this._messages.next(this.messagesValue.filter((m) => m.id !== message.id));
  }
}
