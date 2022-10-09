import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-state-button",
  template: `<app-default-button [initialTemplate]="save" [workingTemplate]="saving" [doneTemplate]="saved" (clicked)="clicked.emit()">
    </app-default-button>

    <ng-template #save> Save </ng-template>

    <ng-template #saving>
      <img src="https://github.com/alcfeoh/ng-advanced-workshop/raw/master/src/assets/loader.gif" style="width: 20px" />
    </ng-template>

    <ng-template #saved> Saved! </ng-template>`,
})
export class StateButtonComponent {
  @Output()
  clicked = new EventEmitter<void>();

  constructor() {}
}
