import { Component } from "@angular/core";

@Component({
  template: `<div class="container-fluid">
    <app-location-form></app-location-form>
    <app-current-conditions></app-current-conditions>
  </div> `,
})
export class LocationListComponent {
  constructor() {}
}
