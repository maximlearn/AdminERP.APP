import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectRequiredValidatorDirective } from './select-required-validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[CommonModule, SelectRequiredValidatorDirective],
  declarations: [SelectRequiredValidatorDirective]
})
export class SharedModule { }
