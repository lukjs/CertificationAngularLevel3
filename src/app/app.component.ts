import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>
    <app-message-displayer></app-message-displayer> `,
})
export class AppComponent {}
