import {
  Component,
  OnInit,
} from "@angular/core";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import {
  Message,
  MessagerieService,
} from "@services";

@Component({
  selector: "app-message-displayer",
  template: `
    <div class="messages">
      <div
        class="message"
        *ngFor="let message of messages$ | async"
        [ngStyle]="{
          color: message.color ?? 'black',
          'background-color': message.backgroundColor ?? ' rgb(132 170 217 / 35%)'
        }"
      >
        {{ message.content }}
      </div>
    </div>
  `,
  styles: [
    `
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
      }
    `,
  ],
})
export class MessageDisplayerComponent implements OnInit {
  messages$: Observable<Message[]>;

  constructor(private messagerieService: MessagerieService) {}

  ngOnInit() {
    this.messages$ = this.messagerieService.messages.pipe(
      map((messages) =>
        messages.sort((a, b) => {
          if (a?.id === b?.id) return 0;
          return (a?.id ?? 0) > (b.id ?? 0) ? 1 : -1;
        })
      )
    );
  }
}
