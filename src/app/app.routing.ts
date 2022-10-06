import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainPageComponent } from "./main-page/main-page.component";

const appRoutes: Routes = [
  {
    path: "",
    component: MainPageComponent,
  },
  {
    path: "forecast",
    loadChildren: () =>
      import("./Forecast/forecast.module").then((m) => m.ForecastModule),
  },
  // {
  //   path: 'forecast/:zipcode', component: ForecastsListComponent
  // }
];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(
  appRoutes,
  { relativeLinkResolution: "legacy" }
);
