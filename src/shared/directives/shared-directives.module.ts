import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WeatherIconDirective } from "./weather-icon.directive";

@NgModule({
  imports: [CommonModule],
  exports: [WeatherIconDirective],
  declarations: [WeatherIconDirective],
  providers: [],
})
export class SharedDirectiveModule {}
