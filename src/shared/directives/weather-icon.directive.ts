import { AfterViewInit, Directive, ElementRef, Input } from "@angular/core";
import { WeatherIconsService } from "services/weather-icons.service";

@Directive({ selector: "[weatherIcon]" })
export class WeatherIconDirective implements AfterViewInit {
  @Input("weatherIcon") weatherIcon = "";

  constructor(
    private el: ElementRef,
    private iconsService: WeatherIconsService
  ) {}

  ngAfterViewInit(): void {
    if (this.weatherIcon) {
      this.el.nativeElement.src = this.iconsService.getWeatherIcon(
        parseInt(this.weatherIcon)
      );
    }
  }
}
