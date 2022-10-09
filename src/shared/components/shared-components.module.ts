import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MessageDisplayerComponent } from "shared/components/message-displayer.component";
import { SharedDirectiveModule } from "shared/directives/shared-directives.module";
import { DefaultButtonComponent } from "./buttons/default-button.component";
import { StateButtonComponent } from "./buttons/state-button.component";
import { ForecastDisplayerComponent } from "./forecast-displayer.component";
import { InputWithSuggestionsComponent } from "./input-with-suggestions.component";

@NgModule({
  imports: [CommonModule, FormsModule, SharedDirectiveModule],
  exports: [
    ForecastDisplayerComponent,
    MessageDisplayerComponent,
    DefaultButtonComponent,
    StateButtonComponent,
    InputWithSuggestionsComponent,
  ],
  declarations: [
    ForecastDisplayerComponent,
    MessageDisplayerComponent,
    DefaultButtonComponent,
    StateButtonComponent,
    InputWithSuggestionsComponent,
  ],
  providers: [],
})
export class SharedComponentsModule {}
