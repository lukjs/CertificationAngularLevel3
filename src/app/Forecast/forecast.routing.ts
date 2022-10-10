import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForecastsListComponent, Forecast404Component } from "@app.forecast";

const routes: Routes = [
  {
    path: ":countrycode/:zipcode",
    component: ForecastsListComponent,
  },
  {
    path: "**",
    component: Forecast404Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForecastRoutingModule {}
