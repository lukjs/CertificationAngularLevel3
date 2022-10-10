import { ModuleWithProviders } from "@angular/core";
import {
  RouterModule,
  Routes,
} from "@angular/router";

const appRoutes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "location",
  },
  {
    path: "location",
    loadChildren: () => import("./Location/location.module").then((m) => m.LocationModule),
  },
  {
    path: "forecast",
    loadChildren: () => import("./Forecast/forecast.module").then((m) => m.ForecastModule),
  },
  {
    path: "**",
    redirectTo: "location",
  },
];
export const AppRouting: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes, { relativeLinkResolution: "legacy", useHash: true });
