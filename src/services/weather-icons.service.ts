import { Injectable } from "@angular/core";
import { environment } from "@env";
import { ServicesModule } from "./services.module";

@Injectable({ providedIn: ServicesModule })
export class WeatherIconsService {
  get URL() {
    return environment.api.icons.url;
  }

  getWeatherIcon(id: number): string {
    if (id >= 200 && id <= 232) return this.URL + "art_storm.png";
    else if (id >= 501 && id <= 511) return this.URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return this.URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622) return this.URL + "art_snow.png";
    else if (id >= 801 && id <= 804) return this.URL + "art_clouds.png";
    else if (id === 741 || id === 761) return this.URL + "art_fog.png";
    else return this.URL + "art_clear.png";
  }
}
