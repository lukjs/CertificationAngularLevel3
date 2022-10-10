import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-zipcode-entry",
  template: `<h2>Enter a zipcode:</h2>
    <input
      type="text"
      placeholder="Zipcode"
      class="form-control"
      [(ngModel)]="zipcode"
      (ngModelChange)="valueChanged()"
    />
    <br /> `,
})
export class ZipcodeEntryComponent {
  @Input()
  zipcode = "";

  @Output()
  zipcodeChange = new EventEmitter<string>();

  constructor() {}

  valueChanged() {
    this.zipcodeChange.emit(this.zipcode);
  }
}
