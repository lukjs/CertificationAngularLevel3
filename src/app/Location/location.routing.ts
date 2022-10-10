import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LocationListComponent, Location404Component } from "@app.location";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "list",
  },
  {
    path: "list",
    component: LocationListComponent,
  },
  {
    path: "**",
    component: Location404Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}
