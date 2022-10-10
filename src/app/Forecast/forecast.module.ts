import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  Forecast404Component,
  ForecastRoutingModule,
  ForecastsListComponent,
  ForecastService,
} from "@app.forecast";
import { SharedModule } from "@shared";

@NgModule({
  imports: [CommonModule, ForecastRoutingModule, SharedModule],
  exports: [],
  declarations: [ForecastsListComponent, Forecast404Component],
  providers: [ForecastService],
})
export class ForecastModule {}
