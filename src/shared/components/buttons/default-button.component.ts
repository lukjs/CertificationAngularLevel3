import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
} from "@angular/core";

import { timer } from "rxjs";

@Component({
  selector: "app-default-button",
  template: `<button (click)="triggerAction()" [disabled]="disabled" [class.disabled]="disabled">
    <ng-container *ngTemplateOutlet="currentTemplate"> </ng-container>
  </button> `,
  styles: [
    `
      button {
        background-color: #d29119;
        color: white;
        font-size: 16px;
        font-weight: bold;
        padding: 6px 21px;
        border: none;
        cursor: pointer;
      }
      .disabled {
        cursor: default;
        background-color: grey;
        color: white;
      }
    `,
  ],
})
export class DefaultButtonComponent implements OnChanges {
  action$ = timer(2000);

  @Input()
  disabled = false;

  @Input()
  initialTemplate: TemplateRef<any>;
  @Input()
  workingTemplate: TemplateRef<any>;
  @Input()
  doneTemplate: TemplateRef<any>;
  @Input()
  disabledTemplate: TemplateRef<any>;

  @Output()
  clicked = new EventEmitter<void>();

  currentTemplate: TemplateRef<any>;

  ngOnInit() {
    this.switchDisabledOrInitial();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["disabled"]) {
      this.switchDisabledOrInitial();
    }
  }

  switchDisabledOrInitial() {
    this.currentTemplate = this.disabled ? this.disabledTemplate : this.initialTemplate;
  }

  triggerAction() {
    this.clicked.emit();
    this.currentTemplate = this.workingTemplate;
    this.action$.subscribe(() => (this.currentTemplate = this.doneTemplate));
  }
}
