import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { WeatherService } from "../../weather.service";
import { Forecast } from "../forecast.model";
import { ForecastService } from "../forecast.service";

@Component({
  selector: "app-forecasts-list",
  templateUrl: "./forecasts-list.component.html",
  styleUrls: ["./forecasts-list.component.css"],
})
export class ForecastsListComponent {
  zipcode: string;
  forecast$: Observable<{ list: Forecast[] }>;

  constructor(private forecastService: ForecastService, route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.zipcode = params["zipcode"];
      this.forecast$ = this.forecastService.getForecast(this.zipcode);
    });
  }
}
