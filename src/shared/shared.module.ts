import { NgModule } from "@angular/core";

import { SharedDirectiveModule } from "@directives";
import { SharedComponentsModule } from "@shared/components";

@NgModule({
  imports: [SharedComponentsModule, SharedDirectiveModule],
  exports: [SharedComponentsModule, SharedDirectiveModule],
  declarations: [],
  providers: [],
})
export class SharedModule {}
