import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-location-save-button",
  template: `<app-default-button
      [initialTemplate]="save"
      [workingTemplate]="saving"
      [doneTemplate]="saved"
      [disabledTemplate]="disabledTemplate"
      [disabled]="disabled"
      (clicked)="clicked.emit()"
      [actionComplete$]="actionComplete$"
    >
    </app-default-button>

    <ng-template #save>
      <div class="location-button initial-template">Add location</div>
    </ng-template>

    <ng-template #saving
      ><div class="location-button working-template">Adding...</div>
    </ng-template>

    <ng-template #saved
      ><div class="location-button done-template">✔️ Done !</div>
    </ng-template>
    <ng-template #disabledTemplate>
      <div class="location-button disabled-template">Add location</div>
    </ng-template> `,
  styles: [
    `
      .location-button {
        padding: 1em;
        border-radius: 1em;
      }
      .initial-template {
        color: white;
        background-color: #004581;
      }
      .working-template {
        color: white;
        background-color: #0045816e;
      }
      .done-template {
        color: white;
        background-color: #007e1b;
      }
      .disabled-template {
        color: white;
        background-color: #cdcdcd;
      }
    `,
  ],
})
export class LocationSaveButtonComponent {
  @Input()
  disabled = false;

  @Output()
  clicked = new EventEmitter<void>();

  @Input()
  actionComplete$: Observable<any>;
}
