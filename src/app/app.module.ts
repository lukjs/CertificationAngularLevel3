import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";

import { AppComponent } from "app/app.component";
import { AppRouting } from "app/app.routing";

import { environment } from "@env";
import { ServicesModule } from "@services";
import { SharedModule } from "@shared";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRouting,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production,
    }),
    SharedModule,
    ServicesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
