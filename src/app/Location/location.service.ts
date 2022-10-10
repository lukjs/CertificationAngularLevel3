import { Injectable } from "@angular/core";

import { throwError } from "rxjs";
import { tap } from "rxjs/operators";

import { WeatherService } from "@app.location";
import {
  compareLocation,
  WeatherLocation,
} from "@models";
import { MessagerieService } from "@services";

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService {
  locations: WeatherLocation[] = [];

  constructor(private weatherService: WeatherService, private messagerieService: MessagerieService) {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString) this.locations = JSON.parse(locString);
    for (let loc of this.locations) this.weatherService.addCurrentConditions(loc).subscribe();
  }

  addLocation(location: WeatherLocation) {
    if (this.locations.find((_loc) => compareLocation(_loc, location))) {
      return throwError("");
    }
    this.locations.push(location);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));

    return this.weatherService.addCurrentConditions(location).pipe(
      tap(() => {
        this.messagerieService.addMessage({
          content: `Added location : ${JSON.stringify(location)}}`,
        });
      })
    );
  }

  removeLocation(location: WeatherLocation) {
    this.locations = this.locations.filter((_loc) => !compareLocation(_loc, location));
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.weatherService.removeCurrentConditions(location);
    this.messagerieService.addMessage({
      content: `Removed location : ${JSON.stringify(location)}}`,
    });
  }
}
