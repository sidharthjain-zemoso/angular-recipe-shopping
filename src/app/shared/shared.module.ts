import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { DropdownDirective } from "./dropdown.directive";
import { AlertComponent } from "./alert/alert.component";

@NgModule({
  declarations: [LoadingSpinnerComponent, DropdownDirective, AlertComponent],
  imports: [CommonModule],
  exports: [
    LoadingSpinnerComponent,
    DropdownDirective,
    CommonModule,
    AlertComponent,
  ],
})
export class SharedModule {}
