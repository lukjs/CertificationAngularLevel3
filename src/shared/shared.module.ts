import { NgModule } from "@angular/core";
import { SharedDirectiveModule } from "@directives";
import { ServicesModule } from "@services";
import { SharedComponentsModule } from "@shared/components";

@NgModule({
  imports: [SharedComponentsModule, SharedDirectiveModule, ServicesModule],
  exports: [SharedComponentsModule, SharedDirectiveModule],
  declarations: [],
  providers: [],
})
export class SharedModule {}
