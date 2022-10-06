import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "shared/shared.module";
import { ForecastRoutingModule } from "./forecast.routing";
import { ForecastService } from "./forecast.service";
import { ForecastsListComponent } from "./forecasts-list/forecasts-list.component";

@NgModule({
  imports: [CommonModule, ForecastRoutingModule, SharedModule],
  exports: [],
  declarations: [ForecastsListComponent],
  providers: [ForecastService],
})
export class ForecastModule {}
