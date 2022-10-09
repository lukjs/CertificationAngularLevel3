import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MessageDisplayerComponent } from "shared/components/message-displayer.component";
import { SharedDirectiveModule } from "shared/directives/shared-directives.module";
import { DefaultButtonComponent } from "./buttons/default-button.component";
import { StateButtonComponent } from "./buttons/state-button.component";
import { ForecastDisplayerComponent } from "./forecast-displayer.component";

@NgModule({
  imports: [CommonModule, SharedDirectiveModule],
  exports: [ForecastDisplayerComponent, MessageDisplayerComponent, DefaultButtonComponent, StateButtonComponent],
  declarations: [ForecastDisplayerComponent, MessageDisplayerComponent, DefaultButtonComponent, StateButtonComponent],
  providers: [],
})
export class SharedComponentsModule {}
