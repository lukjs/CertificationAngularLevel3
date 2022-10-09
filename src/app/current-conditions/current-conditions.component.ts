import { Component } from "@angular/core";
import { WeatherData, WeatherService } from "../weather.service";
import { LocationService } from "../location.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-current-conditions",
  templateUrl: "./current-conditions.component.html",
  styleUrls: ["./current-conditions.component.css"],
})
export class CurrentConditionsComponent {
  currentConditions$: Observable<WeatherData>;

  constructor(private weatherService: WeatherService, private locationService: LocationService, private router: Router) {
    this.currentConditions$ = this.weatherService.currentConditions;

    this.weatherService.currentConditions.subscribe((d) => console.log("je sub jai ", d));
  }

  showForecast(zipcode: string) {
    console.log("je recois zipcode", zipcode);
    this.router.navigate(["/forecast", zipcode]);
  }
}
