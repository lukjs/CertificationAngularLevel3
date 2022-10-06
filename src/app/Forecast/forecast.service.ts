import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ForecastModule } from "./forecast.module";

@Injectable()
export class ForecastService {
  static URL = "http://api.openweathermap.org/data/2.5";
  static APPID = "5a4b2d457ecbef9eb2a71e480b947604";

  constructor(private http: HttpClient) {}

  getForecast(zipcode: string): Observable<any> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get(
      `${ForecastService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${ForecastService.APPID}`
    );
  }
}
