import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { CurrentConditionsComponent } from "./current-conditions/current-conditions.component";
import { LocationService } from "./location.service";
import { MainPageComponent } from "./main-page/main-page.component";
import { WeatherService } from "./weather.service";
import { ZipcodeEntryComponent } from "./location-form/zipcode-entry/zipcode-entry.component";
import { SharedModule } from "shared/shared.module";
import { CountryEntryComponent } from "./location-form/country-entry/country-entry.component";
import { LocationFormComponent } from "./location-form/location-form.component";

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    CountryEntryComponent,
    CurrentConditionsComponent,
    MainPageComponent,
    LocationFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    routing,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production,
    }),
    SharedModule,
  ],
  providers: [LocationService, WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule {}
