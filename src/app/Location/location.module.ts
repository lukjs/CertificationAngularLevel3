import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  CountryEntryComponent,
  CurrentConditionsComponent,
  Location404Component,
  LocationFormComponent,
  LocationListComponent,
  LocationRoutingModule,
  LocationSaveButtonComponent,
  LocationService,
  WeatherService,
  ZipcodeEntryComponent,
} from "@app.location";
import { SharedModule } from "@shared";

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule, LocationRoutingModule],
  exports: [],
  declarations: [
    LocationListComponent,
    Location404Component,
    ZipcodeEntryComponent,
    CountryEntryComponent,
    CurrentConditionsComponent,
    LocationFormComponent,
    LocationSaveButtonComponent,
  ],
  providers: [LocationService, WeatherService],
})
export class LocationModule {}
