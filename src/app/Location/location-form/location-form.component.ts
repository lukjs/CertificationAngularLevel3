import { Component } from "@angular/core";
import { LocationService } from "@app.location";
import { Country } from "@models";
import { of, Subject } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-location-form",
  template: `<div class="location-form">
    <div class="inputs">
      <app-zipcode-entry
        [zipcode]="zipcode"
        (zipcodeChange)="zipcode = $event"
        style="margin-right: 2em"
      >
      </app-zipcode-entry>
      <app-country-entry (countryChange)="country = $event">
      </app-country-entry>
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
    return Boolean(
      !this.zipcode || !this.country || !this.country.code || !this.country.name
    );
  }

  constructor(private service: LocationService) {}

  addLocation() {
    this.service
      .addLocation({
        zipcode: this.zipcode,
        country: this.country,
      })
      .pipe(
        catchError((_) => {
          return of();
        })
      )
      .subscribe({ complete: () => this.actionCompleteSub$.next() });
  }
}
