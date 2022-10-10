import { Component } from "@angular/core";

@Component({
  template: `Oops, you lost yourself.
    <a [routerLink]="['']">Back to locations list</a> `,
})
export class Forecast404Component {}
