import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedDirectiveModule } from "shared/directives/shared-directives.module";
import { ForecastDisplayerComponent } from "./forecast-displayer.component";

@NgModule({
  imports: [CommonModule, SharedDirectiveModule],
  exports: [ForecastDisplayerComponent],
  declarations: [ForecastDisplayerComponent],
  providers: [],
})
export class SharedComponentsModule {}
