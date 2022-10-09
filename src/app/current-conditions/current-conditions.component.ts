import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";
import {
  WeatherData,
  WeatherLocation,
} from "shared/models";

import { LocationService } from "../location.service";
import { WeatherService } from "../weather.service";

@Component({
  selector: "app-current-conditions",
  templateUrl: "./current-conditions.component.html",
  styleUrls: ["./current-conditions.component.css"],
})
export class CurrentConditionsComponent {
  currentConditions$: Observable<WeatherData>;

  constructor(private weatherService: WeatherService, private locationService: LocationService, private router: Router) {
    this.currentConditions$ = this.weatherService.currentConditions;
  }

  showForecast(location: WeatherLocation) {
    this.router.navigate(["/forecast", location.country.code, location.zipcode]);
  }

  removeLocation(event: Event, location: WeatherLocation) {
    event.stopPropagation();
    this.locationService.removeLocation(location);
  }
}
