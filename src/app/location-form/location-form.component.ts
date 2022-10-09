import { Component } from "@angular/core";

import { LocationService } from "app/location.service";
import { Country } from "shared/models";

@Component({
  selector: "app-location-form",
  template: `<div class="location-form">
    <div class="inputs">
      <app-zipcode-entry (zipcodeChange)="zipcode = $event"> </app-zipcode-entry>
      <app-country-entry (countryChange)="country = $event"> </app-country-entry>
    </div>
    <app-state-button (clicked)="addLocation()" [disabled]="isDisabled"></app-state-button>
  </div> `,
  styles: [
    `
      .location-form {
        width: 50%;
        background-color: rgba(0, 0, 255, 0.2);
        padding: 2em;
        border-radius: 5px;
        margin-bottom: 1em;
      }
      .inputs {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class LocationFormComponent {
  zipcode = "";
  country: Country;

  get isDisabled() {
    return Boolean(!this.zipcode || !this.country || !this.country.code || !this.country.name);
  }

  constructor(private service: LocationService) {}

  addLocation() {
    this.service.addLocation({ zipcode: this.zipcode, country: this.country });
  }
}
