import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env";
import { ForecastData, WeatherLocation } from "@models";
import { Observable } from "rxjs";

@Injectable()
export class ForecastService {
  get URL() {
    return environment.api.openweathermap.url;
  }

  get APP_ID() {
    return environment.api.openweathermap.appID;
  }

  constructor(private http: HttpClient) {}

  getForecast(location: WeatherLocation): Observable<ForecastData> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get<ForecastData>(
      `${this.URL}/forecast/daily?zip=${location.zipcode},${location.country.code}&units=imperial&cnt=5&APPID=${this.APP_ID}`
    );
  }
}
