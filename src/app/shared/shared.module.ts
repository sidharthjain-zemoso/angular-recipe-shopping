import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DropdownDirective,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [CommonModule],
  exports: [
    LoadingSpinnerComponent,
    DropdownDirective,
    CommonModule,
    AlertComponent,
    PlaceholderDirective,
  ],
  entryComponents: [AlertComponent],
  providers: [LoggingService],
})
export class SharedModule {}
