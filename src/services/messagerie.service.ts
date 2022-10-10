import { Injectable } from "@angular/core";
import { ServicesModule } from "./services.module";
import { BehaviorSubject } from "rxjs";

export interface Message {
  id?: number;
  content: string;
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

  addMessage(message: Message) {
    message.id = this.nextIndex;
    this._timeouts.set(
      message.id,
      setTimeout(() => this.removeMessage(message), message.duration ?? 3000)
    );
    this._messages.next([...this.messagesValue, message]);
    return message.id;
  }

  updateMessage(message: Message) {
    clearTimeout(this._timeouts.get(message.id));
    this._timeouts.set(
      message.id,
      setTimeout(() => this.removeMessage(message), message.duration ?? 3000)
    );

    this._messages.next([
      ...this.messagesValue.filter((m) => m.id !== message.id),
      message,
    ]);
  }

  removeMessage(message: Message) {
    this._messages.next(this.messagesValue.filter((m) => m.id !== message.id));
  }
}
