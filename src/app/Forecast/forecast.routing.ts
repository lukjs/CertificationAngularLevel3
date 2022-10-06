import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForecastsListComponent } from "./forecasts-list/forecasts-list.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "list",
  },
  {
    path: ":zipcode",
    component: ForecastsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForecastRoutingModule {}
