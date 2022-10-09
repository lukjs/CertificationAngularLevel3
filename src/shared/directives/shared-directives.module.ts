import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputSuggestedDirective } from "./input-suggested.directive";
import { WeatherIconDirective } from "./weather-icon.directive";

@NgModule({
  imports: [CommonModule],
  exports: [WeatherIconDirective, InputSuggestedDirective],
  declarations: [WeatherIconDirective, InputSuggestedDirective],
  providers: [],
})
export class SharedDirectiveModule {}
