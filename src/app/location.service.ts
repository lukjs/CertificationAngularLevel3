import { Injectable } from "@angular/core";
import { MessagerieService } from "services/messagerie.service";
import { WeatherService } from "./weather.service";

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService {
  locations: string[] = [];

  constructor(private weatherService: WeatherService, private messagerieService: MessagerieService) {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString) this.locations = JSON.parse(locString);
    for (let loc of this.locations)
      this.weatherService.addCurrentConditions({zipcode:loc, country: ''});
  }

  addLocation(zipcode: string) {
    if (this.locations.includes(zipcode)) {
      return;
    }
    this.locations.push(zipcode);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.weatherService.addCurrentConditions({zipcode, country:""});
    this.messagerieService.addMessage({content: `Added location : ${zipcode}`});
  }

  removeLocation(zipcode: string) {
    let index = this.locations.indexOf(zipcode);
    if (index !== -1) {
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.weatherService.removeCurrentConditions({zipcode, country:''});
    }
  }
}
