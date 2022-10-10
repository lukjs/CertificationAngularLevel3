import { Component, Input } from "@angular/core";
import { Forecast } from "@app.forecast";

@Component({
  selector: "app-forecast-displayer",
  template: ` {{ forecast.dt * 1000 | date: "EEEE, MMM d" }}:
    {{ forecast.weather[0].main }}
    - Min: {{ forecast.temp.min | number: ".0-0" }} - Max:
    {{ forecast.temp.max | number: ".0-0" }}

    <img [weatherIcon]="forecast.weather[0].id" class="icon" />`,
  styles: [
    `
      .icon {
        width: 45px;
        height: 45px;
        position: absolute;
        right: 20px;
        top: -2px;
      }
    `,
  ],
})
export class ForecastDisplayerComponent {
  @Input()
  forecast: Forecast;
}
