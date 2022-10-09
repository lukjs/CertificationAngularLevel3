import { Country } from "./Country";

export class WeatherLocation {
  zipcode?: string;
  country?: Country;
}

export function compareLocation(locationA: WeatherLocation, locationB: WeatherLocation) {
  return (
    locationA.zipcode === locationB.zipcode &&
    locationA.country.code === locationB.country.code &&
    locationA.country.name === locationB.country.name
  );
}
