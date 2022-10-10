import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { environment } from "@env";
import { WeatherLocation, WeatherData } from "@models";
import { MessagerieService } from "@services";

import { BehaviorSubject, interval, Observable, Subject, zip } from "rxjs";
import { switchMap, takeUntil, tap } from "rxjs/operators";

export class WeatherEntry {
  location: WeatherLocation;
  data: WeatherData;
}

@Injectable()
export class WeatherService implements OnDestroy {
  private _timer = 30; // seconds to trigger refresh of weather data
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
  constructor(
    private http: HttpClient,
    private messagerieService: MessagerieService
  ) {
    let timeRemaining = this._timer;
    const messageId = this.messagerieService.addMessage({
      content: `Refreshing data will happend in ${timeRemaining} seconds`,
      duration: 1000,
    });

    interval(1000)
      .pipe(
        tap(() => {
          timeRemaining--;
          this.messagerieService.updateMessage({
            id: messageId,
            content: `Refreshing data will happend in ${timeRemaining} seconds`,
            duration: 1000,
          });
        })
      )
      .subscribe();

    // no need to use timer to get an initial trigger
    // because on init, several calls to getCurrentConditionsOfLocation are made from local storage loaded locations
    interval(1000 * this._timer)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (timeRemaining = this._timer)),
        tap(() =>
          this.messagerieService.addMessage({
            content: "Refreshing data",
            color: "white",
            backgroundColor: "green",
          })
        ),
        switchMap(() =>
          zip(
            ...this.currentConditionsKeys.map((location) =>
              this.getCurrentConditionsOfLocation(location)
            )
          )
        )
      )
      .subscribe(() =>
        this._currentConditionsSubject.next(this.currentConditionsAsEntries)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  getCurrentConditionsOfLocation(
    location: WeatherLocation
  ): Observable<WeatherData> {
    this.messagerieService.addMessage({
      content: `Getting weather data for ${location.zipcode}, ${location.country.name}`,
      color: "white",
      backgroundColor: "green",
    });
    return this.http
      .get(
        `${environment.api.openweathermap.url}/weather?zip=${location.zipcode},${location.country.code}&units=imperial&APPID=${environment.api.openweathermap.appID}`
      )
      .pipe(tap((data) => this._currentConditions.set(location, data)));
  }

  addCurrentConditions(location: WeatherLocation): Observable<WeatherData> {
    return this.getCurrentConditionsOfLocation(location).pipe(
      tap(() =>
        this._currentConditionsSubject.next(this.currentConditionsAsEntries)
      )
    );
  }

  removeCurrentConditions(location: WeatherLocation) {
    this._currentConditions.delete(location);
    this._currentConditionsSubject.next(this.currentConditionsAsEntries);
  }
}
