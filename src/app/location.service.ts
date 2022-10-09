import { Injectable } from "@angular/core";

import { MessagerieService } from "services/messagerie.service";
import {
  compareLocation,
  WeatherLocation,
} from "shared/models";

import { WeatherService } from "./weather.service";

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService {
  locations: WeatherLocation[] = [];

  constructor(private weatherService: WeatherService, private messagerieService: MessagerieService) {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString) this.locations = JSON.parse(locString);
    for (let loc of this.locations) this.weatherService.addCurrentConditions(loc);
  }

  addLocation(location: WeatherLocation) {
    if (this.locations.find((_loc) => compareLocation(_loc, location))) {
      return;
    }
    this.locations.push(location);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.weatherService.addCurrentConditions(location);
    this.messagerieService.addMessage({ content: `Added location : ${JSON.stringify(location)}}` });
  }

  removeLocation(location: WeatherLocation) {
    this.locations = this.locations.filter((_loc) => !compareLocation(_loc, location));
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.weatherService.removeCurrentConditions(location);
    this.messagerieService.addMessage({ content: `Removed location : ${JSON.stringify(location)}}` });
  }
}
