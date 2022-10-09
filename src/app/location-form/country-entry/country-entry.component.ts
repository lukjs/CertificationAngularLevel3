import {
  Component,
  EventEmitter,
  Output,
} from "@angular/core";

import { Country } from "shared/models";

import COUNTRIES from "@assets/countries.json";

@Component({
  selector: "app-country-entry",
  template: `<h2>Enter a country:</h2>
    <app-input-with-suggestions
      [(value)]="country"
      (valueChange)="valueChanged()"
      [suggestions]="suggestions"
    ></app-input-with-suggestions>`,
})
export class CountryEntryComponent {
  country = "";
  suggestions = [];

  @Output()
  countryChange = new EventEmitter<Country>();

  constructor() {}

  valueChanged() {
    this.countryChange.emit(COUNTRIES.find((c) => c.name === this.country));
    this.suggestions = COUNTRIES.filter((c) => c.name.toLowerCase().startsWith(this.country.toLowerCase())).map((c) => c.name);
  }
}
