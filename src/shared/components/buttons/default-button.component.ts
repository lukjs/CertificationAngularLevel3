import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
} from "@angular/core";

import { Observable } from "rxjs";
import { delay, tap } from "rxjs/operators";

// Inspired by : https://blog.angulartraining.com/how-to-pass-a-custom-template-to-an-angular-component-53592d634a47

@Component({
  selector: "app-default-button",
  template: `
    <div
      (click)="triggerAction()"
      [class.disabled]="disabled"
      [ngStyle]="buttonStyle"
    >
      <ng-container *ngTemplateOutlet="currentTemplate"> </ng-container>
    </div>
  `,
  styles: [
    `
      div {
        width: fit-content;
        width: moz-fit-content;
        cursor: pointer;
      }
      button {
        cursor: pointer;
      }
      .disabled {
        cursor: default;
        pointer-events: none;
      }
    `,
  ],
})
export class DefaultButtonComponent implements OnChanges {
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

  @Input()
  actionComplete$: Observable<any> | null = null;

  @Input()
  workingStateMinDelay = 1000;
  @Input()
  doneStateMinDelay = 500;

  @Input()
  buttonStyle = {};

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
    this.currentTemplate = this.disabled
      ? this.disabledTemplate
      : this.initialTemplate;
  }

  triggerAction() {
    if (this.disabled) return;

    this.disabled = true;
    this.currentTemplate = this.workingTemplate;

    this.actionComplete$
      ?.pipe(
        delay(this.workingStateMinDelay),
        tap(() => {
          this.currentTemplate = this.doneTemplate;
        }),
        delay(this.doneStateMinDelay),
        tap(() => (this.currentTemplate = this.initialTemplate)),
        tap(() => (this.disabled = false))
      )
      ?.subscribe();

    this.clicked.emit();
  }
}
