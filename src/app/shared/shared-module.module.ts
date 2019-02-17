import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectRequiredValidatorDirective } from './select-required-validator.directive';
import { menuFilterPipe } from './menu-filter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[CommonModule, SelectRequiredValidatorDirective,menuFilterPipe],
  declarations: [SelectRequiredValidatorDirective,menuFilterPipe]
})
export class SharedModule { }
