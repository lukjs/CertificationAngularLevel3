import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `<div
      style="width: 100%; height: 2em; line-height: 2em; background: rgba(0,0,0,0.2); color: #6e6e6e; margin-bottom:1em"
    >
      Made by <strong>Lucas Loignon</strong>
    </div>
    <router-outlet></router-outlet>
    <app-message-displayer></app-message-displayer> `,
})
export class AppComponent {}
