import { Component, EventEmitter, Input, Output, TemplateRef } from "@angular/core";
import { timer } from "rxjs";

@Component({
  selector: "app-default-button",
  template: `<button (click)="triggerAction()">
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
      }
    `,
  ],
})
export class DefaultButtonComponent {
  action$ = timer(2000);

  @Input()
  initialTemplate: TemplateRef<any>;
  @Input()
  workingTemplate: TemplateRef<any>;
  @Input()
  doneTemplate: TemplateRef<any>;

  @Output()
  clicked = new EventEmitter<void>();

  currentTemplate: TemplateRef<any>;

  ngOnInit() {
    this.currentTemplate = this.initialTemplate;
  }

  triggerAction() {
    this.clicked.emit();
    this.currentTemplate = this.workingTemplate;
    this.action$.subscribe(() => (this.currentTemplate = this.doneTemplate));
  }
}
