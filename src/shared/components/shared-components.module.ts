import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MessageDisplayerComponent } from "shared/components/message-displayer.component";
import { SharedDirectiveModule } from "shared/directives/shared-directives.module";
import { ForecastDisplayerComponent } from "./forecast-displayer.component";

@NgModule({
  imports: [CommonModule, SharedDirectiveModule],
  exports: [ForecastDisplayerComponent, MessageDisplayerComponent],
  declarations: [ForecastDisplayerComponent, MessageDisplayerComponent],
  providers: [],
})
export class SharedComponentsModule {}
