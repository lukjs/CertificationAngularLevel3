import { Injectable, OnDestroy } from "@angular/core";
import {
  BehaviorSubject,
  from,
  merge,
  Observable,
  Subject,
  timer,
  zip,
} from "rxjs";
import { map, mergeMap, switchMap, takeUntil, tap } from "rxjs/operators";

import { HttpClient } from "@angular/common/http";
import { until } from "protractor";

export class WeatherLocation {
  zipcode?: string;
  country?: string;
}

export class WeatherData {}

@Injectable()
export class WeatherService implements OnDestroy {
  static URL = "http://api.openweathermap.org/data/2.5";
  static APPID = "5a4b2d457ecbef9eb2a71e480b947604";

  // private currentConditions = [];
  private _currentConditions = new BehaviorSubject<
    Map<WeatherLocation, WeatherData>
  >(new Map());

  private get currentConditionsValue() {
    return this._currentConditions.value;
  }

  get currentConditions() {
    return this._currentConditions
      .asObservable()
      .pipe(map((cc) => Array.from(cc).values()));
  }

  destroy$: Subject<void>;
  constructor(private http: HttpClient) {
    const x: Observable<void>[] = [];
    timer(0, 2000).pipe(takeUntil(this.destroy$), switchMap(merge(x)));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  reloadLocations() {
    return from([]);
  }

  getCurrentConditionsOfLocation(
    location: WeatherLocation
  ): Observable<WeatherData> {
    const ccValue = this.currentConditionsValue;
    return this.http
      .get(
        `${WeatherService.URL}/weather?zip=${location.zipcode},us&units=imperial&APPID=${WeatherService.APPID}`
      )
      .pipe(
        tap((data) => {
          ccValue.set(location, data);
          this._currentConditions.next(ccValue);
        })
      );
  }

  addCurrentConditions(zipcode: string, country: string): void {
    this.getCurrentConditionsOfLocation({ zipcode, country });
  }

  removeCurrentConditions(zipcode: string) {
    // for (let i in this.currentConditions) {
    //   if (this.currentConditions[i].zip == zipcode)
    //     this.currentConditions.splice(+i, 1);
    // }
  }
}
