import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { WeatherLocation } from "shared/models";
import { ForecastData } from "shared/models/ForecastData";

@Injectable()
export class ForecastService {
  static URL = "http://api.openweathermap.org/data/2.5";
  static APPID = "5a4b2d457ecbef9eb2a71e480b947604";

  constructor(private http: HttpClient) {}

  getForecast(location: WeatherLocation): Observable<ForecastData> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get<ForecastData>(
      `${ForecastService.URL}/forecast/daily?zip=${location.zipcode},${location.country.code}&units=imperial&cnt=5&APPID=${ForecastService.APPID}`
    );
  }
}
