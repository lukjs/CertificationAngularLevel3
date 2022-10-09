import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-input-with-suggestions",
  template: `<input type="text" [(ngModel)]="value" class="form-control" />
    <div class="suggestions" *ngIf="showSuggestions">
      <ul>
        <li
          *ngFor="let suggestion of suggestions"
          [inputSuggested]="suggestion"
          [inputSuggestedPart]="value"
          (click)="this.value = suggestion"
        >
          {{ suggestion }}
        </li>
      </ul>
    </div>`,
  styles: [
    `
      ul {
        list-style: none;
        padding-left: 0.5em;
        position: absolute;
        max-height: 15em;
        max-width: 15em;
        overflow: auto;
        background-color: rgb(96 171 183 / 32%);
      }
      li {
        padding: 0.3em;
      }
      li:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.3);
      }
    `,
  ],
})
export class InputWithSuggestionsComponent {
  _value: string;

  @Output()
  valueChange = new EventEmitter<string>();

  @Input()
  get value() {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.valueChange.emit(this._value);
  }

  @Input()
  suggestions: string[] = [];

  get showSuggestions() {
    if (!this.value) {
      return false;
    }
    if (this.suggestions.length === 1 && this._value === this.suggestions[0]) {
      return false;
    }
    return true;
  }

  constructor() {}
}
