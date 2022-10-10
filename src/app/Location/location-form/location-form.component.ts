import { Component } from "@angular/core";

import { Subject } from "rxjs";

import { LocationService } from "@app.location";
import { Country } from "@models";
import { MessagerieService } from "@services";

@Component({
  selector: "app-location-form",
  template: `<div class="location-form">
    <div class="inputs">
      <app-zipcode-entry [zipcode]="zipcode" (zipcodeChange)="zipcode = $event" style="margin-right: 2em"> </app-zipcode-entry>
      <app-country-entry (countryChange)="country = $event"> </app-country-entry>
    </div>
    <app-location-save-button
      (clicked)="addLocation()"
      [disabled]="isDisabled"
      [actionComplete$]="actionComplete$"
    ></app-location-save-button>
  </div> `,
  styles: [
    `
      .location-form {
        width: 100%;
        background-color: rgba(0, 0, 255, 0.2);
        padding: 2em;
        border-radius: 5px;
        margin-bottom: 1em;
      }
      .inputs {
        display: flex;
        justify-content: flex-start;
      }
    `,
  ],
})
export class LocationFormComponent {
  zipcode = "";
  country: Country = { name: "", code: "" };

  actionCompleteSub$ = new Subject<void>();
  actionComplete$ = this.actionCompleteSub$.asObservable();

  get isDisabled() {
    return Boolean(!this.zipcode || !this.country || !this.country.code || !this.country.name);
  }

  constructor(private service: LocationService, private messagerieService: MessagerieService) {}

  addLocation() {
    this.messagerieService.addMessage({ content: `Trying to add location ${this.zipcode}, ${this.country.name}` });
    this.service
      .addLocation({
        zipcode: this.zipcode,
        country: this.country,
      })
      .subscribe({
        error: (err) => {
          this.service.removeLocation({ zipcode: this.zipcode, country: this.country });
          this.messagerieService.addMessage({
            content: `Error: no data found, maybe you're requesting incorrect location`,
            backgroundColor: "red",
            color: "white",
            delay: 200,
          });
          this.actionCompleteSub$.next();
        },
        complete: () => this.actionCompleteSub$.next(),
      });
  }
}
