import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SecurityContext,
  SimpleChanges,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Directive({ selector: "[inputSuggested]" })
export class InputSuggestedDirective implements OnChanges {
  @Input() inputSuggested = "";
  @Input() inputSuggestedPart = "";

  constructor(private el: ElementRef, private domSanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes["inputSuggestedPart"]) {
      // no need to retrigger strongify
      return;
    }
    if (this.inputSuggested) {
      const start = this.inputSuggested.substring(
        0,
        this.inputSuggestedPart.length
      );
      const end = this.inputSuggested.substring(
        this.inputSuggestedPart.length,
        this.inputSuggested.length
      );
      const valueReplaced = `<strong>${start}</strong>${end}`;
      this.el.nativeElement.innerHTML = this.domSanitizer.sanitize(
        SecurityContext.HTML,
        valueReplaced
      );
    }
  }
}
