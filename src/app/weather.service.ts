import { HttpClient } from "@angular/common/http";
import {
  Injectable,
  OnDestroy,
} from "@angular/core";

import {
  BehaviorSubject,
  interval,
  Observable,
  Subject,
  zip,
} from "rxjs";
import {
  switchMap,
  takeUntil,
  tap,
} from "rxjs/operators";
import { MessagerieService } from "services/messagerie.service";
import {
  WeatherData,
  WeatherLocation,
} from "shared/models";

export class WeatherEntry {
  location: WeatherLocation;
  data: WeatherData;
}

@Injectable()
export class WeatherService implements OnDestroy {
  static URL = "http://api.openweathermap.org/data/2.5";
  static APPID = "5a4b2d457ecbef9eb2a71e480b947604";

  private _currentConditions: Map<WeatherLocation, WeatherData> = new Map();
  private _currentConditionsSubject = new BehaviorSubject<WeatherEntry[]>([]);

  private get currentConditionsKeys() {
    return Array.from(this._currentConditions.keys());
  }

  private get currentConditionsAsEntries(): WeatherEntry[] {
    return Array.from(this._currentConditions.entries()).map((entry) => ({
      location: entry[0],
      data: entry[1],
    }));
  }

  get currentConditions() {
    return this._currentConditionsSubject.asObservable();
  }

  destroy$ = new Subject<void>();
  constructor(private http: HttpClient, private messagerieService: MessagerieService) {
    // no need to use timer to get an initial trigger
    // because on init, several calls to getCurrentConditionsOfLocation are made from local storage loaded locations
    interval(30000)
      .pipe(
        takeUntil(this.destroy$),
        tap(() =>
          this.messagerieService.addMessage({
            content: "Refreshing data",
            duration: 5000,
          })
        ),
        switchMap(() => zip(...this.currentConditionsKeys.map((location) => this.getCurrentConditionsOfLocation(location))))
      )
      .subscribe(() => this._currentConditionsSubject.next(this.currentConditionsAsEntries));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  getCurrentConditionsOfLocation(location: WeatherLocation): Observable<WeatherData> {
    this.messagerieService.addMessage({ content: `Getting weather data for ${location.zipcode}, ${location.country.name}` });
    return this.http
      .get(`${WeatherService.URL}/weather?zip=${location.zipcode},${location.country.code}&units=imperial&APPID=${WeatherService.APPID}`)
      .pipe(tap((data) => this._currentConditions.set(location, data)));
  }

  addCurrentConditions(location: WeatherLocation): void {
    this.getCurrentConditionsOfLocation(location).subscribe(() => this._currentConditionsSubject.next(this.currentConditionsAsEntries));
  }

  removeCurrentConditions(location: WeatherLocation) {
    this._currentConditions.delete(location);
    this._currentConditionsSubject.next(this.currentConditionsAsEntries);
  }
}
