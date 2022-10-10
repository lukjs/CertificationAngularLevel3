import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  ForecastDisplayerComponent,
  InputWithSuggestionsComponent,
  MessageDisplayerComponent,
} from "@components";
import { DefaultButtonComponent } from "@components/buttons";
import { SharedDirectiveModule } from "@directives";

@NgModule({
  imports: [CommonModule, FormsModule, SharedDirectiveModule],
  exports: [
    ForecastDisplayerComponent,
    MessageDisplayerComponent,
    DefaultButtonComponent,
    InputWithSuggestionsComponent,
  ],
  declarations: [
    ForecastDisplayerComponent,
    MessageDisplayerComponent,
    DefaultButtonComponent,
    InputWithSuggestionsComponent,
  ],
  providers: [],
})
export class SharedComponentsModule {}
