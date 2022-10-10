import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WeatherIconDirective, InputSuggestedDirective } from "@directives";

@NgModule({
  imports: [CommonModule],
  exports: [WeatherIconDirective, InputSuggestedDirective],
  declarations: [WeatherIconDirective, InputSuggestedDirective],
  providers: [],
})
export class SharedDirectiveModule {}
