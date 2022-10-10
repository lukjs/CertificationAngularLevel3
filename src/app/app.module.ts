import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";
import { AppComponent } from "app/app.component";
import { AppRouting } from "app/app.routing";
import { SharedModule } from "@shared";
import { MessagerieService } from "@services";
import { environment } from "@env";

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
  ],
  providers: [MessagerieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
