import { NgModule } from "@angular/core";
import { ServicesModule } from "services/services.module";
import { SharedComponentsModule } from "./components/shared-components.module";
import { SharedDirectiveModule } from "./directives/shared-directives.module";

@NgModule({
  imports: [SharedComponentsModule, SharedDirectiveModule, ServicesModule],
  exports: [SharedComponentsModule, SharedDirectiveModule],
  declarations: [],
  providers: [],
})
export class SharedModule {}
